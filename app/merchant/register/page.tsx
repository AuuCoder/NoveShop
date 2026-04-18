import Link from "next/link";
import { redirect } from "next/navigation";
import { registerMerchantAction } from "@/app/merchant/actions";
import { getMerchantSession } from "@/lib/merchant-session";

export default async function MerchantRegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  if (await getMerchantSession()) {
    redirect("/merchant");
  }

  const search = await searchParams;

  return (
    <section className="admin-route admin-auth-shell">
      <div className="admin-auth-overlay" aria-hidden="true" />

      <div className="admin-auth-petals" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <article className="admin-auth-card">
        <div className="admin-auth-glow" aria-hidden="true" />

        <header className="admin-auth-head">
          <span className="admin-auth-badge">Merchant Signup</span>
          <div className="admin-auth-logo">M</div>
          <h1 className="admin-auth-title">商户入驻</h1>
          <p className="admin-auth-copy">
            商户注册后可以直接进入商户中心，自行配置自己的 NovaPay 参数，后续管理员只需要绑定商品即可。
          </p>
        </header>

        {search.error ? <div className="notice-card error admin-auth-notice">{search.error}</div> : null}
        {search.success ? <div className="notice-card success admin-auth-notice">{search.success}</div> : null}

        <form action={registerMerchantAction} className="admin-auth-form">
          <label className="admin-auth-field" htmlFor="name">
            <span>商户名称</span>
            <input id="name" name="name" autoComplete="organization" placeholder="例如 A 站商户" required />
          </label>

          <label className="admin-auth-field" htmlFor="email">
            <span>邮箱</span>
            <input id="email" name="email" autoComplete="email" placeholder="merchant@example.com" required />
          </label>

          <label className="admin-auth-field" htmlFor="password">
            <span>密码</span>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="至少 6 位"
              autoComplete="new-password"
              required
            />
          </label>

          <div className="admin-auth-row">
            <span>注册后自动登录</span>
            <Link href="/merchant/login">已有账号</Link>
          </div>

          <button type="submit" className="admin-auth-submit">
            创建商户账号
          </button>
        </form>

        <footer className="admin-auth-foot">
          <p>已经有商户账号了？</p>
          <p>
            <Link href="/merchant/login">直接登录</Link>
          </p>
        </footer>
      </article>
    </section>
  );
}
