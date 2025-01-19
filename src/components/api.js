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
        const {
            currentConditions: { conditions, temp, icon, sunrise, sunset }
        } = await response.json();

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
            sunset: sunset.substring(0, 5)
        };

        // Display Data in Output Container
        DOM.Output.Fade(() => {
            DOM.Output.Set(data);
        });
    } catch (error) {
        console.error(error);
    }
}
