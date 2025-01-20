import * as DOM from './dom';

const params = new URLSearchParams({
    unitGroup: 'uk',
    // eslint-disable-next-line no-undef
    key: process.env.API_KEY,
    contentType: 'json'
});

export async function getWeather(location) {
    try {
        // eslint-disable-next-line no-undef
        let url = `${process.env.API_URL}${location}?${params}`;
        const response = await fetch(url, {
            mode: 'cors'
        });

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
            days: days.slice(1, 7).map(({ datetime, icon, temp, precip }) => ({
                day: getDayName(datetime).slice(0, 3),
                icon,
                temp: temp + '°',
                precip: precip + '%'
            }))
        };

        // Display Data in Output Container
        DOM.Output.Fade(() => {
            DOM.Output.Set(data);
        });
    } catch (error) {
        console.error(error);
    }
}

const getLocalTime = (timezone) => {
    const date = new Date();

    const options = {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit'
    };

    const formatter = new Intl.DateTimeFormat('default', options);
    const localTime = formatter.format(date);

    return localTime;
};

const getDayName = (date) => {
    const _date = new Date(date);
    return _date.toLocaleDateString('default', { weekday: 'long' });
};
