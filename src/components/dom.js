import icon_clearDay from '../assets/icon/clear-day.svg';
import icon_clearNight from '../assets/icon/clear-night.svg';
import icon_cloudy from '../assets/icon/cloudy.svg';
import icon_fog from '../assets/icon/fog.svg';
import icon_partlyCloudyDay from '../assets/icon/partly-cloudy-day.svg';
import icon_partlyCloudyNight from '../assets/icon/partly-cloudy-night.svg';
import icon_rain from '../assets/icon/rain.svg';
import icon_snow from '../assets/icon/snow.svg';
import icon_sunrise from '../assets/icon/sunrise.svg';
import icon_sunset from '../assets/icon/sunset.svg';
import icon_wind from '../assets/icon/wind.svg';
import icon_precip from '../assets/icon/precipitation.svg';

const iconMap = {
    'clear-day': icon_clearDay,
    'clear-night': icon_clearNight,
    cloudy: icon_cloudy,
    fog: icon_fog,
    'partly-cloudy-day': icon_partlyCloudyDay,
    'partly-cloudy-night': icon_partlyCloudyNight,
    rain: icon_rain,
    snow: icon_snow,
    sunrise: icon_sunrise,
    sunset: icon_sunrise,
    wind: icon_wind
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
    const status_msg = document.querySelector('#status-msg');

    let elements = {
        status: status_msg,
        output: container,
        week: week
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
                icon.src = iconMap[data.icon];
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
                conditions_text: document.createElement('p'),
                temp: document.createElement('p'),
                precip_icon: document.createElement('img'),
                precip_text: document.createElement('p'),
                precip_title: document.createElement('h2'),
                fullDate: document.createElement('h2'),
                sunrise_text: document.createElement('p'),
                sunrise_icon: document.createElement('img'),
                sunset_text: document.createElement('p'),
                sunset_icon: document.createElement('img')
            };
            day.container.classList.add('day');
            day.container.setAttribute('id', 'day-container');

            day.day_name.textContent = days[x].day;
            day.day_name.classList.add('day_name');

            day.conditions.src = iconMap[days[x].icon];
            day.conditions.classList.add('conditions');

            day.temp.textContent = days[x].temp;
            day.temp.classList.add('temp');
            day.temp.setAttribute('id', 'week_temp');

            day.precip_icon.src = icon_precip;
            day.precip_icon.classList.add('precipitation');

            day.precip_text.textContent = days[x].precip;
            day.precip_text.classList.add('precipitation');

            day.precip_title.textContent = 'Precipitation:';
            day.precip_title.classList.add('precipitation');

            day.fullDate.textContent = days[x].fullDate;
            day.fullDate.classList.add('fullDate');

            day.conditions_text.textContent = days[x].conditions;
            day.conditions_text.classList.add('conditions');

            day.sunrise_icon.src = icon_sunrise;
            day.sunrise_text.textContent = days[x].sunrise;
            day.sunrise_icon.classList.add('sunrise');
            day.sunrise_text.classList.add('sunrise');

            day.sunset_icon.src = icon_sunset;
            day.sunset_text.textContent = days[x].sunset;
            day.sunset_icon.classList.add('sunset');
            day.sunset_text.classList.add('sunset');

            for (const key in day) {
                if (Object.prototype.hasOwnProperty.call(day, key)) {
                    day[key].setAttribute('d_element', 'day');
                }
            }

            day.container.append(
                day.day_name,
                day.conditions,
                day.temp,
                day.precip_icon,
                day.precip_text,
                day.precip_title,
                day.fullDate,
                day.conditions_text,
                day.sunrise_icon,
                day.sunrise_text,
                day.sunset_icon,
                day.sunset_text
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

    const ToggleDay = (_day = 'all') => {
        Fade('week', 'out');
        const days = document.querySelectorAll('#day-container');
        setTimeout(() => {
            if (_day === 'all') {
                days.forEach((day) => {
                    day.classList.remove('active');
                    day.style.display = 'grid';
                });
            } else {
                _day.classList.add('active');
                days.forEach((day) => {
                    day.style.display = 'none';
                });
                _day.style.display = 'grid';
            }
            Fade('week', 'in');
        }, 300);
    };

    return {
        Set,
        Clear,
        Fade,
        ConvertTemp,
        ToggleDay
    };
})();
