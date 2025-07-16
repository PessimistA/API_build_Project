import React, { useState } from "react";
import "../css/register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form gönderildi:", formData);
    // Burada API'ye POST edebilirsin
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
