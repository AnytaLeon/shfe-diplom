import { useState } from "react";
import FilmCard from "./FilmCard";
// import { useDrop } from "react-dnd";
import TimeLine from "./TimeLine";
import "./SessionGrid.css";

function SessionGrid({ halls, films, seances, setSeances, setFilms }) {
  async function handleDeleteFilm(filmId) {
    try {
      const res = await fetch(
        `https://shfe-diplom.neto-server.ru/film/${filmId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      console.log(data);
      setFilms(data.result.films);
      setSeances(data.result.seances);
    } catch (error) {
      console.error("Ошибка при удалении фильма", error);
    }
  }

  function handleCancel() {}
  function handleSave() {}

  return (
    <div className="session-grid">
      <div className="film-list">
        {films.map((film) => (
          <FilmCard key={film.id} film={film} onDeleteFilm={handleDeleteFilm} />
        ))}
      </div>
      <div className="timeline-container">
        {halls.map((hall) => (
          <TimeLine
            key={hall.id}
            hall={hall}
            films={films}
            seances={seances.filter((s) => s.seance_hallid === hall.id)}
          />
        ))}
      </div>
      <div className="session-grid__actions">
        <button className="session-grid__actions-cancel" onClick={handleCancel}>
          ОТМЕНА
        </button>
        <button className="session-grid__actions-save" onClick={handleSave}>
          СОХРАНИТЬ
        </button>
      </div>
    </div>
  );
}

export default SessionGrid;
