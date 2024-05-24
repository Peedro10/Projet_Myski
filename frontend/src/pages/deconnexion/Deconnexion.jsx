import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const Deconnexion = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        logout().then(() => {
            // Redirection après la déconnexion
            navigate('/');
        }).catch((error) => {
            console.error("Erreur lors de la déconnexion:", error);
            // Gérer l'erreur de déconnexion ici, éventuellement afficher un message d'erreur
        });
    }, [logout, navigate]);

    return (
        <div>
            <p>Déconnexion en cours...</p>
        </div>
    );
};

export default Deconnexion;
