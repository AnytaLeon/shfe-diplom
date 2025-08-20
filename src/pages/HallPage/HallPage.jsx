import "./HallPage.css";

function HallPage() {
  return (
    <main className="hall">
      <section className="hall_container">
        <div className="hall_info">
          <h2 className="hall_movie-title">Звездные воины</h2>
          <p className="hall_movie-start">Начало сеанса: 18-00</p>
          <h3 className="hall-name">Зал 1</h3>
        </div>
        <div className="tap">
          <img className="tap_img" src="./hint.png" alt="tap" />
          <div className="tap_description">Тапните дважды, чтобы увеличить</div>
        </div>
      </section>
      <section className="hall_scheme">
        <div className="hall_scheme-container">
          <div className="hall_screen"></div>

          <div className="hall_rows">
            {/* {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.seats.map((seat, seatIndex) => (
              <button
                key={seatIndex}
                className={`seat ${seat.type} ${seat.selected ? 'selected' : ''} ${seat.occupied ? 'occupied' : ''}`}
                onClick={() => handleSeatSelect(rowIndex, seatIndex)}
                disabled={seat.occupied || seat.type === 'disabled'}
              />
            ))} */}
            {/* </div> */}
            {/* ))} */}
          </div>
          <div className="hall_scheme-prices">
            <div className="hall_scheme-item">
              <div className="hall_scheme-seat standart"></div>
              <span className="hall_scheme-text">Обычные (250 руб)</span>
            </div>
            <div className="hall_scheme-item">
              <div className="hall_scheme-seat vip"></div>
              <span className="hall_scheme-text">VIP (350 руб)</span>
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
          <button className="buy-button">Забронировать</button>
        </div>
      </section>
    </main>
  );
}

export default HallPage;
