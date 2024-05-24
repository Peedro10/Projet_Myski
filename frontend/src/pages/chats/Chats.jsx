import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext.js';
import "./chats.scss";

const Chats = () => {
    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const { currentUser } = useContext(AuthContext);
    let mediaRecorder;
    let audioChunks = [];

    useEffect(() => {
        fetchChats();
    }, []);

    const fetchChats = async () => {
        try {
            const response = await axios.get('http://localhost:8800/api/chats');
            setChats(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des messages:', error);
        }
    };

    const handleChatSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim() && !audioBlob) return;

        if (!currentUser || !currentUser.id) {
            console.error('User is not logged in or user id is missing');
            return;
        }

        const formData = new FormData();
        formData.append('id_user', currentUser.id);
        formData.append('message', message);
        if (audioBlob) {
            formData.append('audio', audioBlob, 'audioMessage.webm');
        }

        try {
            const { data } = await axios.post('http://localhost:8800/api/chats', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setChats([...chats, data]);
            setMessage('');
            setAudioBlob(null);
        } catch (error) {
            console.error('Erreur lors de l\'ajout du message:', (error.response && error.response.data) || error.message);
        }
    };

    const startRecording = () => {
        setIsRecording(true);
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                mediaRecorder.ondataavailable = event => {
                    audioChunks.push(event.data);
                };
                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                    setAudioBlob(audioBlob);
                    audioChunks = [];
                };
            })
            .catch(err => console.error('Error accessing audio media:', err));
    };

    const stopRecording = () => {
        setIsRecording(false);
        mediaRecorder.stop();
    };

    return (
        <div className="chats-container">
            <div className="chats">
                <div className="header">
                    <h3>Chat Interne</h3>
                </div>
                <div className="chat-box">
                    <div className="chats-liste">
                        {chats.length > 0 ? (
                            chats.map((chat) => (
                                <div key={chat.id_chat} className={`chat-message ${chat.id_user === currentUser.id ? 'own' : ''}`}>
                                    <div className="message-info">
                                        <span className="username">{chat.username || 'Anonyme'}</span>
                                        <span className="timestamp">{new Date(chat.timestamp).toLocaleString()}</span>
                                    </div>
                                    <div className="message-content">
                                        {chat.message}
                                        {chat.audio && (
                                            <audio controls>
                                                <source src={`http://localhost:8800/uploads/${chat.audio}`} type="audio/webm" />
                                            </audio>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Aucun message pour le moment.</p>
                        )}
                    </div>
                    <form onSubmit={handleChatSubmit} className="chat-input">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Ajoutez un message..."
                        />
                        <button type="submit">Envoyer</button>
                        <button type="button" onMouseDown={startRecording} onMouseUp={stopRecording}>
                            {isRecording ? 'Recording...' : 'Record'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chats;
