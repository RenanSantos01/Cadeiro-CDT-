import { useState } from 'react'
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import criptoLogo from '../../assets/criptologo.PNG'
import AIChat from '../../components/AIChat';

function Home() {
    const navigate = useNavigate();

    const botãoLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.href = '/';
    };

    const handleCriptoClick = () => {
        navigate('/cripto');
    };

    const handleContatoClick = () => {
        navigate('/suporte');
    };

    const handleSobreClick = () => {
        navigate('/sobre');
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
                        <li><Link to="/sobre">Sobre</Link></li>
                        <li><Link to="/cripto">Criptomoeda</Link></li>
                    </ul>
                </nav>
                <div className="botoes-autenticacao">
                    <a href='/' onClick={botãoLogout} className="botao-logout">Sair</a>
                    <a href='/configuracoes' className="botao-conf">Conf ⚙️</a>
                </div>
            </header>

            <main>
                <section className="principal tema-escuro">
                    <div className="conteudo-principal">
                        <h1>Cardeiro: Investindo no<br />futuro da educação.</h1>
                        <p>Explore o futuro das finanças com soluções inovadoras, unindo perfeitamente as economias tradicionais
                            e digitais.</p>
                        <div className="contador-usuarios">
                            <span className="icone-globo">🌐</span>
                            <span>+... Usuários no Brasil todo.</span>
                        </div>
                        <button className="botao-acao" onClick={handleCriptoClick}>
                            Desbloqueie a liberdade financeira ➜
                        </button>
                    </div>
                </section>

                <section className="informacao">
                    <h4>QUALIFICAÇÃO PARA UM FUTURO MELHOR</h4>
                    <p>A Cardeiro é uma plataforma de educação ligada à criptomoeda CardeiroCoin, onde buscamos ampliar a visão
                        educacional.</p>
                    <p>O Cardeiro é uma plataforma inovadora que usa blockchain e contratos inteligentes para mostrar, na prática, como essas tecnologias podem transformar a educação, tornando-a mais transparente, segura e eficiente.</p>
                    <p>O CDT possibilita investimentos descentralizados, seguros e transparentes, utilizando a tecnologia blockchain. Você pode contribuir para o futuro da educação!</p>
                    <h2>Para mais informações</h2>
                    <div className="botoes-informacao">
                        <button className="botao-contato" onClick={handleContatoClick}>
                            Contate-nos
                        </button>
                    </div>
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
    );
}

export default Home;
