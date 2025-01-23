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
    const DOMelements = {
        container: document.querySelector('#output-container'),
        country: document.querySelector('#output-container #country'),
        location: document.querySelector('#output-container h1'),
        conditions: document.querySelector('#output-container #conditions'),
        icon: document.querySelector('#output-container img'),
        sunrise_time: document.querySelector('#sunrise_time'),
        sunset_time: document.querySelector('#sunset_time'),
        temp: document.querySelector('#output-container .temperature p'),
        localeTime: document.querySelector('#output-container #localTime'),
        week: document.querySelector('#week'),
        status_msg: document.querySelector('#status-msg')
    };

    const elements = {
        status: DOMelements.status_msg,
        output: DOMelements.container,
        week: DOMelements.week
    };

    const Set = (object, data) => {
        if (object === 'status' && typeof data === 'string') {
            DOMelements.status_msg.textContent = data;
        } else if (object === 'output' && typeof data === 'object') {
            DOMelements.container.style.display = 'grid';
            DOMelements.country.textContent = data.country;
            DOMelements.location.textContent = data.location;
            DOMelements.conditions.textContent = data.conditions;
            DOMelements.sunrise_time.textContent = data.sunrise;
            DOMelements.sunset_time.textContent = data.sunset;
            DOMelements.temp.textContent = `${Math.floor(data.temp)}°`;
            DOMelements.icon.src = iconMap[data.icon];
            DOMelements.localeTime.textContent = data.localTime;
            BuildWeekForecast(data.days);
        } else {
            DOMelements.status_msg.textContent = 'error';
            console.error('data invalid type');
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
        while (DOMelements.week.firstChild) {
            DOMelements.week.firstChild.remove();
        }
        const fragment = document.createDocumentFragment();
        for (let x = 0; x <= 5; x++) {
            const day_container = document.createElement('div');

            day_container.classList.add('day');
            day_container.setAttribute('id', 'day-container');
            day_container.setAttribute('d_element', 'day');

            day_container.append(
                CreateElement('h1', 'day_name', null, days[x].day),
                CreateElement('img', 'conditions', iconMap[days[x].icon]),
                CreateElement(
                    'p',
                    'temp',
                    null,
                    days[x].temp,
                    'id',
                    'week_temp'
                ),
                CreateElement('img', 'precipitation', icon_precip),
                CreateElement('p', 'precipitation', null, days[x].precip),
                CreateElement('h2', 'precipitation', null, 'Precipitation:'),
                CreateElement('h2', 'fullDate', null, days[x].fullDate),
                CreateElement('img', 'sunset', icon_sunset),
                CreateElement('img', 'sunrise', icon_sunrise),
                CreateElement('p', 'conditions', null, days[x].conditions),
                CreateElement('p', 'sunrise', null, days[x].sunrise),
                CreateElement('p', 'sunset', null, days[x].sunset)
            );

            fragment.appendChild(day_container);
        }
        DOMelements.week.appendChild(fragment);
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

    const CreateElement = (
        type,
        className,
        icon_src,
        textContent,
        attributeID,
        attribute
    ) => {
        const elementType = ['img', 'p', 'h1', 'h2'];

        if (!elementType.includes(type)) {
            console.error(`[CreateElement] Invalid Type: ${type}`);
            return null;
        }

        let element = document.createElement(type);

        type === 'img' && icon_src
            ? (element.src = icon_src)
            : (element.textContent = textContent);

        if (attributeID) {
            element.setAttribute(attributeID, attribute);
        }

        if (className) {
            element.classList.add(className);
        }

        element.setAttribute('d_element', 'day');

        return element;
    };

    return {
        Set,
        Clear,
        Fade,
        ConvertTemp,
        ToggleDay
    };
})();
