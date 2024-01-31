import logo from '../images/logo-mesto.svg';
import UserBar from './user-bar';

function Header({email}) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип проекта Mesto Russia" className="logo" />
      <UserBar email={email}/>
    </header>
  );
}

export default Header;
