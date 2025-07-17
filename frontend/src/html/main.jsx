import React, { useState, useEffect } from "react"; // useEffect eklendi
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid"; 
import "../css/main.css";
const apiUrl = process.env.REACT_APP_API_URL;

function getTokenPayload(token) {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

const Main = () => {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const navigate = useNavigate();

  // --- BURADA TOKEN SÜRESİ KONTROLÜ ---
const [allTemperatures, setAllTemperatures] = useState([]);
const [temperatures, setTemperatures] = useState([]);

useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  const payload = getTokenPayload(token);

  if (!payload || !payload.exp) {
    localStorage.removeItem("token");
    navigate("/login");
    return;
  }

  const now = Date.now();
  const expiry = payload.exp * 1000;
  const timeout = expiry - now;

  if (timeout <= 0) {
    localStorage.removeItem("token");
    navigate("/login");
    return;
  }

  // Oturum süresi dolunca çıkış yaptır
  const timer = setTimeout(() => {
    alert("Oturum süreniz doldu. Lütfen tekrar giriş yapınız.");
    localStorage.removeItem("token");
    navigate("/");
  }, timeout);

  // Token geçerliyse verileri çek
  fetch(`${apiUrl}/sensor`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Veri çekilemedi");
      return res.json();
    })
    .then((data) => {
      setAllTemperatures(data);
      setTemperatures(data);
    })
    .catch((err) => {
      alert("Veriler çekilemedi.");
      console.error(err);
    });

  return () => clearTimeout(timer); // Temizleme
}, [navigate]);


  // --- TOKEN KONTROL BİTTİ ---

  const measureTemperature = async () => {
    const temp = (20 + Math.random() * 10).toFixed(1);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${apiUrl}/sensor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "Idempotency-Key": uuidv4(),  // Her isteğe yeni benzersiz key
        },
        body: JSON.stringify({ temperature: temp }),
      });

      if (res.ok) {
          const sensorData = await res.json();  // backend'den { id, temperature } bekliyoruz
          console.log("Backend'den dönen veri:", sensorData); 
          setTemperatures(prev => [...prev, { _id: sensorData.id, temperature: temp }]);

      } else {
        alert("Sıcaklık kaydı başarısız.");
      }
    } catch (error) {
      alert("Sunucu hatası oluştu.");
    }
  };
  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };


  const handleDeleteUser = async () => {
    if (window.confirm("Hesabını silmek istediğine emin misin?")) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${apiUrl}/auth/delete`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (res.ok) {
          alert("Hesap başarıyla silindi.");
          localStorage.removeItem("token");
          navigate("/");
        } else {
          const errorData = await res.json();
          alert("Silme başarısız: " + errorData.error);
        }
      } catch (err) {
        console.error(err);
        alert("Bir hata oluştu.");
      }
    }
  };



  const handleSearch = () => {
    let min = parseFloat(minTemp);
    let max = parseFloat(maxTemp);

    if (isNaN(min)) min = 0;
    if (isNaN(max)) max = 100;

    if (min > max) {
      alert("Minimum sıcaklık, maksimum sıcaklıktan küçük veya eşit olmalı.");
      return;
    }

    const filtered = allTemperatures.filter(({ temperature }) => {
      const val = parseFloat(temperature);
      return val >= min && val <= max;
    });
    setTemperatures(filtered);
    setDrawerOpen(false);
  };
  const handleout = async () => {
    try {
      localStorage.removeItem("token"); // Çıkışta token temizle
      navigate("/");
    } catch (error) {
      alert("Bir hata oluştu.");
    }
  };

const deleteTemperatureAndBackend = async (sensorId, index) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${apiUrl}/sensor/${sensorId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    console.log("Delete response status:", res.status);

    if (res.ok) {
      setTemperatures(prevTemps => prevTemps.filter((_, i) => i !== index));
    } else {
      const errorData = await res.json();
      alert("Silme işlemi başarısız: " + errorData.message || "Bilinmeyen hata");
    }
  } catch (error) {
    console.error("Sunucu hatası:", error);
    alert("Sunucu hatası oluştu.");
  }
};
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
              {temperatures.map((temp, index) => (
                <li key={temp._id}>
                  {index + 1}. Ölçüm: <span>{temp.temperature}°C</span>
                    <button onClick={() => deleteTemperatureAndBackend(temp._id, index)} className="delete-temp-btn">
                      Sil
                    </button>
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
