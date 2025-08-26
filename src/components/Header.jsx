function Header({ showLoginButton = true }) {
  return (
    <header className="header">
      <div className="header_container">
        <h1 className="header_logo">
          идем <span className="header_logo-letter">в</span> кино
        </h1>
        {showLoginButton && <button className="header_button">Войти</button>}
      </div>
    </header>
  );
}

export default Header;
