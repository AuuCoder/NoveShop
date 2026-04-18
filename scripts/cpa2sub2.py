from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path


def parse_datetime_to_utc_iso_z(value: str) -> str:
    """Normalize an ISO datetime string into UTC Z format."""
    try:
        dt = datetime.fromisoformat(value.replace("Z", "+00:00"))
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    except Exception:
        return ""


def parse_datetime_to_epoch_ms(value: str) -> int | None:
    """Convert an ISO datetime string into a Unix timestamp in milliseconds."""
    normalized = parse_datetime_to_utc_iso_z(value)
    if not normalized:
        return None

    try:
        dt = datetime.fromisoformat(normalized.replace("Z", "+00:00"))
        return int(dt.timestamp() * 1000)
    except Exception:
        return None


def utc_now_iso_z() -> str:
    """Return the current UTC time in ISO Z format."""
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def sanitize_account_type(value: str) -> str:
    """Ensure the generated sub2api account name stays parseable."""
    cleaned = re.sub(r"[^A-Za-z0-9_-]+", "-", value.strip())
    cleaned = cleaned.strip("-_")
    return cleaned or "codex"


def build_account_name(cpa_account: dict, index: int, default_type: str) -> str:
    """Build a sub2api-style account name that can round-trip back to CPA."""
    account_type = sanitize_account_type(str(cpa_account.get("type") or default_type))
    return f"{account_type}-account-{index}"


def is_cpa_account_like(value: object) -> bool:
    """Check whether a JSON object looks like one CPA account record."""
    if not isinstance(value, dict):
        return False

    cpa_keys = {
        "access_token",
        "id_token",
        "refresh_token",
        "account_id",
        "email",
        "type",
        "expired",
        "last_refresh",
        "disabled",
    }
    return any(key in value for key in cpa_keys)


def convert_cpa_account_to_sub2(
    cpa_account: dict, index: int, default_type: str = "codex"
) -> dict:
    """Convert one CPA account JSON object into one sub2api account record."""
    email = str(cpa_account.get("email") or "").strip()
    account_id = str(cpa_account.get("account_id") or "").strip()
    expires_at = parse_datetime_to_utc_iso_z(str(cpa_account.get("expired") or ""))
    token_version = parse_datetime_to_epoch_ms(str(cpa_account.get("last_refresh") or ""))

    credentials = {
        "access_token": str(cpa_account.get("access_token") or ""),
        "id_token": str(cpa_account.get("id_token") or ""),
        "refresh_token": str(cpa_account.get("refresh_token") or ""),
    }

    if email:
        credentials["email"] = email
    if account_id:
        credentials["chatgpt_account_id"] = account_id
    if expires_at:
        credentials["expires_at"] = expires_at
    if token_version is not None:
        credentials["_token_version"] = token_version

    account = {
        "name": build_account_name(cpa_account, index, default_type),
        "credentials": credentials,
    }

    if email:
        account["extra"] = {"email": email}

    disabled = cpa_account.get("disabled")
    if isinstance(disabled, bool):
        account["disabled"] = disabled

    return account


def load_cpa_accounts_from_file(path: Path) -> list[dict]:
    """Load one CPA JSON file, accepting a single object or a list of objects."""
    with path.open("r", encoding="utf-8") as handle:
        data = json.load(handle)

    if isinstance(data, dict) and is_cpa_account_like(data):
        return [data]
    if isinstance(data, list):
        accounts = [item for item in data if is_cpa_account_like(item)]
        if accounts:
            return accounts

    raise ValueError(f"Unsupported JSON structure in {path}")


def load_cpa_accounts(input_path: Path) -> list[dict]:
    """Load CPA accounts from a file or from all JSON files under a directory."""
    if input_path.is_file():
        return load_cpa_accounts_from_file(input_path)

    if input_path.is_dir():
        accounts: list[dict] = []
        for path in sorted(input_path.glob("*.json")):
            try:
                accounts.extend(load_cpa_accounts_from_file(path))
            except ValueError:
                continue
        return accounts

    raise FileNotFoundError(f"Input path not found: {input_path}")


def default_output_path(input_path: Path) -> Path:
    """Choose a default output file path next to the input path."""
    if input_path.is_file():
        return input_path.with_name(f"{input_path.stem}_sub2api.json")
    return input_path.with_name(f"{input_path.name}_sub2api.json")


def convert_input(
    input_value: str,
    output_value: str | None = None,
    default_type: str = "codex",
    exported_at: str | None = None,
) -> tuple[Path, int]:
    """Convert CPA JSON input into one sub2api export JSON file."""
    input_path = Path(input_value)
    accounts = load_cpa_accounts(input_path)
    accounts = [account for account in accounts if isinstance(account, dict)]

    if not accounts:
        print(f"Error: no valid CPA accounts found in {input_path}")
        sys.exit(1)

    output_path = Path(output_value) if output_value else default_output_path(input_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    normalized_exported_at = parse_datetime_to_utc_iso_z(exported_at or "") or utc_now_iso_z()
    export_data = {
        "exported_at": normalized_exported_at,
        "accounts": [
            convert_cpa_account_to_sub2(account, index, default_type)
            for index, account in enumerate(accounts, start=1)
        ],
    }

    with output_path.open("w", encoding="utf-8", newline="\n") as handle:
        json.dump(export_data, handle, ensure_ascii=False, indent=2)
        handle.write("\n")

    return output_path, len(export_data["accounts"])


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Convert one CPA JSON file or a directory of CPA JSON files into one sub2api export JSON file."
    )
    parser.add_argument("input", help="CPA JSON file path, or a directory containing CPA JSON files")
    parser.add_argument("-o", "--output", help="Output sub2api export JSON path")
    parser.add_argument(
        "-t",
        "--type",
        default="codex",
        help="Fallback account type used when a CPA file does not include a type field",
    )
    parser.add_argument(
        "--exported-at",
        help="Override exported_at with an ISO datetime; defaults to current UTC time",
    )

    args = parser.parse_args()
    output_path, written = convert_input(args.input, args.output, args.type, args.exported_at)
    print(f"Done: {written} accounts -> {output_path}")


if __name__ == "__main__":
    main()
