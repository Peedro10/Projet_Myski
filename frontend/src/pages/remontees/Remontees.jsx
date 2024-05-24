import React, { useEffect, useState } from 'react';
import './remontees.scss';

const Remontees = () => {
    const [remontees, setRemontees] = useState([]);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchRemontees();
    }, []);

    const fetchRemontees = async () => {
        try {
            const response = await fetch('http://localhost:8800/api/remontees');
            const data = await response.json();
            setRemontees(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Failed to fetch remontees:", error);
            setIsLoading(false);
        }
    };

    const toggleRemonteeStatus = async (id, currentState) => {
        const newState = currentState === 1 ? 0 : 1;
        try {
            const response = await fetch(`http://localhost:8800/api/remontees/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ etat: newState }),
            });
            if (response.ok) {
                fetchRemontees();
            }
        } catch (error) {
            console.error("Failed to update remontee status:", error);
        }
    };

    const handleDetailToggle = (id) => {
        setSelectedDetail(selectedDetail === id ? null : id);
    };

    const getDetails = (difficulte) => {
        
    };

    if (isLoading) {
        return <div className="loading">Chargement des remontées...</div>;
    }

    return (
        <div className="remontees">
            <h1>Remontées Mécaniques</h1>
            <ul>
                {remontees.map(remontee => (
                    <li key={remontee.id_remonte}>
                        <div className="remontee-item">
                            <strong>{remontee.nom}</strong> - {remontee.etat === 1 ? 'Ouverte' : 'Fermée'}
                            <div className="controls">
                                <label className="switch">
                                    <input type="checkbox" checked={remontee.etat === 1} onChange={() => toggleRemonteeStatus(remontee.id_remonte, remontee.etat)} />
                                    <span className="slider"></span>
                                </label>
                                <button className="details-link" onClick={() => handleDetailToggle(remontee.id_remonte)}>
                                Pistes desservies
                                </button>
                                {selectedDetail === remontee.id_remonte && (
                                    <div className="detail-modal">
                                        <p>{getDetails(remontee.difficulte)}</p>
                                        <h3>Pistes desservies:</h3>
                                        {remontee.pistes && remontee.pistes.length > 0 ? (
                                            <ul>
                                                {remontee.pistes.map(piste => (
                                                    <li key={piste.id_piste}>{piste.nom}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>Aucune piste desservie.</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Remontees;

