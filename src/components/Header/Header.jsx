import "./Header.css"

function Header({ onNavigate }) {
  const isAuthenticated = false;

  // Dummy authentication variable. Will be eventually replaced with actual authentication logic.
  const handleLoginClick = () => onNavigate('login');
  const handleRegisterClick = () => onNavigate('register');
  const handleLogoutClick = () => onNavigate('login');

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="title">ThreadHive</h1>
      </div>
      <div className="header-right">
        {!isAuthenticated && (
          <>
            <button type="button" onClick={handleLoginClick}>Login</button>
            <button type="button" onClick={handleRegisterClick}>Register</button>
          </>
        )}
        {isAuthenticated && (
          <button type="button" onClick={handleLogoutClick}>Logout</button>
        )}
      </div>
    </header>
  );
}

export default Header;