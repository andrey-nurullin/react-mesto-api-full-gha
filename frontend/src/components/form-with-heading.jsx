import Form from "./form";
import Heading from "./heading";

function FormWithHeading(props) {

  return (
    <>
      <Heading title={props.title} theme={props.theme} />
      <Form {...props} />
    </>
  )
}

export default FormWithHeading;
