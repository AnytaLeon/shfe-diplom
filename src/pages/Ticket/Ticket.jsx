import "./Ticket.css";

function Ticket() {
  return (
    <main className="ticket">
      <div className="payment_header">
        <h2 className="payment_title">электронный билет</h2>
      </div>
      <section className="ticket_container">
        <div className="ticket_info">
          <div className="ticket_info-description">
            На фильм:
            <span className="ticket_info-text"> Звездные воины...</span>
          </div>
          <div className="ticket_info-description">
            Места: <span className="ticket_info-text">6, 7 </span>
          </div>
          <div className="ticket_info-description">
            В зале: <span className="ticket_info-text">1</span>
          </div>
          <div className="ticket_info-description">
            Начало сеанса: <span className="ticket_info-text">18:30</span>
          </div>
        </div>
        <div className="ticket_qr">
          <div>QR-code</div>
        </div>
        <div className="payment_hint">
          <p className="payment_hint-text">
            Покажите QR-код нашему контролеру для подтверждения бронирования.
          </p>
          <p className="payment_hint-text">Приятного просмотра!</p>
        </div>
      </section>
    </main>
  );
}

export default Ticket;
