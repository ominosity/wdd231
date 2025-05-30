/* Assign variables to elements to be interacted with */
const currentWeatherElement = document.getElementById('current-weather');
const weatherForecastElement = document.getElementById('weather-forecast');
const apiKey = 'ee3364dc18ba4b28be95b5f65832d2ac';

/* API query string */
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=44.636&lon=-123.105&units=imperial&appid=${apiKey}`;

const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=44.636&lon=-123.105&units=imperial&cnt=36&appid=${apiKey}`;

async function updateWeather() {
    /* Current Weather */
    try {
        const response = await fetch(weatherURL);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            updateWeatherElement(data);
        } else {
            throw Error(await response.text());
        }

    } catch (error) {
        console.error(error);
    }

    /* Forecast */
    try {
        const response = await fetch(forecastURL);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            updateForecastElement(data);
        } else {
            throw Error(await response.text());
        }

    } catch (error) {
        console.error(error);
    }
}

function updateWeatherElement(data) {
    /* Simplify component calls */
    const weather = data.weather[0];
    const main = data.main;

    /* Convert UNIX time by adding milliseconds */
    const sunriseTime = new Date(data.sys.sunrise * 1000);
    /* Display only the time portion */
    const sunriseText = sunriseTime.toLocaleTimeString();

    /* Convert UNIX time by adding milliseconds */
    const sunsetTime = new Date(data.sys.sunset * 1000);
    /* Display only the time portion */
    const sunsetText = sunsetTime.toLocaleTimeString();

    /* Create new elements */
    const fragment = document.createDocumentFragment();
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    const div = document.createElement('div');
    const temp = document.createElement('p');
    const description = document.createElement('p');
    const high = document.createElement('p');
    const low = document.createElement('p');
    const humidity = document.createElement('p');
    const sunrise = document.createElement('p');
    const sunset = document.createElement('p');

    /* Update values and attributes */
    image.setAttribute('src', 'https://openweathermap.org/img/wn/04d@2x.png');
    image.setAttribute('alt', weather.main);
    temp.innerHTML = `<span class="bold">${main.temp}&deg;</span> F`;
    description.textContent = `${weather.description}`;
    /* These aren't right, these are the high and low of the minute.
       Check the forecast API for the high and low of the day */
    // high.innerHTML = `High: ${main.temp_max}&deg;`;
    // low.innerHTML = `Low: ${main.temp_min}&deg;`;
    humidity.textContent = `Humidity: ${main.humidity}%`;
    sunrise.textContent = `Sunrise: ${sunriseText}`;
    sunset.textContent = `Sunset: ${sunsetText}`;

    /* Add elements to fragment and then fragment to anchor */
    figure.appendChild(image);
    fragment.appendChild(figure);
    div.appendChild(temp);
    div.appendChild(description);
    div.appendChild(high);
    div.appendChild(low);
    div.appendChild(humidity);
    div.appendChild(sunrise);
    div.appendChild(sunset);
    fragment.appendChild(div);

    currentWeatherElement.innerHTML = '';
    currentWeatherElement.append(fragment);
}

function updateForecastElement(data) {
    /* Manipulate Data */
    const options = { weekday: "long" };
    const tomorrowData = getDaySummary(1, data);
    // console.log(tomorrowData.date);

    const day2Data = getDaySummary(2, data);
    const day2DayOfWeek = new Intl.DateTimeFormat("en-US", options).format(day2Data.date);
    // console.log(day2DayOfWeek);

    const day3Data = getDaySummary(3, data);
    const day3DayOfWeek = new Intl.DateTimeFormat("en-US", options).format(day3Data.date);
    // console.log(day3DayOfWeek);

    /* Create new elements */
    const fragment = document.createDocumentFragment();
    const tomorrow = document.createElement('p');
    const dayTwo = document.createElement('p');
    const dayThree = document.createElement('p');

    /* Update values and attributes */
    tomorrow.innerHTML = `Tomorrow: Low <span class="bold">${tomorrowData.low}&deg; F</span> - High <span class="bold">${tomorrowData.high}&deg; F</span>`;
    dayTwo.innerHTML = `${day2DayOfWeek}: Low <span class="bold">${day2Data.low}&deg; F</span> - High <span class="bold">${day2Data.high}&deg; F</span>`;
    dayThree.innerHTML = `${day3DayOfWeek}: Low <span class="bold">${day3Data.low} &deg; F</span> - High <span class="bold">${day3Data.high}&deg; F</span>`;

    /* Add elements to fragment and then fragment to anchor */
    weatherForecastElement.innerHTML = '';
    fragment.appendChild(tomorrow);
    fragment.appendChild(dayTwo);
    fragment.appendChild(dayThree);
    weatherForecastElement.append(fragment);
}

function getDaySummary(day, data) {
    /* Determine today so we can only look at the next 3 days */
    let chosenDay = new Date();
    chosenDay.setDate(chosenDay.getDate() + day);
    // console.table(data.list);
    console.log(`Day: ${day} Chosen Day: ${chosenDay.toLocaleDateString()}`);

    /* Filter the data into an array of items matching today plus the number of days in the future */
    const filteredList = data.list.filter(item => {
        let date = new Date(item.dt * 1000);
        // console.log(`Forecast Date: ${date.getFullYear()}, ${date.getMonth()}, ${date.getDate()}`);
        // console.log(`Today Date: ${today} -- ${today.getFullYear()}, ${today.getMonth()}, ${today.getDate()}`);
        if (date.getFullYear() == chosenDay.getFullYear() &&
            date.getMonth() == chosenDay.getMonth() &&
            date.getDate() == chosenDay.getDate()
        ) {
            return true;
        }
    });

    /* Map temperature values to a new array */
    const temperatures = filteredList.map((item) => item.main.temp)
    // console.log(temperatures);

    /* Determine the high, low, and date */
    const low = Math.min(...temperatures);
    const high = Math.max(...temperatures);
    // console.log(`Low: ${low}; High: ${high}`);
    returnData =
    {
        low: Math.round(low),
        high: Math.round(high),
        date: new Date(filteredList[0].dt * 1000)
    }
    return returnData;
}

updateWeather();