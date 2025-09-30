import "./AddFilmModal.css";
import { useState } from "react";

function AddFilmModal({ onClose, onFilmAdded }) {
  const [form, setForm] = useState({
    name: "",
    duration: "",
    description: "",
    origin: "",
    poster: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return;
    if (!form.poster) {
      setError("Пожалуйста, добавьте постер для фильма.");
      return;
    }
    setError(null);
    setIsSubmitting(true);

    const params = new FormData();
    params.set("filmName", form.name);
    params.set("filmDuration", form.duration);
    params.set("filmDescription", form.description);
    params.set("filmOrigin", form.origin);
    if (form.poster) params.set("filePoster", form.poster);

    try {
      const response = await fetch("https://shfe-diplom.neto-server.ru/film", {
        method: "POST",
        body: params,
      });

      const data = await response.json();
      console.log(data);

      onFilmAdded(data.result.films);
      onClose();
    } catch (error) {
      console.error("Ошибка добавления фильма:", error);
    } finally {
      setIsSubmitting(false);
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
  }
  function handleFileChange(e) {
    const file = e.target.files?.[0] || null;

    if (file) {
      if (file.type !== "image/png") {
        setError("Пожалуйста, загрузите файл в формате PNG.");
        e.target.value = "";
        return;
      }

      if (file.size > 3 * 1024 * 1024) {
        setError("Размер файла не должен превышать 3 МБ.");
        e.target.value = "";
        return;
      }
    }

    setForm((prev) => ({ ...prev, poster: file }));
    setError(null);
  }

  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <header className="modal__header">
          <h2>Добавление фильма</h2>
          <div className="modal__close" onClick={onClose}></div>
        </header>
        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__form-container">
            <label className="modal__form-label">
              Название фильма
              <input
                type="text"
                className="modal__form-input"
                placeholder="Например, «Гражданин Кейн»"
                id="filmName"
                name="name"
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="modal__form-container">
            <label className="modal__form-label">
              Продолжительность фильма, мин.
              <input
                type="number"
                className="modal__form-input"
                id="filmTime"
                name="duration"
                placeholder="Продолжительность фильма (мин.)"
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="modal__form-container">
            <label className="modal__form-label">
              Описание фильма
              <textarea
                type="text"
                className="modal__form-textarea"
                id="filTittle"
                name="description"
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="modal__form-container">
            <label className="modal__form-label">
              Страна
              <input
                type="text"
                className="modal__form-input"
                id="filmCountry"
                name="origin"
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="modal__actions">
            <button type="submit" className="btn-box btn__primary">
              Добавить фильм
            </button>

            <label className="btn-box btn__upload">
              Загрузить постер
              <input
                id="filePoster"
                type="file"
                className="hidden-input"
                onChange={handleFileChange}
              />
            </label>

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

export default AddFilmModal;
