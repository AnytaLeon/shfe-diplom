import { useState } from "react";

function AddSeanceModal({ onClose, hallName, filmName, handleAddSeance }) {
  const [time, setTime] = useState("");

  function handleChange(e) {
    setTime(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (time) {
      handleAddSeance(time);
    }
  }
  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <header className="modal__header">
          <h2>Добавление сеанса</h2>
          <div className="modal__close" onClick={onClose}></div>
        </header>
        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__form-container">
            <label className="modal__form-label">
              Название зала
              <input
                id="hallName"
                type="text"
                className="modal__form-input"
                value={hallName}
                readOnly
              />
            </label>
          </div>
          <div className="modal__form-container">
            <label className="modal__form-label">
              Название фильма
              <input
                id="filmName"
                type="text"
                className="modal__form-input"
                value={filmName}
                readOnly
              />
            </label>
          </div>
          <div className="modal__form-container">
            <label className="modal__form-label">
              Время начала
              <input
                className="modal__form-input"
                name="duration"
                type="time"
                inputMode="numeric"
                min={1}
                placeholder="Время начала"
                value={time}
                onChange={handleChange}
                onBlur={(e) => {
                  if (!e.target.value) {
                    setTime("00:00");
                  }
                }}
                required
              />
            </label>
          </div>
          <div className="modal__actions">
            <button type="submit" className="btn-box btn__primary">
              Добавить
            </button>
            <button
              type="button"
              className="btn-box btn__secondary"
              onClick={onClose}
            >
              Отменить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSeanceModal;
