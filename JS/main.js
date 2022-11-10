const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');
const nameCountry = document.querySelector('#country');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (nameCity.value === '' || nameCountry.value === '') {
        showError('Ambos campos son obligatorios');
        return;
    }
    callAPI(nameCity.value, nameCountry.value);
    // console.log(nameCity.value);
    // console.log(nameCountry.value);
});

function callAPI(city, country) {
    const apiID = `${process.env.API_WEATHER}`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiID}`;
    // #

    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => {
            if (dataJSON.cod === '404') {
                showError('Ciudad no encontrada');
            } else {
                clearHTML();
                showWeather(dataJSON);
            }
            // console.log(dataJSON); 
        })
        .catch(error => {
            console.log(error);
        })
}

function showWeather(data) {
    const {name, main: {temp, temp_min, temp_max, humidity}, weather: [arr]} = data;

    const degrees = convertTemp(temp);
    const min = convertTemp(temp_min);
    const max = convertTemp(temp_max);


    const content = document.createElement('div');
    content.innerHTML =  ` 
        <h5>Weather in ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${degrees}°C</h2>
        <p>${arr.description}</p>
        <p>Max: ${max}°C    Min: ${min}°C</p>
        <p>Humidity: ${humidity}</p>
    `;

    result.appendChild(content); // a result le agrego content <- el child

    // console.log(name);
    // console.log(arr.icon);
}

function showError(message) {
    console.log(message);
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function convertTemp(temp) {
    return parseInt(temp - 273.15);
}

function clearHTML() {
    result.innerHTML = '';
}
