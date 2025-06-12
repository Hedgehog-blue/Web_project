import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validate = (name) => /^[A-Za-zА-Яа-яІіЇїЄєҐґ]+$/.test(name);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate(name)) {
      setError("Ім’я має містити лише літери (без цифр та символів)");
      return;
    }
    localStorage.setItem('username', name);
    navigate('/main');
  };

  return (
    <div className="container mt-5">
      <h2>Авторизація</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Введіть ім’я"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && <div className="text-danger mb-2">{error}</div>}
        <button className="btn btn-primary" type="submit">Увійти</button>
      </form>
    </div>
  );
}
