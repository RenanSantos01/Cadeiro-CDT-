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
        'horário de atendimento': 'Nosso atendimento funciona de segunda a sexta, das 9h às 18h. Fora desse horário, você pode deixar sua dúvida aqui que responderemos assim que possível.',
        'localização': 'Estamos sediados na Bahia, mas atendemos clientes de todo o Brasil, totalmente online.',
        'privacidade': 'Respeitamos sua privacidade e protegemos seus dados conforme a legislação vigente. Para mais detalhes, consulte nossa política de privacidade no site.',
        'como funciona': 'A Cardeiro é uma plataforma de educação em criptomoedas que oferece cursos e conteúdo especializado para ajudar você a entender e investir no mercado cripto.',
        'cardeirocoin': `A Cardeiro Tech não é apenas mais uma criptomoeda no mercado — ela representa uma revolução no jeito de investir com propósito.

Criada para oferecer benefícios reais e sustentáveis a longo prazo, a Cardeiro Tech foi pensada para quem quer crescer financeiramente enquanto apoia o avanço da educação tecnológica no Brasil e no mundo.

Ao adquirir Cardeiro Tech, você não está só comprando um ativo digital. Está investindo em um projeto sólido que tem como missão fomentar o conhecimento e a capacitação em áreas de ponta, como tecnologia, inovação e criptomoedas. Parte dos recursos obtidos com a Cardeiro Tech é direcionada para programas educacionais, cursos e iniciativas que vão formar a próxima geração de profissionais preparados para o mercado digital.

Por que investir na Cardeiro Tech?

- Benefícios exclusivos a longo prazo: A Cardeiro Tech oferece vantagens para seus holders, incluindo acesso a conteúdos exclusivos, descontos em cursos e participação em eventos especiais da comunidade.

- Valorização sustentável: Diferente de muitas criptomoedas voláteis, a Cardeiro Tech aposta em uma estratégia consistente, com foco em crescimento sólido e sustentável, amparado pelo fortalecimento do ecossistema educacional.

- Compromisso com educação: Ao investir, você contribui para o desenvolvimento de programas educacionais inovadores, ajudando milhares de pessoas a se qualificarem para o futuro do trabalho.

- Comunidade forte e engajada: Ao fazer parte da Cardeiro Tech, você entra para uma rede de investidores, educadores e entusiastas que compartilham a visão de um futuro mais tecnológico e acessível para todos.

Investir na Cardeiro Tech é apostar no futuro — seu, da tecnologia e da educação. Não perca a chance de fazer parte desse movimento que une lucro, inovação e transformação social.`,

        'feedback': 'Queremos ouvir você! Envie seu feedback para melhorias da plataforma pelo nosso formulário de contato.',
  };

  const opcoesMenu = {
        '1': 'horário de atendimento',
        '2': 'localização',
        '3': 'privacidade',
        '4': 'como funciona',
        '5': 'cardeirocoin',
        '6': 'feedback',
        '7': 'ajuda'
  };

  const enviarMensagem = async () => {
    if (!inputMensagem.trim() || isLoading) return;

    setIsLoading(true);
    setErro(null);

    const mensagemInput = inputMensagem.trim().toLowerCase();
    const mensagemConvertida = opcoesMenu[mensagemInput] || mensagemInput;

    const novaMensagem = {
      texto: inputMensagem,
      remetente: 'usuario'
    };
    setMensagens(prev => [...prev, novaMensagem]);
    setInputMensagem('');

    // Resposta pré-programada
    const respostaComum = Object.entries(respostasComuns).find(([chave]) =>
      mensagemConvertida.includes(chave)
    );

    if (respostaComum) {
      setMensagens(prev => [...prev, {
        texto: respostaComum[1],
        remetente: 'ia'
      }]);
      setIsLoading(false);
      return;
    }

    // Cache
    if (cacheRespostas[mensagemConvertida]) {
      setMensagens(prev => [...prev, {
        texto: cacheRespostas[mensagemConvertida],
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
            content: mensagemConvertida
          }
        ],
      });

      const respostaTexto = resposta.choices[0].message.content;

      setCacheRespostas(prev => ({
        ...prev,
        [mensagemConvertida]: respostaTexto
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
    const novoEstado = !chatAberto;
    setChatAberto(novoEstado);

    if (!chatAberto) {
      setMensagens([
        {
          texto: `👋 Olá! Bem-vindo à Cardeiro.\nEm que posso te ajudar?\n\nDigite sua dúvida ou escolha uma das opções abaixo:\n\n1 - Horário de atendimento\n2 - Localização\n3 - Privacidade\n4 - Como funciona\n5 - CardeiroCoin\n6 - Feedback\n7 - Ajuda`,
          remetente: 'ia'
        }
      ]);
      setErro(null);
      setInputMensagem('');
    }
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
          <div
            className="chat-mensagens"
            style={{ color: 'black', whiteSpace: 'pre-wrap', backgroundColor: 'white' }}
          >
            {mensagens.map((msg, index) => (
              <div key={index} className={`mensagem ${msg.remetente}`}>
                {msg.texto}
              </div>
            ))}
            {isLoading && (
              <div className="mensagem ia" style={{ color: 'black' }}>
                Digitando...
              </div>
            )}
            {erro && (
              <div className="mensagem erro" style={{ color: 'red' }}>
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
