import { useState, useEffect } from 'react'
import './style.css'
import { Link } from 'react-router-dom';
      // Primeiro, importe as imagens no topo do arquivo
      import criptoLogo from '../../assets/criptologo.PNG'
      import imgInv1 from '../../assets/imginvestimento1.jpeg'
      import imgCurso1 from '../../assets/imgcursoinv1.jpeg'
      import imgInv2 from '../../assets/imginvestimento2.jpeg'
      import imgCurso2 from '../../assets/imgcursoinv2.jpeg'
      import imgInv3 from '../../assets/imginvestimento3.jpeg'
      import iaIcon from '../../assets/ia.png'

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            if (nextIndex >= 5) { // Number of original cards
                setTimeout(() => {
                    // Reset to first card without transition
                    document.querySelector('.carrossel').style.transition = 'none';
                    setCurrentIndex(0);
                    setTimeout(() => {
                        document.querySelector('.carrossel').style.transition = 'transform 0.8s ease-in-out';
                    }, 50);
                }, 800); // Wait for transition to complete
                return nextIndex;
            }
            return nextIndex;
        });
    }, 3000);

    return () => clearInterval(interval);
}, []);

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
            <a href='/cadastro' className="botao-entrar">Login</a>
            <a className="botao-cadastrar">Sign Up</a>
        </div>
      </header>

      <main>
        <section className="principal tema-escuro">
            <div className="conteudo-principal">
                <h1>Cardeiro: Investindo no<br/>futuro da educação.</h1>
                <p>Explore o futuro das finanças com soluções inovadoras, unindo perfeitamente as economias tradicionais
                    e digitais.</p>
                <div className="contador-usuarios">
                    <span className="icone-globo">🌐</span>
                    <span>+... Usuários no Brasil todo.</span>
                </div>
                <button className="botao-acao">Desbloqueie a liberdade financeira ➜</button>
            </div>
        </section>

        <section className="noticias">
            <h2>ÚLTIMAS NOVIDADES:</h2>
            <div className="carrossel" style={{ transform: `translateX(-${currentIndex * 20}%)` }}>
                {/* Original cards */}
                <div className="cartao">
                    <img src={imgInv1} alt="Ícone do Curso" />
                    <h3>NOTÍCIA INVESTIMENTO 1</h3>
                    <p>Work with companies developing projects to create your NFTs and get paid.</p>
                </div>
                <div className="cartao">
                    <img src={imgCurso1} alt="Ícone do Curso" />
                    <h3>CURSO DE ESPECIALIZAÇÃO 1</h3>
                    <p>Work with companies developing projects to create your NFTs and get paid.</p>
                </div>
                <div className="cartao">
                    <img src={imgInv2} alt="Ícone do Curso" />
                    <h3>NOTÍCIA INVESTIMENTO 2</h3>
                    <p>Work with companies developing projects to create your NFTs and get paid.</p>
                </div>
                <div className="cartao">
                    <img src={imgCurso2} alt="Ícone do Curso" />
                    <h3>CURSO DE ESPECIALIZAÇÃO 2</h3>
                    <p>Work with companies developing projects to create your NFTs and get paid.</p>
                </div>
                <div className="cartao">
                    <img src={imgInv3} alt="Ícone do Curso" />
                    <h3>NOTÍCIA INVESTIMENTO 3</h3>
                    <p>Work with companies developing projects to create your NFTs and get paid.</p>
                </div>
                {/* Duplicate first cards for smooth loop */}
                <div className="cartao">
                    <img src={imgInv1} alt="Ícone do Curso" />
                    <h3>NOTÍCIA INVESTIMENTO 1</h3>
                    <p>Work with companies developing projects to create your NFTs and get paid.</p>
                </div>
                <div className="cartao">
                    <img src={imgCurso1} alt="Ícone do Curso" />
                    <h3>CURSO DE ESPECIALIZAÇÃO 1</h3>
                    <p>Work with companies developing projects to create your NFTs and get paid.</p>
                </div>
                <div className="cartao">
                    <img src={imgInv2} alt="Ícone do Curso" />
                    <h3>NOTÍCIA INVESTIMENTO 2</h3>
                    <p>Work with companies developing projects to create your NFTs and get paid.</p>
                </div>
            </div>
        </section>

        <section className="informacao">
            <h4>QUALIFICAÇÃO PARA UM FUTURO MELHOR</h4>
            <h2>Para mais informações</h2>
            <p>A Cardeiro é uma plataforma de educação ligada à criptomoeda CardeiroCoin, onde buscamos ampliar a visão
                educacional.</p>
            <button className="botao-contato">Contate-nos</button>
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

export default Home
