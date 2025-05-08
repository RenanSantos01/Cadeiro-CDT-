import React, { useState, useEffect } from 'react';
import "../Configuracoes/configuracoesstyle.css";
import Perfil from '../../components/perfil/perfil';

const Configuracoes = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const apiUrl = `http://localhost:8083/users/${userId}`;

  useEffect(() => {
    const fetchUserData = async () => {
      console.log('UserId:', userId);
      console.log('Token:', token);
      
      if (!userId) {
        setError('Usuário não encontrado. Faça login novamente.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error(`Erro na resposta da rede: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        if (data.initials) {
          console.log('Iniciais do usuário:', data.initials);
        }
        setUser(data);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error.message);
        setError(`Erro ao carregar os dados do usuário: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [apiUrl, userId, token]);

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword) {
      setPasswordError('Preencha todos os campos de senha.');
      return;
    }

    if (oldPassword !== user?.password) {
      setPasswordError('Senha antiga incorreta.');
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ password: newPassword })
      });

      if (response.ok) {
        setOldPassword('');
        setNewPassword('');
        setPasswordError('');
        alert('Senha alterada com sucesso!');
      } else {
        setPasswordError('Erro ao atualizar a senha.');
      }
    } catch (error) {
      console.error('Erro ao atualizar a senha:', error);
      setPasswordError('Erro ao atualizar a senha. Tente novamente.');
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
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
  );
};

export default Configuracoes;