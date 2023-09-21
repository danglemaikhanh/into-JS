const apiKey = 'e197aea74f677ca95d5ab103f7caf254';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const temp = document.querySelector('.temp');
const city = document.querySelector('.city');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const inputElement = document.querySelector('.search input');
const searchBtn = document.querySelector('.btn');
const image = document.querySelector('.weather-icon');
const weatherDisplay = document.querySelector('.weather');
const errorMsg = document.querySelector('.error-msg');

async function checkWeather(cityName) {
    const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);
    if (response.status === 404) {
        errorMsg.classList.add('invalid');
        weatherDisplay.classList.remove('show');
    }
    else {
        errorMsg.classList.remove('invalid');
    }
    city.textContent =  data.name;
    temp.textContent = Math.round(data.main.temp);
    wind.textContent = data.wind.speed;
    humidity.textContent = Math.round(data.main.humidity);

    const weather = data.weather[0].main;
    setValue(weather);
}

searchBtn.addEventListener('click', () => {
    let inputText = inputElement.value;
    if (inputText === '') return;
    checkWeather(inputText);
    inputElement.value = '';
    weatherDisplay.classList.add('show');
})

function setValue(weather) {
    let icon = '';
    switch(weather) {
        case 'Thunder':
            icon = 'thunderstorm';
            break;
        case 'Drizzle':
        case 'Rain':
            icon = 'rain';
            break;
        case 'Snow':
            icon = 'snowing';
            break;
        case 'Clouds':
            icon = 'cloud';
            break;
        default: 
            icon = 'sunny-day';
    }
    image.src = `./icons/${icon}.png`;
}