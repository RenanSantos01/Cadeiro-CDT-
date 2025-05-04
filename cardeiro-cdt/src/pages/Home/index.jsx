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
import openai from '../../config/openai';

function Home() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [chatAberto, setChatAberto] = useState(false);
    const [mensagens, setMensagens] = useState([]);
    const [inputMensagem, setInputMensagem] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const [erro, setErro] = useState(null); // Add this line
    const [cacheRespostas, setCacheRespostas] = useState({});
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 2000;

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const respostasComuns = {
        'olá': 'Olá! Como posso ajudar você hoje?',
        'oi': 'Olá! Como posso ajudar você hoje?',
        'como funciona': 'A Cardeiro é uma plataforma de educação em criptomoedas que oferece cursos e conteúdo especializado para ajudar você a entender e investir no mercado cripto.',
        'preço': 'Para informações sobre preços dos nossos cursos, por favor acesse a seção de Cursos no menu principal.',
        'curso': 'Oferecemos diversos cursos especializados em criptomoedas. Você pode conferir todos eles na seção de Cursos do nosso site.',
        'cardeirocoin': 'A CardeiroCoin é nossa criptomoeda própria que integra nossa plataforma educacional.',
        'suporte': 'Estou aqui para ajudar! Como posso auxiliar você hoje?',
        'ajuda': 'Como posso ajudar você? Estou aqui para esclarecer suas dúvidas sobre a Cardeiro e nossos cursos.'
    };

    const enviarMensagem = async () => {
        if (!inputMensagem.trim() || isLoading) return;

        setIsLoading(true);
        setErro(null);

        const mensagemInput = inputMensagem.trim().toLowerCase();
        const novaMensagem = {
            texto: inputMensagem,
            remetente: 'usuario'
        };
        setMensagens(prev => [...prev, novaMensagem]);
        setInputMensagem('');

        // Check for predefined responses
        const respostaComum = Object.entries(respostasComuns).find(([chave]) =>
            mensagemInput.includes(chave)
        );

        if (respostaComum) {
            setMensagens(prev => [...prev, {
                texto: respostaComum[1],
                remetente: 'ia'
            }]);
            setIsLoading(false);
            return;
        }

        // Check cache
        if (cacheRespostas[mensagemInput]) {
            setMensagens(prev => [...prev, {
                texto: cacheRespostas[mensagemInput],
                remetente: 'ia'
            }]);
            setIsLoading(false);
            return;
        }

        try {
            await delay(1000);

            const resposta = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "Você é um assistente de suporte da Cardeiro, uma plataforma de educação em criptomoedas."
                    },
                    {
                        role: "user",
                        content: mensagemInput
                    }
                ],
            });

            const respostaTexto = resposta.choices[0].message.content;

            // Cache the response
            setCacheRespostas(prev => ({
                ...prev,
                [mensagemInput]: respostaTexto
            }));

            setMensagens(prev => [...prev, {
                texto: respostaTexto,
                remetente: 'ia'
            }]);
            setRetryCount(0);
        } catch (erro) {
            console.error('Erro ao obter resposta:', erro);

            const mensagemErro = erro.status === 429
                ? 'Nosso sistema está com alta demanda no momento. Por favor, tente uma das perguntas mais comuns ou aguarde alguns minutos.'
                : 'Desculpe, não foi possível processar sua mensagem no momento. Tente fazer uma pergunta mais específica sobre nossos cursos ou serviços.';

            setErro(mensagemErro);
            setMensagens(prev => [...prev, {
                texto: mensagemErro,
                remetente: 'ia'
            }]);
            setRetryCount(0);
        } finally {
            setIsLoading(false);
        }
    };

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

    const alternarChat = () => {
        setChatAberto(!chatAberto);
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
                <button className="botao-suporte" onClick={alternarChat}>
                    <img src={iaIcon} alt="Suporte" />
                    <span>SUPORTE I.A</span>
                </button>
                {chatAberto && (
                    <div className="chat-container">
                        <div className="chat-header">
                            <h3>Chat de Suporte</h3>
                            <button onClick={alternarChat}>X</button>
                        </div>
                        <div className="chat-mensagens">
                            {mensagens.map((msg, index) => (
                                <div key={index} className={`mensagem ${msg.remetente}`}>
                                    {msg.texto}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="mensagem ia">
                                    Digitando...
                                </div>
                            )}
                            {erro && (
                                <div className="mensagem erro">
                                    {erro}
                                </div>
                            )}
                        </div>
                        <div className="chat-input">
                            <input
                                type="text"
                                value={inputMensagem}
                                onChange={(e) => setInputMensagem(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
                                placeholder="Digite sua mensagem..."
                                disabled={isLoading}
                            />
                            <button
                                onClick={enviarMensagem}
                                disabled={isLoading || !inputMensagem.trim()}
                            >
                                {isLoading ? '...' : 'Enviar'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Home
