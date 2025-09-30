import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./HallPage.css";
import Header from "../../../components/Header";
import { useState } from "react";

function HallPage() {
  const { seanceId } = useParams();
  const location = useLocation();
  const { film, hall, seance, selectedDate } = location.state;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  function handleSeatClick(row, col) {
    const rowIndex = row + 1; // Переносим нумерацию на 1
    const colIndex = col + 1; // Переносим нумерацию на 1

    const isSelected = selectedSeats.some(
      ([r, c]) => r === rowIndex && c === colIndex
    );

    setSelectedSeats((prev) => {
      const updatedSeats = isSelected
        ? prev.filter(([r, c]) => r !== rowIndex || c !== colIndex)
        : [...prev, [rowIndex, colIndex]];

      // Сортировка мест по ряду и месту
      return updatedSeats.sort(([r1, c1], [r2, c2]) =>
        r1 === r2 ? c1 - c2 : r1 - r2
      );
    });
  }

  function handleBooking() {
    const totalPrice = calculateTotalPrice();
    const tickets = [...selectedSeats].map((seat) => {
      let seatType = hall?.hall_config[seat[0] - 1]?.[seat[1] - 1];
      let price =
        seatType === "vip" ? hall.hall_price_vip : hall.hall_price_standart;
      return { row: seat[0], place: seat[1], coast: price };
    });

    const selectedSeatsString = getSelectedSeatsString();

    navigate("/payment", {
      state: {
        totalPrice,
        seanceId,
        filmName: film.film_name,
        hallName: hall.hall_name,
        seanceTime: seance.seance_time,
        selectedSeats,
        selectedSeatsString,
        tickets,
        selectedDate,
      },
    });
  }

  function calculateTotalPrice() {
    return selectedSeats.reduce((total, [row, col]) => {
      const seatType = hall?.hall_config[row - 1]?.[col - 1];
      if (seatType === "vip") {
        return total + hall.hall_price_vip;
      }
      if (seatType === "standart") {
        return total + hall.hall_price_standart;
      }
      return total;
    }, 0);
  }

  function getSelectedSeatsString() {
    return selectedSeats
      .map(([row, col]) => `Ряд ${row}, Место ${col}`)
      .join(" | ");
  }

  return (
    <div className="guest-container">
      <div className="container">
        <Header showLoginButton={false} />
        <main className="hall">
          <section className="hall_container">
            <div className="hall_info">
              <h2 className="hall_movie-title">{film.film_name}</h2>
              <p className="hall_movie-start">
                Начало сеанса: {seance.seance_time}
              </p>
              <h3 className="hall-name">{hall.hall_name}</h3>
            </div>
            <div className="tap">
              <img className="tap_img" src="/hint.png" alt="tap" />
              <div className="tap_description">
                Тапните дважды, чтобы увеличить
              </div>
            </div>
          </section>
          <section className="hall_scheme">
            <div className="hall_scheme-container">
              <div className="hall_screen"></div>

              <div className="hall_scheme-grid">
                {hall.hall_config.map((row, rowIndex) => (
                  <div key={rowIndex} className="hall_scheme-row">
                    {row.map((col, colIndex) => {
                      const seatRow = rowIndex + 1; // Нумерация с 1
                      const seatCol = colIndex + 1; // Нумерация с 1

                      const isSelected = selectedSeats.some(
                        ([r, c]) => r === seatRow && c === seatCol
                      );
                      const isDisabled = col === "disabled";
                      const isTaken = col === "taken";
                      const isVip = col === "vip";

                      return (
                        <div
                          className={`hall_scheme-col ${
                            isDisabled
                              ? "disabled"
                              : isSelected
                              ? "selected"
                              : isVip
                              ? "vip"
                              : isTaken
                              ? "taken"
                              : "standart"
                          }`}
                          key={colIndex}
                          onClick={() =>
                            !isDisabled && handleSeatClick(rowIndex, colIndex)
                          }
                          disabled={isDisabled || isTaken}
                        ></div>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="hall_scheme-prices">
                <div className="hall_scheme-item">
                  <div className="hall_scheme-seat standart"></div>
                  <span className="hall_scheme-text">
                    Обычные ({hall.hall_price_standart} руб)
                  </span>
                </div>
                <div className="hall_scheme-item">
                  <div className="hall_scheme-seat vip"></div>
                  <span className="hall_scheme-text">
                    VIP ({hall.hall_price_vip} руб)
                  </span>
                </div>
                <div className="hall_scheme-item">
                  <div className="hall_scheme-seat occupied"></div>
                  <span className="hall_scheme-text">Занято</span>
                </div>
                <div className="hall_scheme-item">
                  <div className="hall_scheme-seat selected"></div>
                  <span className="hall_scheme-text">Выбрано</span>
                </div>
              </div>
            </div>
            <div className="hall_scheme-button">
              <button
                className="buy-button"
                onClick={handleBooking}
                disabled={selectedSeats.length === 0}
              >
                Забронировать
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default HallPage;
