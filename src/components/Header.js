const Header = ({ username }) => {
  return (
    <header id="header">
      <h1 className="header-text">TODO LIST</h1>
      <br />
      <h5>Welcome back {username}</h5>
    </header>
  );
};

export default Header;
