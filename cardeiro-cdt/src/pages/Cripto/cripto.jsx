import { useState, useEffect, useRef } from 'react'
import './criptostyle.css'
import { Link } from 'react-router-dom'
import criptoLogo from '../../assets/criptologo.PNG'
import iaIcon from '../../assets/ia.png'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from 'chart.js'
import { Line } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler)

function Cripto() {
    const [timeframe, setTimeframe] = useState('day')
    const chartRef = useRef(null)

    const generateData = (points) => {
        const data = []
        const basePrice = 45
        for (let i = 0; i < points; i++) {
            data.push({
                x: new Date(Date.now() - (points - i) * 3600000).toISOString(),
                y: basePrice + Math.random() * 10
            })
        }
        return data
    }

    const getChartData = (timeframe) => {
        let points
        switch(timeframe) {
            case 'day':
                points = 24
                break
            case 'month':
                points = 30
                break
            case 'year':
                points = 365
                break
            default:
                points = 24
        }

        const chartData = generateData(points)

        return {
            labels: chartData.map(item => new Date(item.x).toLocaleTimeString()),
            datasets: [{
                label: 'CardeiroCoin Price',
                data: chartData.map(item => item.y),
                borderColor: '#3366ff',
                backgroundColor: 'rgba(51, 102, 255, 0.1)',
                fill: true,
                tension: 0.4
            }]
        }
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
            mode: 'index'
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#888',
                    maxRotation: 45,
                    minRotation: 45
                }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#888',
                    callback: function(value) {
                        return '$' + value.toFixed(2)
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function(context) {
                        return 'Price: $' + context.raw.toFixed(2)
                    }
                }
            }
        }
    }

    const handleTimeframeChange = (newTimeframe) => {
        setTimeframe(newTimeframe)
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

            <main className="cripto-page">
                <section className="cripto-info tema-escuro">
                    <div className="cripto-header">
                        <h1>CardeiroCoin (CDT)</h1>
                        <div className="price-info">
                            <span className="current-price">$0.0458</span>
                            <span className="price-change positive">+2.45%</span>
                        </div>
                    </div>

                    <div className="chart-container">
                        <div className="chart-controls">
                            <button 
                                className={`time-button ${timeframe === 'day' ? 'active' : ''}`}
                                onClick={() => handleTimeframeChange('day')}
                            >
                                24h
                            </button>
                            <button 
                                className={`time-button ${timeframe === 'month' ? 'active' : ''}`}
                                onClick={() => handleTimeframeChange('month')}
                            >
                                30d
                            </button>
                            <button 
                                className={`time-button ${timeframe === 'year' ? 'active' : ''}`}
                                onClick={() => handleTimeframeChange('year')}
                            >
                                1y
                            </button>
                        </div>
                        <div style={{ height: '400px' }}>
                            <Line ref={chartRef} data={getChartData(timeframe)} options={chartOptions} />
                        </div>
                    </div>

                    <div className="market-stats">
                        <div className="stat-item">
                            <span className="stat-label">Market Cap</span>
                            <span className="stat-value">$45.8M</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Volume 24h</span>
                            <span className="stat-value">$2.3M</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Circulating Supply</span>
                            <span className="stat-value">1B CDT</span>
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

export default Cripto