import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/enterance.css";
const apiUrl = process.env.REACT_APP_API_URL;
const Enterance = () => {
const navigate = useNavigate();

  return (
    <div className="enterance-container">
      {/* Sol kısım: Butonlar */}
      <div className="enterance-left">
        <button
          onClick={() => navigate("/login")}
          className="enterance-button login"
        >
          Giriş Yap
        </button>
        <button
          onClick={() => navigate("/register")}
          className="enterance-button register"
        >
          Kayıt Ol
        </button>
      </div>

      {/* Sağ kısım: Başlık */}
      <div className="enterance-right">
        <h1 className="enterance-title">Hoş Geldiniz</h1>
      </div>
    </div>
  );

};

export default Enterance;
