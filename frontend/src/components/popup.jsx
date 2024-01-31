import { useContext } from "react"
import { AppContext } from "../contexts/app-context"
import { usePopupClose } from "../hooks/use-popup-close";

function Popup(props) {
  const appContext = useContext(AppContext);
  usePopupClose(props.isOpen, appContext.closeAllPopups);
  return (
    <div className={`popup popup_type_${props.name} ${(props.isOpen) && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close-button hover-on-react" type="button" onClick={appContext.closeAllPopups} />
        {props.children}
      </div>
    </div>
  )
}

export default Popup;
