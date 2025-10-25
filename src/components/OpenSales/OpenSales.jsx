import { useEffect, useState } from "react";
import "./OpenSales.css";

function OpenSales({ selectedHallForOpen, onSave }) {
  const [isHallOpen, setIsHallOpen] = useState(selectedHallForOpen.hall_open);

  useEffect(() => {
    setIsHallOpen(selectedHallForOpen.hall_open);
  }, [selectedHallForOpen]);

  function handleSave() {
    const changeOpen = isHallOpen ? 0 : 1;

    const updatedSelectedHallForOpen = {
      ...selectedHallForOpen,
      hall_open: changeOpen,
    };

    const params = new FormData();
    params.set("hallId", updatedSelectedHallForOpen.id.toString());
    params.set("hallOpen", updatedSelectedHallForOpen.hall_open.toString());
    fetch(`https://shfe-diplom.neto-server.ru/open/${selectedHallForOpen.id}`, {
      method: "POST",
      body: params,
    })
      .then((response) => response.json())
      .then((data) => {
        onSave(updatedSelectedHallForOpen);
      })
      .catch((error) => console.error("Ошибка сохранения цен: ", error));
  }

  return (
    <div className="open-sales">
      <div className="open-sales_title">
        Зал: {isHallOpen ? "Открыт" : "Закрыт"}
      </div>
      {isHallOpen ? (
        <div className="open-sales__actions">
          <button className="open-sales__actions-button" onClick={handleSave}>
            ЗАКРЫТЬ ПРОДАЖУ БИЛЕТОВ
          </button>
        </div>
      ) : (
        <div className="open-sales__actions">
          <button className="open-sales__actions-button" onClick={handleSave}>
            ОТКРЫТЬ ПРОДАЖУ БИЛЕТОВ
          </button>
        </div>
      )}
    </div>
  );
}

export default OpenSales;
