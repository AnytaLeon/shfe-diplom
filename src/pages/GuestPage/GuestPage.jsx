import { useEffect, useState } from "react";
import "./GuestPage.css";
import { useLoaderData } from "react-router-dom";

function GuestPage() {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [films, setFilms] = useState([]);
  const [halls, setHalls] = useState([]);
  const [seances, setSeances] = useState([]);
  const data = useLoaderData();

  useEffect(() => {
    const today = new Date();
    const generatedDates = [...Array(6).keys()].map((i) => {
      const date = new Date();
      date.setDate(today.getDate() + i);
      return date;
    });
    setDates(generatedDates);
    const todayString = today.toISOString().split("T")[0];
    setSelectedDate(todayString);
    const filteredFilms = data.result.films.filter((film) => {
      return data.result.seances.some(
        (seance) =>
          seance.seance_filmid === film.id &&
          data.result.halls.some((hall) => hall.id === seance.seance_hallid)
      );
    });
    setFilms(filteredFilms);
    setHalls(data.result.halls);
    setSeances(data.result.seances);
  }, []);

  console.log(seances);
  console.log(halls);
  console.log(films);

  function handleDateClick(date) {
    const dateString = date.toISOString().split("T")[0];
    setSelectedDate(dateString);
  }

  return (
    <>
      <main className="guest-page">
        <nav className="calendar_nav">
          <div className="calendar_container"></div>
          <ul className="calendar_list">
            {dates.map((date) => {
              const dateString = date.toISOString().split("T")[0];
              const isSelected = dateString === selectedDate;
              const isWeekend = date.getDay() === 0 || date.getDay() === 6;
              return (
                <li
                  className={`calendar_list-item ${
                    isSelected ? "active" : ""
                  } ${isWeekend ? "weekend" : ""}`}
                  key={dateString}
                  onClick={() => handleDateClick(date)}
                >
                  {date.toLocaleDateString("ru-RU", {
                    weekday: "short",
                  })}
                  , {date.getDate()}
                </li>
              );
            })}
          </ul>
        </nav>
        <section className="movie_container">
          <ul>
            {films.map((film) => (
              <li className="movie_card" key={film.id}>
                <div className="movie_info">
                  <div className="movie_poster">
                    <img
                      src={film.film_poster}
                      alt={film.film_name}
                      className="poster"
                    />
                  </div>
                  <div className="movie_description">
                    <h3 className="movie_title">{film.film_name}</h3>
                    <p className="movie_text">{film.film_description}</p>
                    <div className="movie_meta">
                      <div className="movie_duration">
                        {film.film_duration} мин
                      </div>
                      <div className="movie_country">{film.film_origin}</div>
                    </div>
                  </div>
                </div>
                <div className="movie_seances">
                  {halls.map((hall) => {
                    const hallSeances = seances.filter(
                      (seance) =>
                        seance.seance_filmid === film.id &&
                        seance.seance_hallid === hall.id
                    );
                    if (hallSeances.length === 0) return null;
                    return (
                      <div className="movie_seances-hall" key={hall.id}>
                        <h4 className="hall_name">{hall.hall_name}</h4>
                        <ul className="seances-list">
                          {hallSeances.map((seance) => (
                            <li className="seances-time" key={seance.id}>
                              {seance.seance_time}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default GuestPage;
