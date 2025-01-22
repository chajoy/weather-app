import * as DOM from './dom';

export async function getWeather(location, unitGroup) {
    const params = new URLSearchParams({
        unitGroup: unitGroup,
        // eslint-disable-next-line no-undef
        key: process.env.API_KEY,
        contentType: 'json'
    });

    DOM.Output.Fade('output', 'out');
    DOM.Output.Set('status', 'loading...');
    DOM.Output.Fade('status', 'in');

    try {
        // eslint-disable-next-line no-undef
        let url = `${process.env.API_URL}${location}?${params}`;
        const response = await fetch(url, {
            mode: 'cors'
        });

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }

        const {
            resolvedAddress,
            currentConditions: { conditions, temp, icon, sunrise, sunset },
            timezone,
            days
        } = await response.json();

        // Parse and Decode Location URI
        location = decodeURIComponent(location)
            .toLowerCase()
            .split(' ')
            .map((word) => word[0].toUpperCase() + word.substring(1))
            .join(' ');

        const data = {
            country: resolvedAddress
                .slice(resolvedAddress.lastIndexOf(',') + 1)
                .trim(),
            location: resolvedAddress.slice(
                0,
                resolvedAddress.indexOf(',') !== -1
                    ? resolvedAddress.indexOf(',')
                    : resolvedAddress.length
            ),
            conditions,
            temp,
            icon,
            sunrise: sunrise.substring(0, 5),
            sunset: sunset.substring(0, 5),
            timezone,
            localTime: getLocalTime(timezone),
            days: days
                .slice(1, 7)
                .map(
                    ({
                        datetime,
                        icon,
                        temp,
                        precip,
                        sunrise,
                        sunset,
                        conditions
                    }) => ({
                        day: getDayName(datetime).slice(0, 3),
                        fullDate: getFullDate(datetime),
                        icon,
                        temp: Math.floor(temp) + '°',
                        precip: Math.floor(precip) + '%',
                        conditions,
                        sunrise,
                        sunset
                    })
                )
        };

        DOM.Output.Fade('status', 'out');
        DOM.Output.Clear('status');
        setTimeout(() => {
            DOM.Output.Set('output', data);
            DOM.Output.Fade('output', 'in');
        }, 500);
    } catch (error) {
        console.error(error);
        DOM.Output.Set('status', 'error');
        DOM.Output.Fade('status', 'in');
    }
}

const getLocalTime = (timezone) => {
    const date = new Date();

    const options = {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit'
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(date);
};

const getDayName = (date) => {
    const _date = new Date(date);
    return _date.toLocaleDateString('en-US', { weekday: 'long' });
};

const getFullDate = (date) => {
    const _date = new Date(date);

    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(_date);
};
