import * as DOM from './dom';

const params = new URLSearchParams({
    unitGroup: 'uk',
    key: process.env.API_KEY,
    contentType: 'json'
});

export async function getWeather(location) {
    try {
        let url = `${process.env.API_URL}${location}?${params}`;
        console.log(`URL STRING: ${url}`);
        const response = await fetch(url, {
            mode: 'cors'
        });
        const data = await response.json();
        console.log(data);
        DOM.Output.Set(data.currentConditions.conditions);
    } catch (error) {
        console.error(error);
    }
}
