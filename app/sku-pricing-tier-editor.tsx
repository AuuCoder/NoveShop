"use client";

import { useMemo, useState } from "react";
import { describeSkuPricingTier, parseSkuPricingTiersInput, parseStoredSkuPricingTiers } from "@/lib/sku-pricing";

type SkuPricingTierEditorProps = {
  name: string;
  initialValue?: string | null;
};

type PricingTierDraft = {
  id: string;
  minQuantity: string;
  maxQuantity: string;
  unitPrice: string;
};

function createDraftId() {
  return `tier_${Math.random().toString(36).slice(2, 10)}`;
}

function createEmptyDraft(previous?: PricingTierDraft): PricingTierDraft {
  const previousMax = Number(previous?.maxQuantity ?? "");
  const nextMinQuantity = Number.isInteger(previousMax) && previousMax > 0 ? String(previousMax + 1) : "";

  return {
    id: createDraftId(),
    minQuantity: nextMinQuantity,
    maxQuantity: "",
    unitPrice: "",
  };
}

function createDraftsFromValue(initialValue?: string | null) {
  const tiers = parseStoredSkuPricingTiers(initialValue);

  return tiers.map((tier) => ({
    id: createDraftId(),
    minQuantity: String(tier.minQuantity),
    maxQuantity: tier.maxQuantity === null ? "" : String(tier.maxQuantity),
    unitPrice: (tier.unitPriceCents / 100).toFixed(2),
  }));
}

function normalizeDigits(value: string) {
  return value.replace(/[^\d]/g, "");
}

function normalizePrice(value: string) {
  const compact = value.replace(/[^\d.]/g, "");
  const [integerPart = "", ...decimalParts] = compact.split(".");
  const decimalPart = decimalParts.join("").slice(0, 2);

  if (!compact.includes(".")) {
    return integerPart;
  }

  return `${integerPart}.${decimalPart}`;
}

function serializeDrafts(drafts: PricingTierDraft[]) {
  return drafts
    .filter((draft) => draft.minQuantity.trim() || draft.maxQuantity.trim() || draft.unitPrice.trim())
    .map((draft) => {
      const minQuantity = draft.minQuantity.trim();
      const maxQuantity = draft.maxQuantity.trim();
      const unitPrice = draft.unitPrice.trim();

      if (!minQuantity || !unitPrice) {
        return "";
      }

      return maxQuantity ? `${minQuantity}-${maxQuantity}=${unitPrice}` : `${minQuantity}+=${unitPrice}`;
    })
    .filter(Boolean)
    .join("\n");
}

export function SkuPricingTierEditor({ name, initialValue }: SkuPricingTierEditorProps) {
  const [drafts, setDrafts] = useState<PricingTierDraft[]>(() => createDraftsFromValue(initialValue));

  const hiddenValue = useMemo(() => serializeDrafts(drafts), [drafts]);
  const activeRows = useMemo(
    () => drafts.filter((draft) => draft.minQuantity.trim() || draft.maxQuantity.trim() || draft.unitPrice.trim()),
    [drafts],
  );

  const feedback = useMemo(() => {
    if (activeRows.length === 0) {
      return {
        message: "留空则按固定售价出售；需要阶梯价时，点击“新增一档”即可。",
        tone: "muted" as const,
      };
    }

    const hasIncompleteRow = activeRows.some((draft) => !draft.minQuantity.trim() || !draft.unitPrice.trim());

    if (hasIncompleteRow) {
      return {
        message: "请补全每一档的起始数量和单价；结束数量留空表示“及以上”。",
        tone: "warning" as const,
      };
    }

    try {
      const tiers = parseSkuPricingTiersInput(hiddenValue);
      return {
        message: tiers.map(describeSkuPricingTier).join(" / "),
        tone: "success" as const,
      };
    } catch (error) {
      return {
        message: error instanceof Error ? error.message : "阶梯价配置有误，请检查数量区间和单价。",
        tone: "warning" as const,
      };
    }
  }, [activeRows, hiddenValue]);

  function updateDraft(id: string, patch: Partial<PricingTierDraft>) {
    setDrafts((currentDrafts) =>
      currentDrafts.map((draft) => (draft.id === id ? { ...draft, ...patch } : draft)),
    );
  }

  function addDraft() {
    setDrafts((currentDrafts) => [...currentDrafts, createEmptyDraft(currentDrafts[currentDrafts.length - 1])]);
  }

  function removeDraft(id: string) {
    setDrafts((currentDrafts) => currentDrafts.filter((draft) => draft.id !== id));
  }

  return (
    <div className="tier-editor">
      <input type="hidden" name={name} value={hiddenValue} />

      <div className="tier-editor-toolbar">
        <p className="small-copy">
          按数量区间配置单价，系统会自动按命中的区间计费；没有命中时回退到当前 SKU 固定售价。
        </p>
        <button type="button" className="button-link tier-editor-add" onClick={addDraft}>
          新增一档
        </button>
      </div>

      {drafts.length > 0 ? (
        <div className="tier-editor-list">
          {drafts.map((draft, index) => (
            <div key={draft.id} className="tier-editor-row">
              <div className="field">
                <label>{index === 0 ? "起始数量" : "本档起始"}</label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="\d+"
                  placeholder={index === 0 ? "1" : "11"}
                  value={draft.minQuantity}
                  onChange={(event) => updateDraft(draft.id, { minQuantity: normalizeDigits(event.target.value) })}
                  required
                />
              </div>

              <div className="field">
                <label>结束数量</label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  placeholder="留空=及以上"
                  value={draft.maxQuantity}
                  onChange={(event) => updateDraft(draft.id, { maxQuantity: normalizeDigits(event.target.value) })}
                />
              </div>

              <div className="field">
                <label>单价</label>
                <input
                  type="text"
                  inputMode="decimal"
                  pattern="\d+(\.\d{1,2})?"
                  placeholder="9.00"
                  value={draft.unitPrice}
                  onChange={(event) => updateDraft(draft.id, { unitPrice: normalizePrice(event.target.value) })}
                  required
                />
              </div>

              <button type="button" className="button-link tier-editor-remove" onClick={() => removeDraft(draft.id)}>
                删除
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="tier-editor-empty">
          <strong>暂未配置阶梯价</strong>
          <p>例如先加三档：1-10 件、11-100 件、101-1000 件，对应不同单价。</p>
        </div>
      )}

      <p className={`small-copy tier-editor-feedback is-${feedback.tone}`}>{feedback.message}</p>
    </div>
  );
}
