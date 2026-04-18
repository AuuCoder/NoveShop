import Link from "next/link";
import { redirect } from "next/navigation";
import { loginMerchantAction } from "@/app/merchant/actions";
import { getMerchantSession } from "@/lib/merchant-session";

export default async function MerchantLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
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
          <span className="admin-auth-badge">Merchant Access</span>
          <div className="admin-auth-logo">M</div>
          <h1 className="admin-auth-title">商户中心登录</h1>
          <p className="admin-auth-copy">
            注册后的商户可以在这里登录，并自行维护自己的 NovaPay 商户参数，不需要管理员代填。
          </p>
        </header>

        {search.error ? <div className="notice-card error admin-auth-notice">{search.error}</div> : null}

        <form action={loginMerchantAction} className="admin-auth-form">
          <label className="admin-auth-field" htmlFor="email">
            <span>邮箱</span>
            <input id="email" name="email" autoComplete="username" placeholder="merchant@example.com" required />
          </label>

          <label className="admin-auth-field" htmlFor="password">
            <span>密码</span>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="输入商户密码"
              autoComplete="current-password"
              required
            />
          </label>

          <div className="admin-auth-row">
            <span>登录后可维护自己的参数</span>
            <Link href="/merchant/register">去注册</Link>
          </div>

          <button type="submit" className="admin-auth-submit">
            登录商户中心
          </button>
        </form>

        <footer className="admin-auth-foot">
          <p>还没有商户账号？</p>
          <p>
            <Link href="/merchant/register">立即注册商户</Link>
          </p>
        </footer>
      </article>
    </section>
  );
}
