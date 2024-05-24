import React, { useEffect, useState } from 'react';
import './pistes.scss';
import canoImage from '../../assets/a4.jpg';
import noCanoImage from '../../assets/5.jpg';

const PisteItem = ({ piste, togglePisteStatus, handleDetailToggle, selectedDetail }) => {
  const getDescription = (color) => {
    switch (color) {
      case 'rouge':
        return {
          difficulty: 'Pro',
          description: 'La piste a été spécialement conçue pour répondre aux besoins et aux compétences des skieurs professionnels...',
          detailColor: 'red'
        };
      case 'bleu':
        return {
          difficulty: 'Amateur',
          description: 'La piste a été élaborée pour offrir une expérience enrichissante aux amateurs de ski...',
          detailColor: 'blue'
        };
      case 'vert':
        return {
          difficulty: 'Débutant',
          description: 'La piste a été spécifiquement aménagée pour accueillir les skieurs débutants...',
          detailColor: 'green'
        };
      default:
        return {
          difficulty: 'Non spécifiée',
          description: 'Aucune description disponible',
          detailColor: 'gray'
        };
    }
  };

  const pisteInfo = getDescription(piste.couleur);

  return (
    <div className="piste-item">
      <h3 className="piste-name">{piste.nom}</h3>
      <img src={piste.canon_a_neige === 'oui' ? canoImage : noCanoImage} alt={piste.canon_a_neige === 'oui' ? "Canon à neige" : "Pas de canon"} className="cannon-icon"/>
      <div className="controls">
        <label className="switch">
          <input type="checkbox" checked={piste.etat === 1} onChange={() => togglePisteStatus(piste.id_piste, piste.etat)} />
          <span className="slider round" style={{ backgroundColor: piste.etat === 1 ? 'green' : 'red' }}></span>
          <span className="etat-text">
              {piste.etat === 1 ? 'Ouvert' : 'Fermé'}
          </span>
        </label>
        <button className="details-link" onClick={() => handleDetailToggle(piste.id_piste)} style={{backgroundColor: pisteInfo.detailColor}}>
          Voir détails
        </button>
        {selectedDetail === piste.id_piste && (
          <div className="detail-modal">
            <strong>Difficulté:</strong> {pisteInfo.difficulty}<br />
            <strong>Description:</strong> {pisteInfo.description}
          </div>
        )}
      </div>
    </div>
  );
};

const Pistes = () => {
  const [pistes, setPistes] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPistes() {
      try {
        const response = await fetch('http://localhost:8800/api/pistes');
        const data = await response.json();
        setPistes(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch pistes:", error);
        setIsLoading(false);
      }
    }
    fetchPistes();
  }, []);

  const togglePisteStatus = async (id_piste, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    try {
      const response = await fetch(`http://localhost:8800/api/pistes/${id_piste}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ etat: newStatus }),
      });
      if (response.ok) {
        const updatedPistes = pistes.map(piste => piste.id_piste === id_piste ? { ...piste, etat: newStatus } : piste);
        setPistes(updatedPistes);
      } else {
        console.error("Failed to update piste status with response: ", response);
      }
    } catch (error) {
      console.error("Failed to update piste status:", error);
    }
  };

  const handleDetailToggle = (id) => {
    setSelectedDetail(selectedDetail === id ? null : id);
  };

  if (isLoading) {
    return <div className="loading">Chargement des pistes...</div>;
  }

  return (
    <div className="pistes">
      <h1 className="title">Pistes de Ski</h1>
      <div className="piste-list">
        {pistes.length > 0 ? pistes.map(piste => (
          <PisteItem key={piste.id_piste} piste={piste} togglePisteStatus={togglePisteStatus} handleDetailToggle={handleDetailToggle} selectedDetail={selectedDetail} />
        )) : (
          <p>Aucune piste disponible pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default Pistes;
