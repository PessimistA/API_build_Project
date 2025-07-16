import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email && formData.password) {
      console.log("Giriş formu gönderildi:", formData);
      // Burada API doğrulama yapılabilir
      navigate("/main");  // Ana sayfaya yönlendirme
    } else {
      alert("Lütfen email ve şifre giriniz.");
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
