import React, { useState, useEffect } from 'react';

export default function Poll({ specialties }) {
  const [selected, setSelected] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const savedVote = localStorage.getItem('votedSpecialty');
    if (savedVote) {
      setSubmitted(true);
      setSelected(savedVote);
    }
  }, []);

  const handleVote = () => {
    if (!selected) return;

    const username = localStorage.getItem('username') || 'Анонім';

    fetch('http://localhost:3001/votes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        specialty: selected
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Помилка голосування');
        localStorage.setItem('votedSpecialty', selected);
        setSubmitted(true);
      })
      .catch(err => {
        alert('Сталася помилка при голосуванні.');
        console.error(err);
      });
  };

  const handleReset = () => {
    localStorage.removeItem('votedSpecialty');
    setSubmitted(false);
    setSelected('');
  };

  if (submitted) {
    return (
      <div className="alert alert-success mt-4">
        <p>
          Дякуємо за голос! Ваша улюблена спеціальність:{' '}
          <strong>{selected}</strong>
        </p>
        <button className="btn btn-outline-secondary btn-sm" onClick={handleReset}>
          Переголосувати
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h5>🔍 Яка спеціальність вам найбільше цікава?</h5>
      <form>
        {specialties.map(spec => (
          <div className="form-check" key={spec.id}>
            <input
              className="form-check-input"
              type="radio"
              name="specialtyVote"
              value={spec.name}
              id={`vote-${spec.id}`}
              checked={selected === spec.name}
              onChange={(e) => setSelected(e.target.value)}
            />
            <label className="form-check-label" htmlFor={`vote-${spec.id}`}>
              {spec.name}
            </label>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={handleVote}
          disabled={!selected}
        >
          Проголосувати
        </button>
      </form>
    </div>
  );
}
