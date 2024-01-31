import { useContext } from "react";
import AuthForm from "./auth-form";
import { AppContext } from "../contexts/app-context";

function Login() {

  const { handleLogin } = useContext(AppContext);

  return (
    <AuthForm onSubmit={handleLogin} title="Вход" name="login" btnText="Войти" btnTextLoading="Вход..." theme="dark" />
  );
}

export default Login;
