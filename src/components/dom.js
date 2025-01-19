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
    const location = document.querySelector('#output-container h1');
    const conditions = document.querySelector('#output-container p');
    const icon = document.querySelector('#output-container img');
    const sunrise_time = document.querySelector('#output-container .sunrise p');
    const sunset_time = document.querySelector('#output-container .sunset p');
    const temp = document.querySelector('#output-container .temperature p');
    const localeTime = document.querySelector('#output-container #localTime');

    const Set = (data) => {
        location.textContent = data.location;
        conditions.textContent = data.conditions;
        sunrise_time.textContent = data.sunrise;
        sunset_time.textContent = data.sunset;
        temp.textContent = `${Math.floor(data.temp)}°`;
        icon.src = iconMap[data.icon] || '';
        localeTime.textContent = data.localTime;
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

    return {
        Set,
        Clear,
        Fade
    };
})();
