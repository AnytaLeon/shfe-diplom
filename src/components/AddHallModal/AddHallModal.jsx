import { useState } from "react";
import "./AddHallModal.css";

function AddHallModal({ onClose, onHallAdded }) {
  const [hallName, setHallName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return;
    setError(null);
    setIsSubmitting(true);

    const params = new FormData();
    params.set("hallName", hallName);

    try {
      const response = await fetch("https://shfe-diplom.neto-server.ru/hall", {
        method: "POST",
        body: params,
      });

      const data = await response.json();

      if (data.success && data.result?.halls) {
        onHallAdded(data.result.halls);
        onClose();
      } else {
        console.error("Ошибка создания зала:", data.message);
      }
    } catch (error) {
      console.error("Ошибка сети при создании зала:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <header className="modal__header">
          <h2>Добавление зала</h2>
          <div className="modal__close" onClick={onClose}></div>
        </header>
        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__form-container">
            <label className="modal__form-label">
              Название зала
              <input
                type="text"
                className="modal__form-input"
                placeholder="Например, «Зал 1»"
                id="hallName"
                name="name"
                onChange={(e) => setHallName(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="modal__actions">
            <button
              type="submit"
              className="btn-box btn__primary"
              disabled={isSubmitting}
            >
              Добавить
            </button>
            <button
              type="button"
              className="btn-box btn__secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Отменить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddHallModal;
