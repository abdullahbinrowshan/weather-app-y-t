const getByQuery = classOrId => {
    return document.querySelector(classOrId)
}
const container = getByQuery('.container');
const search = getByQuery('.search-box button');
const weatherBox = getByQuery('.weather-box');
const weatherDetails = getByQuery('.weather-details');
const error404 = getByQuery('.not-found');
const input = getByQuery('.search-box input');

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loadData()
    }
})

search.onclick = () => {
    loadData()
}

const loadData = async () => {
    const API_KEY = `e9e5d25056711d47d987e9bbb004f620`;
    const city = input.value;

    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
        const res = await fetch(url)
        const data = await res.json();
        displayTemperature(data);
    } catch (error) {
        console.error(error);
    }
}

const displayTemperature = (data) => {
    if (data.cod === '404') {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn')
        return
    }
    else {
        error404.style.display = 'none'
        error404.classList.remove('fadeIn')
    }

    const image = getByQuery('.weather-box img');
    const temperature = getByQuery('.weather-box .temperature');
    const description = getByQuery('.weather-box .description');
    const humidity = getByQuery('.weather-details .humidity span');
    const wind = getByQuery('.weather-details .wind span');

    switch (data.weather[0].main) {
        case 'Clear':
            image.src = 'images/clear.png'
            break;
        case 'Rain':
            image.src = 'images/rain.png'
            break;
        case 'Clouds':
            image.src = 'images/cloud.png'
            break;
        case 'Haze':
            image.src = 'images/snow.png'
            break;

        default:
            image.src = '';
    }

    temperature.innerHTML = `${data.main.temp}<span>°C</span>`;
    description.innerHTML = `${data.weather[0].description}`
    console.log(data);
    humidity.innerHTML = `${data.main.humidity}%`;
    wind.innerHTML = `${data.wind.speed}Km/h`;

    weatherBox.style.display = ''
    weatherDetails.style.display = ''
    weatherBox.classList.add('fadeIn')
    weatherDetails.classList.add('fadeIn')
    container.style.height = '590px'


}