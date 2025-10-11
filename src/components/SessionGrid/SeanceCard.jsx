import { useDrag } from "react-dnd";

function SeanceCard({
  seance,
  film,
  backgroundColor,
  leftPosition,
  width,
  setIsDragging,
}) {
  const [{ isDragging }, dragRef] = useDrag({
    type: "seance",
    item: () => {
      setIsDragging(true);
      return { seanceId: seance.id, filmName: film?.film_name };
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: () => {
      setIsDragging(false);
    },
  });
  return (
    <div>
      <div
        className="timeline__seance"
        ref={dragRef}
        style={{
          left: `${leftPosition}%`,
          width: `${width}%`,
          opacity: isDragging ? 0.5 : 1,
          backgroundColor,
        }}
      >
        <div className="timeline__film-name">{film?.film_name}</div>
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
}

export default SeanceCard;
