import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './perfil.css';

const Perfil = () => {
    const [user, setUser] = useState(null);
    const [initials, setInitials] = useState('');
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get(`/users/${localStorage.getItem("userId")}`);
                setUser(response.data);
                setInitials(response.data.initials);
                setFormData({ name: response.data.name, email: response.data.email });
            } catch (error) {
                console.error("Erro ao carregar os dados do usuário:", error);
            }
        };
        fetchUserData();
    }, []);

    const handleEditToggle = () => {
        setEditing(!editing);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSaveChanges = async () => {
        try {
            const response = await api.put(`/users/${localStorage.getItem("userId")}`, formData);
            setUser(response.data);
            setEditing(false);
        } catch (error) {
            console.error("Erro ao atualizar as informações do usuário:", error);
        }
    };

    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/home');
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <button onClick={handleBackToHome} className="back-button">
                    ← Voltar para Home
                </button>
            </div>
            <div className="avatar">
                {user?.image ? (
                    <img src={user.image} alt="Avatar" />
                ) : (
                    <div className="initials">{initials}</div>
                )}
            </div>
            <h2>Informações Pessoais</h2>
            {editing ? (
                <div>
                    <input className='input-perfil'
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <input className='input-perfil'
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSaveChanges} className="save-button">Salvar</button>
                </div>
            ) : (
                <div>
                    <p><strong>Nome:</strong> {user?.name}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <button onClick={handleEditToggle} className="edit-button">Editar</button>
                </div>
            )}
        </div>
    );
};

export default Perfil;