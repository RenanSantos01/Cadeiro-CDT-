import { useState, useEffect, useRef } from 'react';
import React from 'react';
import './loginstyle.css';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import api from '../../services/api.js';
import criptoLogo from '../../assets/criptologo.PNG';

function Login() {

  const inputEmail = useRef()
  const inputSenha = useRef()
  const [errorMessage, setErrorMessage] = useState('')

  //const [users, setUsers] = useState([]);
  //const [userEmail, setUserEmail] = useState([]);
  //const sleep = ms => new Promise(r => setTimeout(r, ms));

  let userEmail = [];


  /*async function getUsers() {
    const usersFromApi = await api.get("/users")

    setUsers(usersFromApi.data)
    //console.log(usersFromApi.data)
    console.log(users)
  }*/


  async function getUserEmail(email) {
    const userEmailFromApi = await api.get(`/users?email=${email}`)

    userEmail = userEmailFromApi.data;
    console.log(userEmailFromApi.data)
    console.log(userEmail)
    try {

      userEmail.map((user) => (

        console.log(user.id),
        localStorage.setItem("userId", user.id),
        console.log(localStorage.getItem("userId"))
      ))

      toDashboard()

    } catch (error) {
      console.log("Deu pal")
    }
  }


  function toDashboard() {
    window.location.href = '/';
  }

  async function fazerlogin(event) {
    event.preventDefault();

    try {
      const response = await api.post('/login', {
        email: inputEmail.current.value,
        password: inputSenha.current.value, // Corrigi o nome para 'password'
      });


      //const { token, userId } = response.data; // Certifique-se de que a API retorne o userId
      //localStorage.setItem('token', token);
      //const { userId } = response.data
      //localStorage.setItem('userId', users.id)
      //userId = users.id;
      //console.log(userId);

      // Armazene o userId


      try {
        getUserEmail(inputEmail.current.value);
      } catch (error) {
        console.log("Não rodou o getUser")
      }

      console.log(inputEmail.current.value)


      /*userEmail.map((user) => (
        //  userId = (user.id) 
        //console.log(user.id)
        localStorage.setItem("userId", user.id)
      ))*/
      //console.log(userId)

      //userId = userEmail.id;
      //console.log(userEmail);
      //alert(userId);

      //await sleep(5000)

      //window.location.href = '/dashboard'; // Redireciona para o dashboard após login bem-sucedido


    } catch (error) {
      setErrorMessage(error.response?.data?.msg || 'Login falhou. Verifique suas credenciais.');
    }
  }

  return (
    <div className="app-container">
      <header className="tema-escuro">
        <div className="logotipo">
          <img className="logotipo img" src={criptoLogo} alt="Cardeiro" />
          <span>Cardeiro</span>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/suporte">Suporte</Link></li>
            <li><Link to="/cripto">Criptomoeda</Link></li>
          </ul>
        </nav>
        <div className="botoes-autenticacao">
          <a href='/login' className="botao-entrar">Login</a>
          <a href='/cadastro' className="botao-cadastrar">Sign Up</a>
        </div>
      </header>

      <div className="container">

        <form>
          <h1>Login</h1>
          <input name="Email" type="email" placeholder="Email" ref={inputEmail} required />
          <input name="Senha" type="password" placeholder="Senha" ref={inputSenha} required />

          <div className='buttons'>
            <button type="submit" onClick={fazerlogin} className="botao-login">Entrar</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <p></p>

            <GoogleLogin
              onSuccess={credentialResponse => {
                const decoded = jwtDecode(credentialResponse?.credential);
                const { email, name } = decoded; // Extrai o email e o nome do token

                // Envia os dados ao backend para login ou cadastro
                api.post('/login/google', { email, name })
                  .then(response => {
                    const { token, userId } = response.data;
                    localStorage.setItem('token', token);
                    localStorage.setItem('userId', userId);
                    window.location.href = '/'; // Redireciona após login
                  })
                  .catch(error => {
                    setErrorMessage(error.response?.data?.message || 'Erro ao fazer login com Google');
                  });
              }}
              onError={() => {
                console.log('Login com Google falhou');
                setErrorMessage('Erro ao fazer login com Google');
              }}
            />
          </div>

          <div className="signup-link">
            <p>Não tem uma conta? <Link to='/cadastro'>Registre-se</Link></p>
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

export default Login;