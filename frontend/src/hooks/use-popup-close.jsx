import { useEffect } from "react"

export function usePopupClose(isOpen, closePopup) {
  useEffect(() => {
      if (!isOpen) return;

      const handleOverlayClick = (e) => {
        if (e.target.classList.contains('popup_opened')) {
          closePopup();
        }
      };

      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          closePopup();
        }
      };

      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleOverlayClick);

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('mousedown', handleOverlayClick);
      };
    }, [isOpen]
  )
}
