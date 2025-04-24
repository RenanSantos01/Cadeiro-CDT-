import { useEffect, useState, useRef } from 'react';
import React from 'react';
import './cadastrostyle.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
// import api from '../../services/api.js';

function Cadastro() {

  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputEmail = useRef()
  const inputSenha = useRef()
  

  // async function getUsers() {
  //   const usersFromApi = await api.get('/users')

  //   setUsers(usersFromApi.data)
  //   console.log(users)
  // }

  // async function createUsers() {
  //   await api.post('/users', {
  //     email: inputEmail.current.value,
  //     name: inputName.current.value,
  //     password: inputSenha.current.value
  //   })
  //   window.location.href = "./Login";
  // }

  // ...

  // useEffect(() => {
  //   first

  //   return () => {
  //     second
  //   }

  // }, [third])

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
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className='row mt-3'>
          <h1>BitWave</h1>
        </div>
      </nav>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className='row mt-3'>
            <h1>Cadastro de Usuário</h1>
          </div>
          <input name="Nome" type="text" placeholder="Nome" ref={inputName} required />
          <input name="Email" type="email" placeholder="Email" ref={inputEmail} required />
          <input name="Senha" type="password" placeholder="Senha" ref={inputSenha} required />

          <div className="terms">
            <div className='row mt-3'>
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
          </div>
          <button className='button-cadastro' type="submit" /*</form>onClick={createUsers} */ >Cadastrar</button>

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

        </form>
      </div>
      <footer className="footer">
        <div className='row mt-3'>
          <p>© 2024 BitWave. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default Cadastro;