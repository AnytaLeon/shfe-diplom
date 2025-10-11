import { useDrop, useDrag } from "react-dnd";
import { useState } from "react";
import SeanceCard from "./SeanceCard";
import "./SessionGrid.css";

const colors = [
  "#85FFD3",
  "#CAFF85",
  "#85FF89",
  "#85E2FF",
  "#8599FF",
  "#85E2FF",
];

function TimeLine({
  hall,
  seances,
  films,
  setIsDeleteSeanceModalOpen,
  setModalData,
}) {
  const [isDragging, setIsDragging] = useState(false);

  const [, dropRef] = useDrop({
    accept: "film",
    drop: (item) => {
      if (item.filmId) {
        return { hallId: hall.id };
      }
    },
  });

  const [{ isOver }, trashDrop] = useDrop({
    accept: "seance",
    drop: (item) => {
      setIsDeleteSeanceModalOpen(true);
      setModalData({
        seanceId: item.seanceId,
        filmName: item.filmName,
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const sortedSeances = [...seances].sort((a, b) => {
    const [aHours, aMinutes] = a.seance_time.split(":").map(Number);
    const [bHours, bMinutes] = b.seance_time.split(":").map(Number);
    return aHours * 60 + aMinutes - (bHours * 60 + bMinutes);
  });
  return (
    <div className="timeline" ref={dropRef}>
      {isDragging && (
        <div
          className={`timeline__trash ${isOver ? "highlight" : ""}`}
          ref={trashDrop}
        ></div>
      )}
      <h2 className="timeline__hall-name">{hall.hall_name}</h2>
      <div className="timeline__container">
        {sortedSeances.map((seance) => {
          const film = films.find((film) => film.id === seance.seance_filmid);
          const startTime = seance.seance_time.split(":").map(Number);
          const leftPosition =
            ((startTime[0] * 60 + startTime[1]) / 1440) * 100;
          const colorIndex = film
            ? Math.floor(films.indexOf(film)) % colors.length
            : 0;
          const duration = film?.film_duration || 0;
          const width = (duration / 1440) * 100;
          const backgroundColor = colors[colorIndex];
          return (
            <SeanceCard
              key={seance.id}
              seance={seance}
              film={film}
              backgroundColor={backgroundColor}
              leftPosition={leftPosition}
              width={width}
              setIsDragging={setIsDragging}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TimeLine;
