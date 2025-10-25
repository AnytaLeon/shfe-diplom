import { useContext } from "react";
import { MyContext } from "./SessionGrid";

function DeleteSeanceModal({ onClose, handleSeanceDelete }) {
  const { modalData } = useContext(MyContext);
  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <header className="modal__header">
          <h2>Подтверждение удаления</h2>
          <div className="modal__close" onClick={onClose}></div>
        </header>
        <div className="modal__form">
          <p>
            Вы действительно хотите снять с сеанса фильм{" "}
            <span style={{ fontWeight: "bold" }}>"{modalData.filmName}"</span>?
          </p>
          <div className="modal__actions">
            <button
              onClick={handleSeanceDelete}
              className="btn-box btn__primary"
            >
              Удалить
            </button>
            <button
              type="button"
              className="btn-box btn__secondary"
              onClick={onClose}
            >
              Отменить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteSeanceModal;
