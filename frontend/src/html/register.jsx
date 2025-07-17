import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // bunu ekle
import "../css/register.css";
const apiUrl = process.env.REACT_APP_API_URL;
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // navigate tanımla

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Kayıt başarılı: " + data.message);
        setFormData({ name: "", email: "", password: "" });
        navigate("/login");  // Kayıt başarılıysa login sayfasına yönlendir
      } else {
        alert("Kayıt hatası: " + data.error);
      }
    } catch (error) {
      alert("Sunucu hatası: " + error.message);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Kayıt Ol</h2>

        <input
          type="text"
          name="name"
          placeholder="İsim"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="E-posta"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Şifre"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
  );
};

export default Register;
