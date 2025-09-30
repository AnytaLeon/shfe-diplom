import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPage.css";
import { useState } from "react";
import Header from "../../../components/Header";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // const [qrData, setQrData] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    seanceId,
    filmName,
    hallName,
    seanceTime,
    selectedDate,
    totalPrice,
    selectedSeatsString,
    tickets,
  } = location.state;

  async function handleConfirmBooking() {
    const params = new FormData();
    params.set("seanceId", String(seanceId));
    params.set("ticketDate", selectedDate);
    params.set("tickets", JSON.stringify(tickets));

    try {
      setLoading(true);
      const response = await fetch(
        "https://shfe-diplom.neto-server.ru/ticket",
        {
          method: "POST",
          body: params,
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }

      const result = await response.json();

      setLoading(false);
      console.log("Билеты успешно забронированы:", result);
      navigate("/ticket", {
        state: {
          totalPrice,
          filmName,
          hallName,
          seanceTime,
          selectedSeatsString,
          qrData: result,
        },
      });
    } catch (error) {
      console.error("Ошибка бронирования:", error);
    }
  }

  return (
    <div className="guest-container">
      <div className="container">
        <Header showLoginButton={false} />
        <main className="payment">
          <div className="payment_header">
            <h2 className="payment_title">Вы выбрали билеты</h2>
          </div>
          <section className="ticket_container">
            <div className="ticket_info">
              <div className="ticket_info-description">
                На фильм:
                <span className="ticket_info-text">{filmName}</span>
              </div>
              <div className="ticket_info-description">
                Места:{" "}
                <span className="ticket_info-text">{selectedSeatsString} </span>
              </div>
              <div className="ticket_info-description">
                В зале: <span className="ticket_info-text">{hallName}</span>
              </div>
              <div className="ticket_info-description">
                Начало сеанса:{" "}
                <span className="ticket_info-text">{seanceTime}</span>
              </div>
              <div className="ticket_info-description">
                Стоимость:{" "}
                <span className="ticket_info-text">{totalPrice}</span> рублей
              </div>
            </div>
            <button className="payment_button" onClick={handleConfirmBooking}>
              Получить код бронирования
            </button>
            <div className="payment_hint">
              <p className="payment_hint-text">
                После оплаты билет будет доступен в этом окне, а также придет
                вам на почту. Покажите QR-код нашему контролеру у входа в зал.
              </p>
              <p className="payment_hint-text">Приятного просмотра!</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default PaymentPage;
