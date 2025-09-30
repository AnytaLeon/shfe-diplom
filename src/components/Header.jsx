import { Link, useNavigate } from "react-router-dom";

function Header({ showLoginButton = true }) {
  const navigate = useNavigate();
  function handleLoginClick() {
    navigate("/admin/login");
  }

  return (
    <header className="header">
      <div className="header_container">
        <Link to="/" className="header_logo">
          идем<span className="header_logo-letter">в</span>кино
        </Link>
        {showLoginButton && (
          <button className="header_button" onClick={handleLoginClick}>
            Войти
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
