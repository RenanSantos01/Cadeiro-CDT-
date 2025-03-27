document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('cryptoChart').getContext('2d');
    let currentChart;

    const generateData = (points) => {
        const data = [];
        const basePrice = 45;
        for (let i = 0; i < points; i++) {
            data.push({
                x: new Date(Date.now() - (points - i) * 3600000).toISOString(),
                y: basePrice + Math.random() * 10
            });
        }
        return data;
    };

    const timeButtons = document.querySelectorAll('.time-button');
    
    const updateChart = (timeframe) => {
        let points;
        switch(timeframe) {
            case 'day':
                points = 24;
                break;
            case 'month':
                points = 30;
                break;
            case 'year':
                points = 365;
                break;
            default:
                points = 24;
        }

        if (currentChart) {
            currentChart.destroy();
        }

        const chartData = generateData(points);

        currentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartData.map(item => new Date(item.x).toLocaleTimeString()),
                datasets: [{
                    label: 'CardeiroCoin Price',
                    data: chartData.map(item => item.y),
                    borderColor: '#3366ff',
                    backgroundColor: 'rgba(51, 102, 255, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
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
                                return '$' + value.toFixed(2);
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
                                return 'Price: $' + context.raw.toFixed(2);
                            }
                        }
                    }
                }
            }
        });
    };

    timeButtons.forEach(button => {
        button.addEventListener('click', () => {
            timeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateChart(button.dataset.time);
        });
    });

    // Initialize with daily data
    updateChart('day');
});