import clearDay from '../assets/icon/clear-day.svg';
import clearNight from '../assets/icon/clear-night.svg';
import cloudy from '../assets/icon/cloudy.svg';
import fog from '../assets/icon/fog.svg';
import partlyCloudyDay from '../assets/icon/partly-cloudy-day.svg';
import partlyCloudyNight from '../assets/icon/partly-cloudy-night.svg';
import rain from '../assets/icon/rain.svg';
import snow from '../assets/icon/snow.svg';
import sunrise from '../assets/icon/sunrise.svg';
import sunset from '../assets/icon/sunset.svg';
import wind from '../assets/icon/wind.svg';
import precip from '../assets/icon/precipitation.svg';

const iconMap = {
    'clear-day': clearDay,
    'clear-night': clearNight,
    cloudy,
    fog,
    'partly-cloudy-day': partlyCloudyDay,
    'partly-cloudy-night': partlyCloudyNight,
    rain,
    snow,
    sunrise,
    sunset,
    wind
};

export const Output = (() => {
    const container = document.querySelector('#output-container');
    const country = document.querySelector('#output-container #country');
    const location = document.querySelector('#output-container h1');
    const conditions = document.querySelector('#output-container #conditions');
    const icon = document.querySelector('#output-container img');
    const sunrise_time = document.querySelector('#sunrise_time');
    const sunset_time = document.querySelector('#sunset_time');
    const temp = document.querySelector('#output-container .temperature p');
    const localeTime = document.querySelector('#output-container #localTime');
    const week = document.querySelector(`#week`);

    const Set = (data) => {
        country.textContent = data.country;
        location.textContent = data.location;
        conditions.textContent = data.conditions;
        sunrise_time.textContent = data.sunrise;
        sunset_time.textContent = data.sunset;
        temp.textContent = `${Math.floor(data.temp)}°`;
        icon.src = iconMap[data.icon] || '';
        localeTime.textContent = data.localTime;
        BuildWeekForecast(data.days);
    };

    const Clear = () => {
        location.textContent = '';
        conditions.textContent = '';
    };

    const Fade = (displayFunction) => {
        container.classList.add('fadeout');
        setTimeout(() => {
            container.classList.remove('fadeout');
            displayFunction();
        }, 1000);
    };

    const BuildWeekForecast = (days) => {
        // Clear Week Container
        while (week.firstChild) {
            week.firstChild.remove();
        }
        for (let x = 0; x <= 5; x++) {
            const day = {
                container: document.createElement('div'),
                day_name: document.createElement('h1'),
                conditions: document.createElement('img'),
                temp: document.createElement('p'),
                precip_icon: document.createElement('img'),
                precip_text: document.createElement('p')
            };
            day.container.classList.add('day');
            day.container.setAttribute('id', 'day');

            day.day_name.textContent = days[x].day;

            day.conditions.src = iconMap[days[x].icon] || '';
            day.conditions.classList.add('conditions');

            day.temp.textContent = days[x].temp;
            day.temp.classList.add('temp');

            day.precip_icon.src = precip;
            day.precip_icon.classList.add('precipitation');

            day.precip_text.textContent = days[x].precip;
            day.precip_text.classList.add('precipitation');

            day.container.append(
                day.day_name,
                day.conditions,
                day.temp,
                day.precip_icon,
                day.precip_text
            );

            week.appendChild(day.container);
        }
    };

    return {
        Set,
        Clear,
        Fade
    };
})();
