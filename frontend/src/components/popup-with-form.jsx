import Popup from "./popup";
import FormWithHeading from "./form-with-heading";

function PopupWithForm(props) {
  return (
    <Popup name={props.name} isOpen={props.isOpen}>
      <FormWithHeading title={props.title} name={props.name} onSubmit={props.onSubmit} btnText={props.btnText} btnTextLoading={props.btnTextLoading}>
        {props.children}
      </FormWithHeading>
    </Popup>
  );
}

export default PopupWithForm;
