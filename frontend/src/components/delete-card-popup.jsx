import PopupWithForm from "./popup-with-form";

function DeleteCardPopup({ isOpen, onConfirmSubmit }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmSubmit();
  }

  return (
    <PopupWithForm
      name="confirmation"
      title="Вы уверены?"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      btnText='Да'
      btnTextLoading='Удаление...'
    />
  )
}

export default DeleteCardPopup;
