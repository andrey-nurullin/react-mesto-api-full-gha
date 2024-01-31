import { useContext } from "react";
import { AppContext } from "../contexts/app-context";
import { Link, useLocation } from "react-router-dom";

function UserBar({email}) {

  const { isLogged, handleLogout } = useContext(AppContext);
  const location = useLocation();

  function LoggedUserMenu() {
    return (
      <>
        <span className="user-bar__info">{email}</span>
        <Link onClick={handleLogout} className="user-bar__link user-bar__link_logged">Выйти</Link>
      </>
    )
  }

  return (
    <div className="user-bar">
      { isLogged
        ? <LoggedUserMenu />
        : location.pathname === '/signin'
            ? <Link to="/signup" className="user-bar__link">Регистрация</Link>
            : <Link to="/signin" className="user-bar__link">Вход</Link>
      }
    </div>
  )
}

export default UserBar;
