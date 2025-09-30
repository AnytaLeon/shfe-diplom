import { Form, Link, redirect } from "react-router-dom";
import "./LoginPage.css";

export async function login({ request }) {
  const formData = await request.formData();
  const login = formData.get("login");
  const password = formData.get("password");
  const response = await fetch("https://shfe-diplom.neto-server.ru/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login, password }),
  });
  const data = await response.json();
  console.log(data);

  if (!data.success) {
    throw new Error(data.error);
  }

  return redirect("/admin");
}

function LoginPage() {
  return (
    <div className="admin-container">
      <header className="admin_header">
        <Link to="/" className="admin_header-logo">
          Идём<span className="header_logo-letter">в</span>кино
        </Link>
        <p className="admin_subtitle">Администраторррская</p>
      </header>
      <main className="login_main">
        <div className="login_main-header">
          <h1 className="login_main-header-text">Авторизация</h1>
        </div>

        <Form className="login_form" method="post" action="/admin/login">
          <label className="login_label">
            <span className="login_label-text">E-mail</span>
            <input
              type="email"
              name="login"
              className="login_input"
              placeholder="example@domain.xyz"
              required
            />
          </label>
          <label className="login_label">
            <span className="login_label-text">Пароль</span>
            <input
              type="password"
              name="password"
              className="login_input"
              required
            />
          </label>
          <button type="submit" className="login_button">
            Авторизоваться
          </button>
        </Form>
      </main>
    </div>
  );
}

export default LoginPage;
