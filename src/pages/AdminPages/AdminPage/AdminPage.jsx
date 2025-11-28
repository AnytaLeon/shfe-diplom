import { Link, useLoaderData } from "react-router-dom";
import "./AdminPage.css";
import { useState } from "react";
import AddHallModal from "../../../components/AddHallModal/AddHallModal";
import HallConfig from "../../../components/HallConfig/HallConfig";
import PriceConfig from "../../../components/PriceConfig/PriceConfig";
import AddFilmModal from "../../../components/AddFilmModal/AddFilmModal";
import SessionGrid from "../../../components/SessionGrid/SessionGrid";
import OpenSales from "../../../components/OpenSales/OpenSales";

function AdminPage() {
  const data = useLoaderData();

  const [halls, setHalls] = useState(data.result.halls);
  const [films, setFilms] = useState(data.result.films);
  const [seances, setSeances] = useState(data.result.seances);
  const [isHallModalOpen, setIsHallModalOpen] = useState(false);
  const [isFilmModalOpen, setIsFilmModalOpen] = useState(false);
  const [sectionStates, setSectionStates] = useState([
    { id: "hallManagment", isOpen: true },
    { id: "hallConfig", isOpen: true },
    { id: "priceConfig", isOpen: true },
    { id: "sessionGrid", isOpen: true },
    { id: "openSales", isOpen: true },
  ]);
  const [selectedHallForConfig, setSelectedHallForConfig] = useState(
    halls[0] || null
  );
  const [selectedHallForPrice, setSelectedHallForPrice] = useState(
    halls[0] || null
  );
  const [selectedHallForOpen, setSelectedHallForOpen] = useState(
    halls[0] || null
  );

  async function handleHallDelete(id) {
    try {
      const res = await fetch(`https://shfe-diplom.neto-server.ru/hall/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      setHalls(data.result.halls);
    } catch (error) {
      console.error("Ошибка при удалении зала", error);
    }
  }

  function isSectionOpen(id) {
    return sectionStates.find((section) => section.id === id)?.isOpen;
  }

  function toggleSection(id) {
    setSectionStates((prevStates) =>
      prevStates.map((section) =>
        section.id === id ? { ...section, isOpen: !section.isOpen } : section
      )
    );
  }

  function handleFilmAdded(data) {
    setFilms(data);
  }

  function handleHallAdded(data) {
    setHalls(data);
  }

  function handleHallConfigClick(hall) {
    if (selectedHallForConfig?.id !== hall.id) {
      setSelectedHallForConfig(hall);
    }
  }

  function handleHallPriceClick(hall) {
    if (selectedHallForPrice?.id !== hall.id) {
      setSelectedHallForPrice(hall);
    }
  }

  function handleHallOpenClick(hall) {
    if (selectedHallForOpen?.id !== hall.id) {
      setSelectedHallForOpen(hall);
    }
  }

  const handleSave = (updatedHallData) => {
    setHalls((prevHalls) =>
      prevHalls.map((hall) =>
        hall.id === updatedHallData.id ? updatedHallData : hall
      )
    );

    if (selectedHallForConfig?.id === updatedHallData.id) {
      setSelectedHallForConfig(updatedHallData);
    }

    if (selectedHallForPrice?.id === updatedHallData.id) {
      setSelectedHallForPrice(updatedHallData);
    }

    if (selectedHallForOpen?.id === updatedHallData.id) {
      setSelectedHallForOpen(updatedHallData);
    }
  };

  const handleCancel = () => {
    if (selectedHallForConfig) {
      const originalHall = halls.find(
        (hall) => hall.id === selectedHallForConfig.id
      );
      if (originalHall) {
        setSelectedHallForConfig(originalHall);
      }
    }

    if (selectedHallForPrice) {
      const originalHall = halls.find(
        (hall) => hall.id === selectedHallForPrice.id
      );

      if (originalHall) {
        setSelectedHallForPrice(originalHall);
      }
    }
  };

  return (
    <div className="admin-container">
      <header className="admin_header">
        <Link to="/" className="admin_header-logo">
          Идём<span className="header_logo-letter">в</span>кино
        </Link>
        <p className="admin_subtitle">Администраторррская</p>
      </header>
      <main className="admin-main">
        <section className="admin-section__container">
          <header className="admin-section__header admin-section__header-alone">
            <div className="admin-section__header-container">
              <div className="admin-section__header-tittle">
                Управление залами
              </div>
              <div
                className={`admin-section__header-close-button ${
                  isSectionOpen("hallManagment") ? "" : "rotated"
                }`}
                onClick={() => toggleSection("hallManagment")}
              ></div>
            </div>
          </header>
          <div
            className={`admin-section__body admin-section__body-both ${
              isSectionOpen("hallManagment") ? "" : "admin-section__hidden"
            }`}
          >
            <div>Доступные залы:</div>
            <ul className="admin-section__hallSet">
              {halls.map((hall) => {
                if (halls.length === 0) return null;
                return (
                  <li key={hall.id} className="hallSet__list-item">
                    <div>–</div>
                    <div>{hall.hall_name}</div>
                    <div
                      className="hallSet__delete-button"
                      onClick={() => handleHallDelete(hall.id)}
                    ></div>
                  </li>
                );
              })}
            </ul>
            <button
              className="admin-section__btn"
              onClick={() => {
                setIsHallModalOpen(true);
              }}
            >
              Cоздать зал
            </button>
          </div>
        </section>
        <section className="admin-section__container">
          <header className="admin-section__header admin-section__header-alone admin-section__header-both">
            <div className="admin-section__header-container">
              <div className="admin-section__header-tittle">
                Конфигурация залов
              </div>
              <div
                className={`admin-section__header-close-button ${
                  isSectionOpen("hallConfig") ? "" : "rotated"
                }`}
                onClick={() => toggleSection("hallConfig")}
              ></div>
            </div>
          </header>
          <div
            className={`admin-section__body admin-section__body-both ${
              isSectionOpen("hallConfig") ? "" : "admin-section__hidden"
            }`}
          >
            <div>Выберите зал для конфигурации:</div>
            <ul className="admin-section__hall-config">
              {halls.map((hall) => {
                if (halls.length === 0) return null;
                return (
                  <li
                    key={hall.id}
                    className={`admin-section__hall-item ${
                      selectedHallForConfig?.id === hall.id
                        ? "admin-section__hall-item-selected"
                        : ""
                    }`}
                    onClick={() => handleHallConfigClick(hall)}
                  >
                    {hall.hall_name}
                  </li>
                );
              })}
            </ul>
            {selectedHallForConfig && (
              <HallConfig
                hallData={selectedHallForConfig}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            )}
          </div>
        </section>
        <section className="admin-section__container">
          <header className="admin-section__header admin-section__header-alone admin-section__header-both">
            <div className="admin-section__header-container">
              <div className="admin-section__header-tittle">
                Конфигурация цен
              </div>
              <div
                className={`admin-section__header-close-button ${
                  isSectionOpen("priceConfig") ? "" : "rotated"
                }`}
                onClick={() => toggleSection("priceConfig")}
              ></div>
            </div>
          </header>
          <div
            className={`admin-section__body admin-section__body-both ${
              isSectionOpen("priceConfig") ? "" : "admin-section__hidden"
            }`}
          >
            <div>Выберите зал для конфигурации:</div>
            <ul className="admin-section__hall-config">
              {halls.map((hall) => {
                if (halls.length === 0) return null;
                return (
                  <li
                    key={hall.id}
                    className={`admin-section__hall-item ${
                      selectedHallForPrice?.id === hall.id
                        ? "admin-section__hall-item-selected"
                        : ""
                    }`}
                    onClick={() => handleHallPriceClick(hall)}
                  >
                    {hall.hall_name}
                  </li>
                );
              })}
            </ul>
            {selectedHallForPrice && (
              <PriceConfig
                hallData={selectedHallForPrice}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            )}
          </div>
        </section>
        <section className="admin-section__container">
          <header className="admin-section__header admin-section__header-alone admin-section__header-both">
            <div className="admin-section__header-container">
              <div className="admin-section__header-tittle">сетка сеансов</div>
              <div
                className={`admin-section__header-close-button ${
                  isSectionOpen("sessionGrid") ? "" : "rotated"
                }`}
                onClick={() => toggleSection("sessionGrid")}
              ></div>
            </div>
          </header>
          <div
            className={`admin-section__body admin-section__body-both ${
              isSectionOpen("sessionGrid") ? "" : "admin-section__hidden"
            }`}
          >
            <button
              className="admin-section__btn"
              onClick={() => {
                setIsFilmModalOpen(true);
              }}
            >
              Добавить фильм
            </button>
            <SessionGrid
              halls={halls}
              films={films}
              seances={seances}
              setSeances={setSeances}
              setFilms={setFilms}
            />
          </div>
        </section>
        <section className="admin-section__container">
          <header className="admin-section__header  admin-section__header-last">
            <div className="admin-section__header-container">
              <div className="admin-section__header-tittle">
                открыть продажи
              </div>
              <div
                className={`admin-section__header-close-button ${
                  isSectionOpen("openSales") ? "" : "rotated"
                }`}
                onClick={() => toggleSection("openSales")}
              ></div>
            </div>
          </header>
          <div
            className={`admin-section__body  ${
              isSectionOpen("openSales") ? "" : "admin-section__hidden"
            }`}
          >
            <div>Выберите зал для открытия/закрытия продаж:</div>
            <ul className="admin-section__hall-config">
              {halls.map((hall) => {
                if (halls.length === 0) return null;
                return (
                  <li
                    key={hall.id}
                    className={`admin-section__hall-item ${
                      selectedHallForOpen?.id === hall.id
                        ? "admin-section__hall-item-selected"
                        : ""
                    }`}
                    onClick={() => handleHallOpenClick(hall)}
                  >
                    {hall.hall_name}
                  </li>
                );
              })}
            </ul>
            {selectedHallForOpen && (
              <OpenSales
                selectedHallForOpen={selectedHallForOpen}
                onSave={handleSave}
              />
            )}
          </div>
        </section>
      </main>
      {isHallModalOpen && (
        <AddHallModal
          onClose={() => setIsHallModalOpen(false)}
          onHallAdded={handleHallAdded}
        />
      )}
      {isFilmModalOpen && (
        <AddFilmModal
          onClose={() => setIsFilmModalOpen(false)}
          onFilmAdded={handleFilmAdded}
        />
      )}
    </div>
  );
}

export default AdminPage;
