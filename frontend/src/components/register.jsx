import { NavLink } from "react-router-dom";
import AuthForm from "./auth-form";
import { useContext } from "react";
import { AppContext } from "../contexts/app-context";

function Register() {

  const { handleRegister } = useContext(AppContext);

  return (
    <AuthForm onSubmit={handleRegister} title="Регистрация" name="register"  btnText="Зарегистрироваться" btnTextLoading="Регистрация..." theme="dark">
      <NavLink className="auth__link-sign-in" to="/sign-in" replace>Уже зарегистрированы? Войти</NavLink>
    </AuthForm>
  );
}

export default Register;
