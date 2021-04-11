import logo from './../../assets/logo.svg';

const Nav: React.FC = () => {
  return (
    <nav className="account__nav other__nav">
      <div className="account__nav other__nav__logo">
        <img src={logo} alt="Netflix Logo" />
      </div>
    </nav>
  );
}

export default Nav;