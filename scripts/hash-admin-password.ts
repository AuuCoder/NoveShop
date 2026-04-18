import { hashPassword } from "../lib/password";

async function main() {
  const password = process.argv[2] ?? "";

  if (!password) {
    throw new Error("请在命令后追加管理员密码，例如：npm run security:hash-admin -- 'your-password'");
  }

  console.log(await hashPassword(password));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
