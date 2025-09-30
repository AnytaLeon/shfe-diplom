import { useEffect, useState } from "react";
import "./HallConfig.css";

function HallConfig({ hallData, onSave, onCancel }) {
  const [rows, setRows] = useState(hallData.hall_rows);
  const [places, setPlaces] = useState(hallData.hall_places);
  const [config, setConfig] = useState(hallData.hall_config);

  useEffect(() => {
    setRows(hallData.hall_rows);
    setPlaces(hallData.hall_places);
    setConfig(hallData.hall_config);
  }, [hallData]);

  useEffect(() => {
    const updatedConfig = Array.from({ length: rows }, (_, rowIndex) =>
      Array.from(
        { length: places },
        (_, placeIndex) => config[rowIndex]?.[placeIndex] || "disabled"
      )
    );
    setConfig(updatedConfig);
  }, [rows, places]);

  function handleRowsChange(newRows) {
    if (newRows === "") {
      setRows(0);
      return;
    }

    const parsedRows = parseInt(newRows, 10);

    if (!isNaN(parsedRows)) {
      setRows(parsedRows);
    }
  }
  function handlePlacesChange(newPlaces) {
    if (newPlaces === "") {
      setPlaces(0);
      return;
    }
    const parsedPlaces = parseInt(newPlaces, 10);
    if (!isNaN(parsedPlaces)) {
      setPlaces(parsedPlaces);
    }
  }

  function handleSeatClick(rowIndex, placeIndex) {
    const updatedConfig = config.map((row, rIndex) =>
      rIndex === rowIndex
        ? row.map((seat, pIndex) =>
            pIndex === placeIndex
              ? (seat === "standart" && "vip") ||
                (seat === "vip" && "disabled") ||
                (seat === "disabled" && "standart")
              : seat
          )
        : row
    );

    setConfig(updatedConfig);
  }

  function handleCancel() {
    setRows(hallData.hall_rows);
    setPlaces(hallData.hall_places);
    setConfig(hallData.hall_config);
    onCancel();
  }

  function handleSave() {
    const updatedHallData = {
      ...hallData,
      hall_rows: rows,
      hall_places: places,
      hall_config: config,
    };
    const params = new FormData();
    params.set("rowCount", rows.toString());
    params.set("placeCount", places.toString());
    params.set("config", JSON.stringify(config));

    fetch(`https://shfe-diplom.neto-server.ru/hall/${hallData.id}`, {
      method: "POST",
      body: params,
    })
      .then((response) => response.json())
      .then((data) => {
        onSave(updatedHallData);
      })
      .catch((error) =>
        console.error("Ошибка сохранения конфигурации: ", error)
      );
  }

  return (
    <div className="hall-config">
      <div className="hall-config__controls">
        <div className="hall-config__controls-tittle">
          Укажите количество рядов и максимальное количество кресел в ряду:
        </div>
        <div className="hall-config__controls-places">
          <label className="hall-config__controls-label">
            Рядов, шт
            <input
              className="hall-config__controls-input"
              type="number"
              value={rows || " "}
              inputMode="numeric"
              min="1"
              max="10"
              onChange={(e) => handleRowsChange(e.target.value)}
            />
          </label>
          <span className="hall-config__controls-symbol">x</span>
          <label className="hall-config__controls-label">
            Мест, шт
            <input
              className="hall-config__controls-input"
              type="number"
              value={places || " "}
              inputMode="numeric"
              min="1"
              max="10"
              onChange={(e) => handlePlacesChange(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="hall-config__types-of-chairs">
        <div className="hall-config__types-of-chairs-info">
          <span>Теперь вы можете указать типы кресел на схеме зала:</span>
          <div className="hall-config__types-of-chairs-info-container">
            <div className="hall-config__types-of-chairs-info-row">
              <div className="box hall-config__types-of-chairs-seat-standart"></div>
              <div>— обычные кресла</div>
            </div>
            <div className="hall-config__types-of-chairs-info-row">
              <div className="box hall-config__types-of-chairs-seat-vip"></div>
              <div>— VIP кресла</div>
            </div>
            <div className="hall-config__types-of-chairs-info-row">
              <div className="box hall-config__types-of-chairs-seat-disabled "></div>
              <div>— заблокированные (нет кресла)</div>
            </div>
          </div>
        </div>
      </div>
      <div className="hall-config__types-of-chairs-tittle">
        Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши
      </div>
      <div className="hall-config__types-of-chairs-screen">
        <div className="hall-config__types-of-chairs-screen-tittle">ЭКРАН</div>
        <div className="hall-config__grid">
          {config.map((row, rowIndex) => (
            <div key={rowIndex} className="hall-config__types-of-chairs-row">
              {row.map((seat, placeIndex) => (
                <button
                  key={placeIndex}
                  className={`box hall-config__types-of-chairs-seat hall-config__types-of-chairs-seat-${seat}`}
                  onClick={() => handleSeatClick(rowIndex, placeIndex)}
                ></button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="hall-config__actions">
        <button className="hall-config__actions-cancel" onClick={handleCancel}>
          ОТМЕНА
        </button>
        <button className="hall-config__actions-save" onClick={handleSave}>
          СОХРАНИТЬ
        </button>
      </div>
    </div>
  );
}

export default HallConfig;
