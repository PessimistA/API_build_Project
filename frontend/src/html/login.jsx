import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
const apiUrl = process.env.REACT_APP_API_URL;
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Lütfen email ve şifre giriniz.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        console.log("Token alındı:", data.token);

        navigate("/login/main");
      } else {
        alert("Giriş başarısız: " + data.error);
      }
    } catch (err) {
      console.error("Sunucu hatası:", err);
      alert("Sunucu hatası oluştu.");
    }
  };


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Giriş Yap</h2>

        <input
          type="email"
          name="email"
          placeholder="E-posta"
          value={formData.email}
          onChange={handleChange}
          /*required*/
        />

        <input
          type="password"
          name="password"
          placeholder="Şifre"
          value={formData.password}
          onChange={handleChange}
          /*required*/
        />

        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
};

export default Login;
