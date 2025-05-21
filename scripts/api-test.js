/* Select elements of the DOM for manipulation */
const currentTempElement = document.getElementById('current-temp');
const weatherIconElement = document.getElementById('weather-icon');
const figureCaptionElement = document.querySelector('figcaption');
const apiKey = 'ee3364dc18ba4b28be95b5f65832d2ac';

/* API query string */
const url = `https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.63&units=imperial&appid=${apiKey}`;

async function apiFetch () {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

function displayResults(data) {
    currentTempElement.textContent = `${data.main.temp}°F`;
    const events = data.weather;
    const iconCode = events[0].icon;
    // console.log(iconCode);
    weatherIconElement.setAttribute('src', `https://openweathermap.org/img/wn/${iconCode}@2x.png`);
    figureCaptionElement.textContent = events[0].description;
}

apiFetch();