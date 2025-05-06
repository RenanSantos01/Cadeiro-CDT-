import { useEffect, useState, useRef } from 'react';
import React from 'react';
import './cadastrostyle.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { Link } from 'react-router-dom';
import criptoLogo from '../../assets/criptologo.PNG';
import api from '../../services/api.js';

function Cadastro() {

  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputEmail = useRef()
  const inputSenha = useRef()
  

  async function getUsers() {
    const usersFromApi = await api.get('/users')

    setUsers(usersFromApi.data)
    console.log(users)
  }

  async function createUsers() {
    await api.post('/users', {
      email: inputEmail.current.value,
      name: inputName.current.value,
      password: inputSenha.current.value
    })

  }

  useEffect(() => {
    getUsers()
  }, [])

  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleCheckboxChange = (e) => {
    setAcceptTerms(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      alert('Por favor, aceite os termos antes de se cadastrar.');
      return;
    }

    console.log('Cadastro realizado com sucesso!');
    window.location.href = "./"
  };

  return (
    <div className="app-container">
      <header className="tema-escuro">
        <div className="logotipo">
          <img className="logotipo img" src={criptoLogo} alt="Cardeiro" />
          <span>Cardeiro</span>
        </div>

        <div className="botoes-autenticacao">
          <a href='/' className="botao-entrar">Login</a>
          <a href='/cadastro' className="botao-cadastrar">Sign Up</a>
        </div>
      </header>

      <div className="container-cadastro">
        <form onSubmit={handleSubmit}>
          <div className='row mt-3'>
            <h1>Cadastro de Usuário</h1>
          </div>
          <input name="Nome" type="text" placeholder="Nome" ref={inputName} required />
          <input name="Email" type="email" placeholder="Email" ref={inputEmail} required />
          <input name="Senha" type="password" placeholder="Senha" ref={inputSenha} required />

          <div className="terms">
              <div className='col-2 mt-4'>
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={acceptTerms}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className='col-9'>
                <label htmlFor="terms">
                  Ao se inscrever, você concorda com nossos <a href="#">Termos de Uso</a> e com a <a href="#">Política de Privacidade</a>.
                </label>
            </div>
          </div>

          <div class="buttons">
          <button className='button-cadastro' type="submit" onClick={createUsers} >Cadastrar</button>

          <p></p>

          <GoogleLogin
            onSuccess={credentialResponse => {
              const decoded = jwtDecode(credentialResponse?.credential);
              const { email, name } = decoded; // Extraindo email e nome

              // Agora, envia essas informações para o backend
              api.post('/users', {
                email: email,
                name: name,
                password: ''
              })
                .then(response => {
                  console.log('Usuário cadastrado com Google:', response.data);
                  window.location.href = "./Login";
                })
                .catch(error => {
                  console.error('Erro ao cadastrar usuário com Google:', error);
                });
            }}
            onError={() => {
              console.log('Login com Google falhou');
            }}
          />
          </div>

        </form>
        
      </div>
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
    </div>
  );
}

export default Cadastro;