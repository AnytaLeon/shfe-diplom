import "./PaymentPage.css";

function PaymentPage() {
  return (
    <main className="payment">
      <div className="payment_header">
        <h2 className="payment_title">Вы выбрали билеты</h2>
      </div>
      <section className="ticket_container">
        <div className="ticket_info">
          <div className="ticket_info-description">
            На фильм:
            <span className="ticket_info-text">Звездные воины...</span>
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
          <div className="ticket_info-description">
            Стоимость: <span className="ticket_info-text">600</span> рублей
          </div>
        </div>
        <button className="payment_button">Забронировать</button>
        <div className="payment_hint">
          <p className="payment_hint-text">
            После оплаты билет будет доступен в этом окне, а также придет вам на
            почту. Покажите QR-код нашему контролеру у входа в зал.
          </p>
          <p className="payment_hint-text">Приятного просмотра!</p>
        </div>
      </section>
    </main>
  );
}

export default PaymentPage;
