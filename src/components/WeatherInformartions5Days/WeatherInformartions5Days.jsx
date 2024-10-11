import './WeatherInformartions5Days.css'

// Componente que exibe a previsão para os próximos 5 dias
function WeatherInformations5Days({ weather5Days }) {

    // Objeto que vai armazenar a previsão diária agrupada por data
    let dailyForecast = {}

    // Percorre as previsões fornecidas pela API (weather5Days.list)
    // A previsão vem a cada 3 horas, então agrupamos pela data
    for (let forecast of weather5Days.list) {
        // Converte o timestamp para uma data legível (apenas a data, sem a hora)
        const date = new Date(forecast.dt * 1000).toLocaleDateString()

        // Se a data ainda não está no dailyForecast, adicionamos essa previsão
        if (!dailyForecast[date]) {
            dailyForecast[date] = forecast
        }
    }

    // Pega apenas as previsões dos próximos 5 dias
    // O slice(1, 6) ignora o primeiro valor (hoje) e pega os próximos 5
    const next5DaysForecast = Object.values(dailyForecast).slice(1, 6)

    // Função para formatar a data em um formato mais amigável (ex: segunda-feira, 12)
    function convertDate(date) {
        const newDate = new Date(date.dt * 1000).toLocaleDateString('pt-BR', { 
            weekday: 'long', // Dia da semana por extenso (ex: segunda-feira)
            day: '2-digit'   // Dia do mês com dois dígitos (ex: 12)
        })

        return newDate
    }

    // Renderiza a previsão dos próximos 5 dias
    return (
        <div className='weather-container'>

            <h3>Previsão Próximo 5 Dias</h3>
            <div className='weather-list'>

                {/* Mapeia cada previsão diária e exibe as informações correspondentes */}
                {next5DaysForecast.map(forecast => (
                    <div key={forecast.dt} className='weather-item'>
                        {/* Exibe o dia da semana e o número do dia */}
                        <p className='forecast-day'>{convertDate(forecast)}</p>

                        {/* Exibe o ícone da condição climática (sol, chuva, etc.) */}
                        <img 
                            src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} 
                            alt='Ícone do tempo' 
                        />

                        {/* Descrição do clima (ex: "céu limpo", "chuva leve") */}
                        <p className='forecast-description'>{forecast.weather[0].description}</p>

                        {/* Exibe a temperatura mínima e máxima do dia */}
                        <p>
                            {Math.round(forecast.main.temp_min)}ºC min /{' '}
                            {Math.round(forecast.main.temp_max)}ºC máx
                        </p>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default WeatherInformations5Days






