import { useEffect, useState } from "react";
import "./PriceConfig.css";

function PriceConfig({ hallData, onSave, onCancel }) {
  const [priceStandart, setPriceStandart] = useState(
    hallData.hall_price_standart
  );
  const [priceVip, setPriceVip] = useState(hallData.hall_price_vip);

  useEffect(() => {
    setPriceStandart(hallData.hall_price_standart);
    setPriceVip(hallData.hall_price_vip);
  }, [hallData]);

  function handlePriceStandartChange(newPriceStandart) {
    if (newPriceStandart === "") {
      setPriceStandart(1);
      return;
    }
    if (newPriceStandart < 1) {
      newPriceStandart = 1;
      setPriceStandart(1);
    }

    if (newPriceStandart > 2000) {
      newPriceStandart = 2000;
      setPriceStandart(2000);
    }

    if (!isNaN(newPriceStandart)) {
      setPriceStandart(newPriceStandart);
    }
  }
  function handlePriceVipChange(newPriceVip) {
    if (newPriceVip === "") {
      setPriceVip(1);
      return;
    }
    if (newPriceVip < 1) {
      newPriceVip = 1;
      setPriceVip(1);
    }

    if (newPriceVip > 2000) {
      newPriceVip = 2000;
      setPriceVip(2000);
    }

    if (!isNaN(newPriceVip)) {
      setPriceVip(newPriceVip);
    }
  }

  function handleCancel() {
    setPriceStandart(hallData.hall_price_standart);
    setPriceVip(hallData.hall_price_vip);
    onCancel();
  }

  function handleSave() {
    const updatedHallData = {
      ...hallData,
      hall_price_standart: priceStandart,
      hall_price_vip: priceVip,
    };
    const params = new FormData();
    params.set("priceStandart", priceStandart.toString());
    params.set("priceVip", priceVip.toString());
    fetch(`https://shfe-diplom.neto-server.ru/price/${hallData.id}`, {
      method: "POST",
      body: params,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(updatedHallData);
        onSave(updatedHallData);
      })
      .catch((error) => console.error("Ошибка сохранения цен: ", error));
  }

  return (
    <div className="price-config">
      <div className="price-config__controls-prices">
        <div className="price-config__controls-prices-tittle">
          Установите цены для типов кресел:
        </div>
        <div className="price-config__controls-prices-container">
          <div className="price-config__controls-prices-info">
            <label className="price-config__controls-prices-label">
              Цена, рублей
              <div className="price-config__controls-prices-set-price">
                <input
                  className="price-config__controls-prices-input"
                  type="number"
                  value={priceStandart || ""}
                  inputMode="numeric"
                  min="1"
                  max="2000"
                  onChange={(e) => handlePriceStandartChange(e.target.value)}
                />
                <div>за</div>
                <div className="box price-config__controls-prices-standart"></div>
                <div>обычные кресла</div>
              </div>
            </label>
          </div>
          <div className="price-config__controls-prices-info">
            <label className="price-config__controls-prices-label">
              Цена, рублей
              <div className="price-config__controls-prices-set-price">
                <input
                  className="price-config__controls-prices-input"
                  type="number"
                  value={priceVip || ""}
                  inputMode="numeric"
                  min="1"
                  max="2000"
                  onChange={(e) => handlePriceVipChange(e.target.value)}
                />
                <div>за</div>
                <div className="box price-config__controls-prices-vip"></div>
                <div>VIP кресла</div>
              </div>
            </label>
          </div>
        </div>
        <div className="hall-config__actions">
          <button
            className="hall-config__actions-cancel"
            onClick={handleCancel}
          >
            ОТМЕНА
          </button>
          <button className="hall-config__actions-save" onClick={handleSave}>
            СОХРАНИТЬ
          </button>
        </div>
      </div>
    </div>
  );
}

export default PriceConfig;
