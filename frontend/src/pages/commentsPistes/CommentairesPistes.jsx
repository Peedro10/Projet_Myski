import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext.js';
import "./commentairesPistes.scss";

const CommentairesPistes = () => {
    const [pistes, setPistes] = useState([]);
    const [selectedPisteId, setSelectedPisteId] = useState('');
    const [commentaires, setCommentaires] = useState([]);
    const [nouveauCommentaire, setNouveauCommentaire] = useState('');
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        console.log("Current User:", currentUser);
        fetchPistes();
    }, []);

    const fetchPistes = async () => {
        try {
            const response = await axios.get('http://localhost:8800/api/pistes');
            setPistes(response.data);
            if (response.data.length > 0) {
                setSelectedPisteId(response.data[0].id_piste);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des pistes:', error);
        }
    };

    useEffect(() => {
        if (selectedPisteId) {
            fetchCommentaires(selectedPisteId);
        }
    }, [selectedPisteId]);

    const fetchCommentaires = async (pisteId) => {
        try {
            const response = await axios.get(`http://localhost:8800/api/commentaires/pistes/${pisteId}`);
            setCommentaires(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des commentaires:', error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!nouveauCommentaire.trim()) return;

        if (!currentUser || !currentUser.id) {
            console.error('User is not logged in or user id is missing');
            return;
        }

        try {
            const { data } = await axios.post(`http://localhost:8800/api/commentaires/pistes/${selectedPisteId}`, {
                contenu: nouveauCommentaire,
                id_user: currentUser.id,
                id_piste: selectedPisteId
            }, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
            fetchCommentaires(selectedPisteId); // Refresh comments after adding a new one
            setNouveauCommentaire('');
        } catch (error) {
            console.error('Erreur lors de l\'ajout du commentaire:', (error.response && error.response.data) || error.message);
        }
    };

    return (
        <div className="commentaires-pistes">
            <h3>Commentaires sur les pistes</h3>
            <select onChange={(e) => setSelectedPisteId(e.target.value)} value={selectedPisteId || ''}>
                <option value="">Select a Piste</option>
                {pistes.map(piste => (
                    <option key={piste.id_piste} value={piste.id_piste}>
                        {piste.nom}
                    </option>
                ))}
            </select>
            <form onSubmit={handleCommentSubmit}>
                <textarea
                    value={nouveauCommentaire}
                    onChange={(e) => setNouveauCommentaire(e.target.value)}
                    placeholder="Ajoutez un commentaire..."
                />
                <button type="submit">Commenter</button>
            </form>
            {commentaires.length > 0 ? (
                <div className="commentaires-liste">
                    <h4>Liste des commentaires</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Contenu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {commentaires.map((commentaire) => (
                                <tr key={commentaire.id_commentaire}>
                                    <td>{commentaire.username || 'Anonyme'}</td>
                                    <td>{commentaire.contenu}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Aucun commentaire pour cette piste.</p>
            )}
        </div>
    );
};

export default CommentairesPistes;
