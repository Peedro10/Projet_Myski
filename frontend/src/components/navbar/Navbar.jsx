import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import Logo from '../../assets/Myski.png';
import "./navbar.scss";

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">
                    <img src={Logo} alt="Myski Logo" />
                </Link>
            </div>
            <ul className="nav-links">
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/pistes">Pistes</Link></li>
                <li><Link to="/remontees">Remontées</Link></li>
                <li><Link to="/commentaires_pistes">Commentaires Pistes</Link></li> 
                <li><Link to="/commentaires_remontees">Commentaires Remontées</Link></li>
                <li><Link to="/chats">Chats</Link></li> {/* Added link for Chats */}
                <li><Link to="/itineraires">Itinéraires</Link></li> {/* Added link for Itinéraires */}
                {currentUser ? (
                    <>
                        <li style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{ marginBottom: '4px' }}>{currentUser.username}</span>
                            <button onClick={logout} style={{ border: 'none', background: 'transparent', color: '#fff', cursor: 'pointer' }}>
                                Déconnexion
                            </button>
                        </li>
                    </>
                ) : (
                    <li><Link to="/login">Connexion</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
