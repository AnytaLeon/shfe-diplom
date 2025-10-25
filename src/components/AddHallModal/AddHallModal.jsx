import { Form } from "react-router-dom";
import "./AddHallModal.css";

export async function createHall({ request }) {
  const formData = await request.formData();
  const hallName = formData.get("hallName");

  const response = await fetch("https://shfe-diplom.neto-server.ru/hall", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ hallName }),
  });

  if (!response.ok) {
    throw new Error("Failed");
  }

  const result = await response.json();
  return result;
}

function AddHallModal({ onClose }) {
  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <header className="modal__header">
          <h2>Добавление зала</h2>
          <div className="modal__close" onClick={onClose}></div>
        </header>
        <Form className="modal__form" method="post" action="/admin">
          <div className="modal__form-container">
            <label className="modal__form-label">
              Название зала
              <input
                type="text"
                className="modal__form-input"
                placeholder="Например, «Зал 1»"
                name="hallName"
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
        </Form>
      </div>
    </div>
  );
}

export default AddHallModal;
