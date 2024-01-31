import Popup from "./popup";
import imgSuccess from "../images/icon-tooltip-success.png";
import imgFailure from "../images/icon-tooltip-failure.png";
import Heading from "./heading";

function InfoTooltip({ isOpen, isSuccess, tooltip }) {
  return (
    <Popup isOpen={isOpen} name="tooltip">
      <img src={ isSuccess ? imgSuccess : imgFailure } alt={tooltip}/>
      <Heading title={tooltip} />
    </Popup>
  )
}

export default InfoTooltip;
