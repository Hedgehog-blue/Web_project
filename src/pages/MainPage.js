import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

import SpecialtyCard from '../components/SpecialtyCard';
import SpecialtyModal from '../components/SpecialtyModal';
import Poll from '../components/Poll';

export default function MainPage() {
  const [specialties, setSpecialties] = useState([]);
  const [username, setUsername] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [recentlyUpdatedIds, setRecentlyUpdatedIds] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('username');
    if (!name) navigate('/');
    else setUsername(name);

    const fetchData = () => {
      setIsLoading(true);
      fetch('http://localhost:3001/specialties')
        .then(res => res.json())
        .then(data => {
          setSpecialties(data);
          setLastUpdated(new Date().toLocaleTimeString());
          setRecentlyUpdatedIds(data.map(item => item.id));
          setTimeout(() => setRecentlyUpdatedIds([]), 2000);
        })
        .catch(err => console.error('Fetch error:', err))
        .finally(() => setIsLoading(false));
    };

    fetchData(); // первинний виклик
    const intervalId = setInterval(fetchData, 15000); // оновлення кожні 15 сек
    return () => clearInterval(intervalId);
  }, []);

  const handleOpenModal = (specialty) => {
    setSelectedSpecialty(specialty);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSpecialty(null);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Вітаю, {username}!</h2>
        {isLoading && (
          <Spinner animation="border" size="sm" role="status" className="ms-2">
            <span className="visually-hidden">Оновлення...</span>
          </Spinner>
        )}
      </div>

      <h5 className="text-muted">
        Спеціальності факультету інформатики
        {lastUpdated && (
          <small className="ms-2">(оновлено о {lastUpdated})</small>
        )}
      </h5>

      <ul className="list-group">
        {specialties.map((spec) => (
          <SpecialtyCard
            key={spec.id}
            specialty={spec}
            onClick={handleOpenModal}
            flash={recentlyUpdatedIds.includes(spec.id)}
          />
        ))}
      </ul>

      <SpecialtyModal
        show={showModal}
        onHide={handleCloseModal}
        specialty={selectedSpecialty}
      />

      <Poll specialties={specialties} />
    </div>
  );
}
