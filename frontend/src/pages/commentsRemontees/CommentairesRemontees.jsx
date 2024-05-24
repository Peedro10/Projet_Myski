import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext.js';
import "./commentairesRemontees.scss";

const CommentairesRemontees = () => {
    const [remontees, setRemontees] = useState([]);
    const [selectedRemonteeId, setSelectedRemonteeId] = useState('');
    const [commentaires, setCommentaires] = useState([]);
    const [nouveauCommentaire, setNouveauCommentaire] = useState('');
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        fetchRemontees();
    }, []);

    const fetchRemontees = async () => {
        try {
            const response = await axios.get('http://localhost:8800/api/remontees');
            setRemontees(response.data);
            if (response.data.length > 0) {
                setSelectedRemonteeId(response.data[0].id_remonte);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des remontées:', error);
        }
    };

    useEffect(() => {
        if (selectedRemonteeId) {
            fetchCommentaires(selectedRemonteeId);
        }
    }, [selectedRemonteeId]);

    const fetchCommentaires = async (remonteeId) => {
        try {
            const response = await axios.get(`http://localhost:8800/api/commentaires/remontees/${remonteeId}`);
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
            const { data } = await axios.post(`http://localhost:8800/api/commentaires/remontees/${selectedRemonteeId}`, {
                contenu: nouveauCommentaire,
                id_user: currentUser.id,
                id_remonte: selectedRemonteeId
            }, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
            setCommentaires([...commentaires, data]);
            setNouveauCommentaire('');
        } catch (error) {
            console.error('Erreur lors de l\'ajout du commentaire:', (error.response && error.response.data) || error.message);
        }
    };

    return (
        <div className="commentaires-remontees">
            <h3>Commentaires sur les remontées mécaniques</h3>
            <select onChange={(e) => setSelectedRemonteeId(e.target.value)} value={selectedRemonteeId || ''}>
                <option value="">Select a Remontee</option>
                {remontees.map(remontee => (
                    <option key={remontee.id_remonte} value={remontee.id_remonte}>
                        {remontee.nom}
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
            <div className="commentaires-liste">
                <h4>Liste des commentaires</h4>
                {commentaires.length > 0 ? (
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
                ) : (
                    <p>Aucun commentaire pour cette remontée.</p>
                )}
            </div>
        </div>
    );
};

export default CommentairesRemontees;
