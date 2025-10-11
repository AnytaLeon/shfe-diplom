import { useDrag } from "react-dnd";
import "./SessionGrid.css";

const colors = [
  "#85FFD3",
  "#CAFF85",
  "#85FF89",
  "#85E2FF",
  "#8599FF",
  "#85E2FF",
];

function FilmCard({ films, film, onDeleteFilm }) {
  const [{ isDragging }, dragRef] = useDrag({
    type: "film",
    item: { filmId: film.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const colorIndex = Math.floor(films.indexOf(film)) % colors.length;
  const backgroundColor = colors[colorIndex];

  return (
    <div
      className="film-card"
      style={{ opacity: isDragging ? 0.5 : 1, backgroundColor }}
      ref={dragRef}
    >
      <img
        src={film.film_poster}
        alt={film.film_name}
        className="film-card__poster"
      />
      <div className="film-card__details">
        <h3 className="film-card__details-title">{film.film_name}</h3>
        <p className="film-card__details-duration">
          {film.film_duration} минут
        </p>
        <div
          className="film-card__delete-button"
          onClick={() => onDeleteFilm(film.id)}
        ></div>
      </div>
    </div>
  );
}

export default FilmCard;
