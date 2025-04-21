import { useState } from 'react'
import './cursostyle.css'
import { Link } from 'react-router-dom'
import criptoLogo from '../../assets/criptologo.PNG'
import iaIcon from '../../assets/ia.png'
import blockchainImg from '../../assets/blockchain.jpg'
import criptomoedaImg from '../../assets/criptomoeda.jpg'
import investimentoBasicoImg from '../../assets/investimentobasico.jpg'
import defiImg from '../../assets/defi.jpg'
import nftImg from '../../assets/nft.webp'

function Cursos() {
  const [activeTab, setActiveTab] = useState('disponiveis')

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <>
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
                <li><Link to="/cursos">Cursos</Link></li>
            </ul>
        </nav>
        <div className="botoes-autenticacao">
            <button className="botao-entrar">Login</button>
            <button className="botao-cadastrar">Sign Up</button>
        </div>
      </header>

      <main className="cursos-page">
        <section className="cursos-header">
            <h1>Meus Cursos</h1>
            <div className="cursos-tabs">
                <button 
                    className={`tab-button ${activeTab === 'disponiveis' ? 'active' : ''}`}
                    onClick={() => handleTabChange('disponiveis')}
                >
                    Disponíveis
                </button>
                <button 
                    className={`tab-button ${activeTab === 'em-curso' ? 'active' : ''}`}
                    onClick={() => handleTabChange('em-curso')}
                >
                    Em Curso
                </button>
                <button 
                    className={`tab-button ${activeTab === 'concluidos' ? 'active' : ''}`}
                    onClick={() => handleTabChange('concluidos')}
                >
                    Concluídos
                </button>
            </div>
        </section>

        <section 
            id="disponiveis" 
            className={`cursos-section ${activeTab === 'disponiveis' ? 'active' : ''}`}
        >
            <div className="cursos-grid">
                <div className="curso-card">
                    <img src={blockchainImg} alt="Blockchain" />
                    <h3>Fundamentos de Blockchain</h3>
                    <p>Aprenda os conceitos básicos de blockchain e sua aplicação.</p>
                    <span className="duracao">40 horas</span>
                    <button className="botao-iniciar">Começar Curso</button>
                </div>
                <div className="curso-card">
                    <img src={criptomoedaImg} alt="Criptomoedas" />
                    <h3>Trading de Criptomoedas</h3>
                    <p>Estratégias avançadas para trading de criptomoedas.</p>
                    <span className="duracao">30 horas</span>
                    <button className="botao-iniciar">Começar Curso</button>
                </div>
                <div className="curso-card">
                    <img src={investimentoBasicoImg} alt="Investimentos" />
                    <h3>Investimentos Básicos</h3>
                    <p>Introdução ao mundo dos investimentos digitais.</p>
                    <span className="duracao">25 horas</span>
                    <button className="botao-iniciar">Começar Curso</button>
                </div>
            </div>
        </section>

        <section 
            id="em-curso" 
            className={`cursos-section ${activeTab === 'em-curso' ? 'active' : ''}`}
        >
            <div className="cursos-grid">
                <div className="curso-card em-progresso">
                    <img src={defiImg} alt="DeFi" />
                    <h3>DeFi: Finanças Descentralizadas</h3>
                    <p>Explore o mundo das finanças descentralizadas.</p>
                    <div className="progresso">
                        <div className="barra-progresso">
                            <div className="progresso-atual" style={{ width: '45%' }}></div>
                        </div>
                        <span>45% Completo</span>
                    </div>
                    <button className="botao-continuar">Continuar</button>
                </div>
            </div>
        </section>

        <section 
            id="concluidos" 
            className={`cursos-section ${activeTab === 'concluidos' ? 'active' : ''}`}
        >
            <div className="cursos-grid">
                <div className="curso-card concluido">
                    <img src={nftImg} alt="NFTs" />
                    <h3>NFTs e Tokens Digitais</h3>
                    <p>Fundamentos de NFTs e tokens não fungíveis.</p>
                    <span className="status-concluido">Concluído</span>
                    <button className="botao-certificado">Ver Certificado</button>
                </div>
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

      <div className="suporte-chat">
        <button className="botao-suporte">
            <img src={iaIcon} alt="Suporte" />
            <span>SUPORTE I.A</span>
        </button>
      </div>
    </>
  )
}

export default Cursos