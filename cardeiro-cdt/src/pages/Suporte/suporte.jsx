import { useState } from 'react'
import './suportestyle.css'
import { Link } from 'react-router-dom'
import criptoLogo from '../../assets/criptologo.PNG'
import iaIcon from '../../assets/ia.png'
import AIChat from '../../components/AIChat';

function Suporte() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        telefone: '',
        contato: '',
        problema: '',
        descricao: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8083/suporte', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Solicitação de suporte enviada com sucesso!');
                e.target.reset();
                setFormData({
                    name: '',
                    email: '',
                    telefone: '',
                    contato: '',
                    problema: '',
                    descricao: ''
                });
            } else {
                alert('Erro ao enviar solicitação de suporte.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao enviar solicitação de suporte.');
        }
    };

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

                    <form id="suporteForm" className="form-container" onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder="Nome Completo *" 
                            required 
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="E-mail *" 
                            required 
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <input 
                            type="tel" 
                            id="telefone" 
                            name="telefone" 
                            placeholder="Telefone *" 
                            required 
                            value={formData.telefone}
                            onChange={handleInputChange}
                        />

                        <select 
                            id="contato" 
                            name="contato" 
                            required
                            value={formData.contato}
                            onChange={handleInputChange}
                        >
                            <option value="">Como deseja ser contatado *</option>
                            <option value="email">E-mail</option>
                            <option value="telefone">Telefone</option>
                        </select>

                        <select 
                            id="problema" 
                            name="problema" 
                            required
                            value={formData.problema}
                            onChange={handleInputChange}
                        >
                            <option value="">Tipo de Problema *</option>
                            <option value="tecnico">Problema Técnico</option>
                            <option value="financeiro">Questão Financeira</option>
                            <option value="conta">Problema com Conta</option>
                            <option value="curso">Dúvida sobre Cursos</option>
                            <option value="outro">Outro</option>
                        </select>

                        <textarea
                            id="descricao"
                            name="descricao"
                            rows="5"
                            placeholder="Descreva seu problema *"
                            required
                            value={formData.descricao}
                            onChange={handleInputChange}
                        ></textarea>

                        <button type="submit" className="botao-enviar">Enviar Solicitação</button>
                    </form>
                </section>
            </main>

            <footer className="tema-escuro">
                <div className="conteudo-rodape">
                    <p className="direitos-autorais">© 2025 All Rights Reserved</p>
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