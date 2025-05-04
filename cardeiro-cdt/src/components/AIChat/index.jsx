import { useState } from 'react';
import iaIcon from '../../assets/ia.png';
import openai from '../../config/openai';
import './style.css';

function AIChat() {
    const [chatAberto, setChatAberto] = useState(false);
    const [mensagens, setMensagens] = useState([]);
    const [inputMensagem, setInputMensagem] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [erro, setErro] = useState(null);
    const [cacheRespostas, setCacheRespostas] = useState({});

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

            setCacheRespostas(prev => ({
                ...prev,
                [mensagemInput]: respostaTexto
            }));

            setMensagens(prev => [...prev, {
                texto: respostaTexto,
                remetente: 'ia'
            }]);
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
        } finally {
            setIsLoading(false);
        }
    };

    const alternarChat = () => {
        setChatAberto(!chatAberto);
    };

    return (
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
    );
}

export default AIChat;