import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./itineraires.scss";

const Itineraires = () => {
    const [pistes, setPistes] = useState([]);
    const [startPiste, setStartPiste] = useState('');
    const [endPiste, setEndPiste] = useState('');
    const [itineraires, setItineraires] = useState([]);

    useEffect(() => {
        fetchPistes();
    }, []);

    const fetchPistes = async () => {
        try {
            const response = await axios.get('http://localhost:8800/api/pistes');
            setPistes(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des pistes:', error);
        }
    };

    const handleItineraireSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`http://localhost:8800/api/itineraires`, {
                params: { start: startPiste, end: endPiste }
            });
            setItineraires(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des itinéraires:', error);
        }
    };

    return (
        <div className="itineraires">
            <h3>Proposer un Itinéraire</h3>
            <form onSubmit={handleItineraireSubmit}>
                <select onChange={(e) => setStartPiste(e.target.value)} value={startPiste}>
                    <option value="">Choisir une piste de départ</option>
                    {pistes.map(piste => (
                        <option key={piste.id_piste} value={piste.id_piste}>
                            {piste.nom}
                        </option>
                    ))}
                </select>
                <select onChange={(e) => setEndPiste(e.target.value)} value={endPiste}>
                    <option value="">Choisir une piste de destination</option>
                    {pistes.map(piste => (
                        <option key={piste.id_piste} value={piste.id_piste}>
                            {piste.nom}
                        </option>
                    ))}
                </select>
                <button type="submit">Proposer Itinéraire</button>
            </form>
            <div className="itineraires-liste">
                <h4>Liste des Itinéraires</h4>
                {itineraires.length > 0 ? (
                    <ul>
                        {itineraires.map((itineraire, index) => (
                            <li key={index}>
                                <strong>Itinéraire {index + 1}:</strong> {itineraire.description}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucun itinéraire proposé pour le moment.</p>
                )}
            </div>
        </div>
    );
};

export default Itineraires;
