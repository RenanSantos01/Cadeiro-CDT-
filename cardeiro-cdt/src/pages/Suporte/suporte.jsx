import { useState } from 'react'
import './suportestyle.css'
import { Link } from 'react-router-dom'
import criptoLogo from '../../assets/criptologo.PNG'
import iaIcon from '../../assets/ia.png'
import AIChat from '../../components/AIChat';

function Suporte() {
    const botãoLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.href = '/';
    };

    return (
        <>
            <header className="tema-escuro">
                <div className="logotipo">
                    <img className="logotipo img" src={criptoLogo} alt="Cardeiro" />
                    <span>Cardeiro</span>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/suporte">Suporte</Link></li>
                        <li><Link to="/cripto">Criptomoeda</Link></li>
                    </ul>
                </nav>
                <div className="botoes-autenticacao">
                    <a href='/' onClick={botãoLogout} className="botao-logout">Sair</a>
                    <a href='/configuracoes' className="botao-conf">Conf ⚙️</a>
                </div>
            </header>

            <main className="suporte-page">
                <section className="formulario-suporte">
                    <h1>Suporte ao Cliente</h1>
                    <p>Preencha o formulário abaixo para receber ajuda da nossa equipe.</p>

                    <form id="suporteForm" className="form-container">

                        <input type="text" id="nomeCompleto" name="nomeCompleto" placeholder="Nome Completo *" required />
                        <input type="email" id="email" name="email" placeholder="E-mail *" required />
                        <input type="tel" id="telefone" name="telefone" placeholder="Telefone *" required />

                        <select id="tipoContato" name="tipoContato" required>
                            <option disabled selected>Como deseja ser contatado *</option>
                            <option value="">E-mail</option>
                            <option value="tecnico">Telefone</option>
                        </select>

                        <select id="tipoProblema" name="tipoProblema" required>
                            <option disabled selected>Tipo de Problema *</option>
                            <option value="tecnico">Problema Técnico</option>
                            <option value="financeiro">Questão Financeira</option>
                            <option value="conta">Problema com Conta</option>
                            <option value="curso">Dúvida sobre Cursos</option>
                            <option value="outro">Outro</option>
                        </select>

                        <textarea
                            id="descricaoProblema"
                            name="descricaoProblema"
                            rows="5"
                            placeholder="Descreva seu problema *"
                            required
                        ></textarea>

                        <button type="submit" className="botao-enviar">Enviar Solicitação</button>
                    </form>
                </section>
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

            <AIChat />
        </>
    )
}

export default Suporte