import { useState, useEffect, useRef } from 'react'
import './criptostyle.css'
import { Link } from 'react-router-dom'
import criptoLogo from '../../assets/criptologo.PNG'
import iaIcon from '../../assets/ia.png'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from 'chart.js'
import { Line } from 'react-chartjs-2'
import AIChat from '../../components/AIChat';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler)

function Cripto() {
    const [timeframe, setTimeframe] = useState('day')
    const [bitcoinData, setBitcoinData] = useState({
        currentPrice: 0,
        priceChange: 0,
        marketCap: 0,
        volume: 0,
        supply: 0
    });
    const chartRef = useRef(null)

    useEffect(() => {
        fetchBitcoinData();
        const interval = setInterval(fetchBitcoinData, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    const fetchBitcoinData = async () => {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true');
            const data = await response.json();
            
            setBitcoinData({
                currentPrice: data.bitcoin.usd,
                priceChange: data.bitcoin.usd_24h_change,
                marketCap: data.bitcoin.usd_market_cap,
                volume: data.bitcoin.usd_24h_vol,
                supply: 21000000 // Bitcoin's max supply
            });
        } catch (error) {
            console.error('Error fetching Bitcoin data:', error);
        }
    };

    const fetchChartData = async (timeframe) => {
        try {
            const days = timeframe === 'day' ? 1 : timeframe === 'month' ? 30 : 365;
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}&interval=daily`);
            const data = await response.json();
            
            return {
                labels: data.prices.map(price => new Date(price[0]).toLocaleString()),
                datasets: [{
                    label: 'Bitcoin Price',
                    data: data.prices.map(price => price[1]),
                    borderColor: '#F7931A', // Bitcoin orange
                    backgroundColor: 'rgba(247, 147, 26, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            };
        } catch (error) {
            console.error('Error fetching chart data:', error);
            return getChartData(timeframe); // Fallback to dummy data
        }
    };

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Bitcoin Price',
            data: [],
            borderColor: '#F7931A',
            backgroundColor: 'rgba(247, 147, 26, 0.1)',
            fill: true,
            tension: 0.4
        }]
    });

    useEffect(() => {
        const updateChartData = async () => {
            const newData = await fetchChartData(timeframe);
            setChartData(newData);
        };
        updateChartData();
    }, [timeframe]);



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

            <main className="cripto-page">
                <section className="cripto-info tema-escuro">
                    <div className="cripto-header">
                        <h1>Bitcoin (BTC)</h1>
                        <div className="price-info">
                            <span className="current-price">${bitcoinData.currentPrice.toLocaleString()}</span>
                            <span className={`price-change ${bitcoinData.priceChange >= 0 ? 'positive' : 'negative'}`}>
                                {bitcoinData.priceChange.toFixed(2)}%
                            </span>
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
                            <Line ref={chartRef} data={chartData} options={chartOptions} />
                        </div>
                    </div>

                    <div className="market-stats">
                        <div className="stat-item">
                            <span className="stat-label">Market Cap</span>
                            <span className="stat-value">${bitcoinData.marketCap.toLocaleString()}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Volume 24h</span>
                            <span className="stat-value">${bitcoinData.volume.toLocaleString()}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Circulating Supply</span>
                            <span className="stat-value">{bitcoinData.supply.toLocaleString()} BTC</span>
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

            <AIChat />
        </>
    )
}

export default Cripto