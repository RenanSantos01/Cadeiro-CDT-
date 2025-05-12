import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Configuracoes/configuracoesstyle.css";
import Perfil from '../../components/perfil/perfil';
import api from '../../services/api';
import criptoLogo from '../../assets/criptologo.PNG';

const Configuracoes = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  // const apiUrl = `http://localhost:3001/users/${userId}`;

  useEffect(() => {
    const fetchUserData = async () => {
      // console.log('UserId:', userId);
      // console.log('Token:', token);
      
      if (!userId) {
        setError('Usuário não encontrado. Faça login novamente.');
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/users/${userId}`, {
          headers: { 
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.initials) {
          console.log('Iniciais do usuário:', response.data.initials);
        }
        setUser(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error.message);
        setError(`Erro ao carregar os dados do usuário: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, token]);

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword) {
      setPasswordError('Preencha todos os campos de senha.');
      return;
    }

    try {
      const response = await api.put(`/users/${userId}`, 
        { 
          oldPassword: oldPassword,
          password: newPassword 
        },
        { 
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        setOldPassword('');
        setNewPassword('');
        setPasswordError('');
        alert('Senha alterada com sucesso!');
      } else {
        setPasswordError('Erro ao atualizar a senha.');
      }
    } catch (error) {
      console.error('Erro ao atualizar a senha:', error);
      if (error.response?.status === 401) {
        setPasswordError('Senha atual incorreta.');
      } else {
        setPasswordError('Erro ao atualizar a senha. Tente novamente.');
      }
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;



  return (
    <>
      <header className="tema-escuro">
        <div className="logotipo">
          <img className="logotipo img" src={criptoLogo} alt="Cardeiro" />
          <span>Cardeiro</span>
        </div>

      </header>

      <main className="configuracoes-container">
        <div className="configuracoes">
          <h1>Configurações da Conta</h1>

          <Perfil />

          <section className="config-section">
            <h2>Alterar Senha</h2>
            <input
              type="password"
              placeholder="Senha Atual"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Nova Senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handlePasswordChange} className="edit-button">Salvar Nova Senha</button>
            {passwordError && <p className="error-message">{passwordError}</p>}
          </section>

          <section className="config-section">
            <h2>Configurações</h2>
            <p>Novas funcionalidades em breve.</p>
          </section>
        </div>
      </main>

      <footer className="tema-escuro">
        <div className="conteudo-rodape">
          <p className="direitos-autorais">© 2023 All Rights Reserved</p>
          <div className="links-rodape">
            <a href="#terms">Terms</a>
            <a href="#privacy">Privacy</a>
            <a href="#cookies">Cookies</a>
          </div>
          <div className="icones-sociais">
            <a href="#" className="icone-social">f</a>
            <a href="#" className="icone-social">t</a>
            <a href="#" className="icone-social">in</a>
            <a href="#" className="icone-social">ig</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Configuracoes;