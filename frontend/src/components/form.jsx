import { useContext } from "react";
import { AppContext } from "../contexts/app-context";

function Form({onSubmit, name, btnText, btnTextLoading, theme, children}) {
  const appContext = useContext(AppContext);
  const buttonCaption = appContext.isLoading ?
    (btnTextLoading ?? 'Сохранение...') :
    (btnText ?? 'Сохранить');
  return (
    <form onSubmit={onSubmit} className={`form ${ theme ? 'form_theme_' + theme : '' }`} name={name}>
      {children}
      <button className={`button ${ theme ? 'button_theme_' + theme : '' }`} type="submit">{buttonCaption}</button>
    </form>
  )
}

export default Form;
