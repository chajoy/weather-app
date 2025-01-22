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
    const status_msg = document.querySelector('#status-msg');
    const country = document.querySelector('#output-container #country');
    const location = document.querySelector('#output-container h1');
    const conditions = document.querySelector('#output-container #conditions');
    const icon = document.querySelector('#output-container img');
    const sunrise_time = document.querySelector('#sunrise_time');
    const sunset_time = document.querySelector('#sunset_time');
    const temp = document.querySelector('#output-container .temperature p');
    const localeTime = document.querySelector('#output-container #localTime');
    const week = document.querySelector(`#week`);

    const elements = {
        status: status_msg,
        output: container
    };

    const Set = (object, data) => {
        if (object === 'status') {
            if (typeof data !== 'string') {
                status_msg.textContent = 'error';
                console.error("status not typeof 'string'");
            } else {
                status_msg.textContent = data;
            }
        } else if (object === 'output') {
            if (typeof data !== 'object') {
                status_msg.textContent = 'error';
                console.error("data not typeof 'object'");
            } else {
                container.style.display = 'grid';
                country.textContent = data.country;
                location.textContent = data.location;
                conditions.textContent = data.conditions;
                sunrise_time.textContent = data.sunrise;
                sunset_time.textContent = data.sunset;
                temp.textContent = `${Math.floor(data.temp)}°`;
                icon.src = iconMap[data.icon] || '';
                localeTime.textContent = data.localTime;
                BuildWeekForecast(data.days);
            }
        }
    };

    const Clear = (object) => {
        const element = elements[object];

        if (!element) {
            console.error('[Clear]Cant apply to selected object');
        } else {
            while (element.firstChild) {
                element.firstChild.remove();
            }
            element.textContent = '';
        }
    };

    const Fade = (object, direction) => {
        const element = elements[object];

        if (!element) {
            console.error('[Fade]Cant apply to selected object');
        } else {
            if (direction === 'in') {
                element.classList.remove('fadeout');
            } else if (direction === 'out') {
                element.classList.add('fadeout');
            } else {
                console.error('[Fade]Direction not valid');
            }
        }
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
            day.temp.setAttribute('id', 'week_temp');

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

    const ConvertTemp = (type) => {
        const week_temps = document.querySelectorAll(
            '#week_temp, #output-container .temperature p'
        );

        const truncateValue = (value) => {
            if (value >= 0) {
                return value % 1 <= 0.5 ? Math.floor(value) : Math.ceil(value);
            } else {
                return value % 1 >= -0.5 ? Math.ceil(value) : Math.floor(value);
            }
        };

        const celciusToFahrenheit = (c) => {
            const f = c * (9 / 5) + 32;
            return truncateValue(f);
        };

        const fahrenheitToCelcius = (f) => {
            const c = (f - 32) * (5 / 9);
            return truncateValue(c);
        };

        week_temps.forEach((temp) => {
            let _temp = Number(
                temp.textContent.slice(0, temp.textContent.length - 1)
            );
            if (type === 'f') {
                _temp = celciusToFahrenheit(_temp);
            } else if (type === 'c') {
                _temp = fahrenheitToCelcius(_temp);
            }
            temp.textContent = _temp + '°';
        });
    };

    return {
        Set,
        Clear,
        Fade,
        ConvertTemp
    };
})();
