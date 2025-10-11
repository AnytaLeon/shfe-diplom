import { useState } from "react";
import FilmCard from "./FilmCard";
import TimeLine from "./TimeLine";
import "./SessionGrid.css";
import AddSeanceModal from "./AddSeanceModal";
import DeleteSeanceModal from "./DeleteSeanceModal";
import { useDrop } from "react-dnd";

function SessionGrid({ halls, films, seances, setSeances, setFilms }) {
  const [isAddSeanseModal, setIsAddSeanseModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteSeanceModalOpen, setIsDeleteSeanceModalOpen] = useState(false);

  const [, dropRef] = useDrop({
    accept: "film",
    drop: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult && dropResult.hallId) {
        setModalData({
          filmId: item.filmId,
          hallId: dropResult.hallId,
        });
        setIsAddSeanseModal(true);
      }
    },
  });

  async function handleDeleteFilm(filmId) {
    try {
      const res = await fetch(
        `https://shfe-diplom.neto-server.ru/film/${filmId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      setFilms(data.result.films);
      setSeances(data.result.seances);
    } catch (error) {
      console.error("Ошибка при удалении фильма", error);
    }
  }

  async function handleAddSeance(time) {
    const film = films.find((f) => f.id === modalData.filmId);
    if (!film) {
      setError("Фильм не найден");
      console.log("Фильм не найден");
      return;
    }

    const filmDuration = film.film_duration;

    const [hours, minutes] = time.split(":").map(Number);
    const startTime = hours * 60 + minutes;
    const endTime = startTime + filmDuration;

    if (endTime > 1439) {
      setError("Сеанс заканчивается после 23:59");
      console.log("Сеанс заканчивается после 23:59");
      return true;
    }

    const params = new FormData();
    params.set("seanceHallid", modalData.hallId.toString());
    params.set("seanceFilmid", modalData.filmId.toString());
    params.set("seanceTime", time);

    try {
      setIsSubmitting(true);
      setError(null);
      const response = await fetch(
        "https://shfe-diplom.neto-server.ru/seance",
        {
          method: "POST",
          body: params,
        }
      );
      const data = await response.json();
      setSeances(data.result.seances);

      if (data.success === true) {
        setSeances(data.result.seances);
        setIsAddSeanseModal(false);
        setModalData(null);
        setError(null);
      } else {
        setError(`${data.error}`);
      }
    } catch (error) {
      console.error("Ошибка добавления сеанса:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleSeanceDelete(seanceId) {
    fetch(`https://shfe-diplom.neto-server.ru/seance/${seanceId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setSeances(data.result.seances);
        setIsDeleteSeanceModalOpen(false);
      });
  }
  function handleCancel() {}
  function handleSave() {}

  return (
    <div className="session-grid">
      <div className="film-list">
        {films.map((film) => (
          <FilmCard
            key={film.id}
            film={film}
            onDeleteFilm={handleDeleteFilm}
            films={films}
          />
        ))}
      </div>
      <div className="timeline-container" ref={dropRef}>
        {halls.map((hall) => (
          <TimeLine
            key={hall.id}
            hall={hall}
            films={films}
            seances={seances.filter((s) => s.seance_hallid === hall.id)}
            setIsDeleteSeanceModalOpen={setIsDeleteSeanceModalOpen}
            isDeleteModalOpen={isDeleteSeanceModalOpen}
            setModalData={setModalData}
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
      {isAddSeanseModal && (
        <AddSeanceModal
          onClose={() => {
            setIsAddSeanseModal(false);
          }}
          handleAddSeance={handleAddSeance}
          filmName={
            films.find((f) => f.id === modalData?.filmId)?.film_name || ""
          }
          hallName={
            halls.find((h) => h.id === modalData?.hallId)?.hall_name || ""
          }
        />
      )}
      {isDeleteSeanceModalOpen && (
        <DeleteSeanceModal
          modalData={modalData}
          onClose={() => setIsDeleteSeanceModalOpen(false)}
          handleSeanceDelete={() => handleSeanceDelete(modalData.seanceId)}
        />
      )}
    </div>
  );
}

export default SessionGrid;
