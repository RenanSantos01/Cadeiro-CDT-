import { useState } from 'react'
import './criptostyle.css'
import { Link } from 'react-router-dom'
import criptoLogo from '../../assets/criptologo.PNG'
import AIChat from '../../components/AIChat';

function Cripto() {
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
                        <li><Link to="/sobre">Sobre</Link></li>
                        <li><Link to="/cripto">Criptomoeda</Link></li>
                    </ul>
                </nav>
                <div className="botoes-autenticacao">
                    <a href='/' onClick={botãoLogout} className="botao-logout">Sair</a>
                    <a href='/configuracoes' className="botao-conf">Conf ⚙️</a>
                </div>
            </header>

            <main className="cripto-page">
                <section className="video-section tema-escuro">
                    <h1>Como comprar CDT</h1>
                    <div className="video-container">
                        <iframe 
                            width="560" 
                            height="315" 
                            src="https://www.youtube.com/embed/fmZhpnQBlh4?si=QK2HMGANLAr9MQ0u&amp;autoplay=1&amp;rel=0" 
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerpolicy="strict-origin-when-cross-origin" 
                            allowfullscreen
                        ></iframe>
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
    )
}

export default Cripto