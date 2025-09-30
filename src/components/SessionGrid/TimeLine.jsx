import { useDrop } from "react-dnd";
import { useState } from "react";
import AddSeanceModal from "./AddSeanceModal";

const colors = [
  "#85FFD3",
  "#CAFF85",
  "#85FF89",
  "#85E2FF",
  "#8599FF",
  "#85E2FF",
];

function TimeLine({ hall, seances, films }) {
  const sortedSeances = [...seances].sort((a, b) => {
    const [aHours, aMinutes] = a.seance_time.split(":").map(Number);
    const [bHours, bMinutes] = b.seance_time.split(":").map(Number);
    return aHours * 60 + aMinutes - (bHours * 60 + bMinutes);
  });

  const [timeLineSeances, setTimeLineSeances] = useState(sortedSeances);
  const [isAddSeanseModal, setIsAddSeanseModal] = useState(false);

  console.log(sortedSeances);

  const [{ isOver }, dropRef] = useDrop({
    accept: "film",
    drop: (item) => {
      setIsAddSeanseModal(true);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div className="timeline" ref={dropRef}>
      <h2 className="timeline__hall-name">{hall.hall_name}</h2>
      <div className="timeline__container">
        {timeLineSeances.map((seance) => {
          const film = films.find((film) => film.id === seance.seance_filmid);
          const startTime = seance.seance_time.split(":").map(Number);
          const leftPosition =
            ((startTime[0] * 60 + startTime[1]) / 1440) * 100;
          const colorIndex = film ? Math.floor(film.id / 5) % colors.length : 0;
          const duration = film?.film_duration || 0;
          const width = (duration / 1440) * 100;
          const backgroundColor = colors[colorIndex];
          return (
            <div key={seance.id}>
              <div
                className="timeline__seance"
                style={{
                  left: `${leftPosition}%`,
                  width: `${width}%`,
                  backgroundColor,
                }}
              >
                <p className="timeline__film-name">{film?.film_name}</p>
              </div>
              <div>
                <p
                  className="timeline__start-time"
                  style={{
                    left: `${leftPosition}%`,
                  }}
                >
                  {seance.seance_time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {isAddSeanseModal && <AddSeanceModal />}
    </div>
  );
}

export default TimeLine;
