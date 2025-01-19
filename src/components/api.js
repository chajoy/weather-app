import * as DOM from './dom';

const params = new URLSearchParams({
    unitGroup: 'uk',
    key: process.env.API_KEY,
    contentType: 'json'
});

export async function getWeather(location) {
    try {
        let url = `${process.env.API_URL}${location}?${params}`;
        const response = await fetch(url, {
            mode: 'cors'
        });

        //debug
        const _data = await response.json();

        // console.log(_data);

        const {
            currentConditions: { conditions, temp, icon, sunrise, sunset },
            timezone
        } = _data;

        // Parse and Decode Location URI
        location = decodeURIComponent(location)
            .toLowerCase()
            .split(' ')
            .map((word) => word[0].toUpperCase() + word.substring(1))
            .join(' ');

        const data = {
            location,
            conditions,
            temp,
            icon,
            sunrise: sunrise.substring(0, 5),
            sunset: sunset.substring(0, 5),
            timezone,
            localTime: getLocalTime(timezone)
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
