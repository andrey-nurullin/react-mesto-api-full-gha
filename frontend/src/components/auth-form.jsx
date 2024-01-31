import { useForm } from "../hooks/use-form";
import FormWithHeading from "./form-with-heading";

const AuthForm = ({onSubmit, title, name, btnText, btnTextLoading, theme, children}) => {

  const {values, handleChange} = useForm({ email: '', password: ''})

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <section className="auth">
      <FormWithHeading onSubmit={handleSubmit} title={title} name={name} btnText={btnText} btnTextLoading={btnTextLoading} theme={theme}>
        <input value={values.email} onChange={handleChange} type="email" className="form__input form__input_theme_dark" placeholder="Email" name="email" required />
        <input value={values.password} onChange={handleChange} type="password" className="form__input form__input_theme_dark" placeholder="Пароль" name="password" required minLength="5" />
      </FormWithHeading>
      {children}
    </section>
  )
}

export default AuthForm;
