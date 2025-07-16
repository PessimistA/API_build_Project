import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

import "../css/main.css";

const Main = () => {
  const [temperatures, setTemperatures] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const navigate = useNavigate();

  const measureTemperature = () => {
    const temp = (20 + Math.random() * 10).toFixed(1);
    setTemperatures((prev) => [...prev, temp]);
  };

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const deleteTemperature = (index) => {
    setTemperatures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteUser = async () => {
    if (window.confirm("Kullanıcıyı silmek istediğine emin misin?")) {
      try {
        const res = await fetch("/api/deleteUser", { method: "DELETE" });
        if (res.ok) {
          alert("Kullanıcı başarıyla silindi.");
          navigate("/");
        } else {
          alert("Silme işlemi başarısız.");
        }
      } catch (error) {
        alert("Bir hata oluştu.");
      }
    }
  };

  const handleSearch = () => {
    const min = parseFloat(minTemp);
    const max = parseFloat(maxTemp);

    if (isNaN(min) || isNaN(max)) {
      alert("Lütfen geçerli min ve max sıcaklık girin.");
      return;
    }
    if (min > max) {
      alert("Minimum sıcaklık, maksimum sıcaklıktan küçük veya eşit olmalı.");
      return;
    }

    const filtered = temperatures.filter((t) => {
      const val = parseFloat(t);
      return val >= min && val <= max;
    });
    setTemperatures(filtered);
    setDrawerOpen(false);
  };
  const handleout =async ()=>{
    try {
        navigate("/");
    } catch (error) {
        alert("Bir hata oluştu.");
    }
  }

  // Ekranda gösterilecek sıcaklıklar (şu an sadece filtrelenmiş)
  const filteredTemps = temperatures;

  return (
    <div className="mainpage-container">
      {/* Üst Bar */}
      <div className="header">
        <h1>Sıcaklık Ölçer</h1>
        <button className="menu-button" onClick={toggleDrawer} aria-label="Menüyü aç">
          {drawerOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Drawer */}
      <div className={`drawer ${drawerOpen ? "open" : ""}`}>
        <div className="drawer-content">
          <div className="range-search">
            <label>
              Min Sıcaklık:
              <input
                type="number"
                value={minTemp}
                onChange={(e) => setMinTemp(e.target.value)}
                placeholder="Min"
              />
            </label>
            <label>
              Max Sıcaklık:
              <input
                type="number"
                value={maxTemp}
                onChange={(e) => setMaxTemp(e.target.value)}
                placeholder="Max"
              />
            </label>
            <button onClick={handleSearch}>Ara</button>
          </div>
        <button className="out-btn" onClick={handleout}>
            Çıkış Yap
          </button>
          <button className="delete-user-btn" onClick={handleDeleteUser}>
            Kullanıcıyı Sil
          </button>
        </div>
      </div>

      {/* İçerik */}
      <div className="content">
        <div className="left-panel">
          <button onClick={measureTemperature} className="measure-button">
            Sıcaklığı Ölç
          </button>
        </div>
        <div className="right-panel">
          {filteredTemps.length > 0 ? (
            <ul className="temperature-list">
              {filteredTemps.map((temp, index) => (
                <li key={index}>
                  {index + 1}. Ölçüm: <span>{temp}°C</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="temperature-display no-data">Sıcaklık ölçülmedi</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
