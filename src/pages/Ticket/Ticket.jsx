import { useLocation } from "react-router-dom";
import "./Ticket.css";
import Header from "../../components/Header";
import QRCode from "react-qr-code";

function Ticket() {
  const location = useLocation();

  const { filmName, hallName, seanceTime, selectedSeatsString, qrData } =
    location.state;

  return (
    <div className="container">
      <Header showLoginButton={false} />
      <main className="ticket">
        <div className="payment_header">
          <h2 className="payment_title">электронный билет</h2>
        </div>
        <section className="ticket_container">
          <div className="ticket_info">
            <div className="ticket_info-description">
              На фильм:
              <span className="ticket_info-text"> {filmName} </span>
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
          </div>
          <div className="ticket_qr">
            <div>
              <QRCode value={JSON.stringify(qrData)} size={200} />
            </div>
          </div>
          <div className="payment_hint">
            <p className="payment_hint-text">
              Покажите QR-код нашему контролеру для подтверждения бронирования.
            </p>
            <p className="payment_hint-text">Приятного просмотра!</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Ticket;
