import { loginAction } from "@/app/admin/actions";
import { getEnv } from "@/lib/env";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const search = await searchParams;
  const env = getEnv();

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
          <span className="admin-auth-badge">Admin Access</span>
          <div className="admin-auth-logo">N</div>
          <h1 className="admin-auth-title">欢迎回来，指挥官</h1>
          <p className="admin-auth-copy">
            本地控制台已经接入同目录 NovaPay，登录后就能管理商品、导入卡密和查看订单流转。
          </p>
        </header>

        {search.error ? <div className="notice-card error admin-auth-notice">{search.error}</div> : null}

        <form action={loginAction} className="admin-auth-form">
          <label className="admin-auth-field" htmlFor="username">
            <span>邮箱</span>
            <input
              id="username"
              name="username"
              defaultValue={env.isDevelopment ? env.adminUsername : ""}
              autoComplete="username"
              required
            />
          </label>

          <label className="admin-auth-field" htmlFor="password">
            <span>密码</span>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="输入管理员口令"
              autoComplete="current-password"
              required
            />
          </label>

          <div className="admin-auth-row">
            <span>{env.isDevelopment ? "开发环境已预填账号" : "请输入已配置管理员账号"}</span>
            <span>支付回调强制验签</span>
          </div>

          <button type="submit" className="admin-auth-submit">
            确认登入
          </button>
        </form>

        <footer className="admin-auth-foot">
          <p>{env.isDevelopment ? `当前后台账号：${env.adminUsername}` : "后台账号由部署环境变量管理。"}</p>
          <p>最小后台保留商品、库存、订单三块核心能力。</p>
        </footer>
      </article>
    </section>
  );
}
