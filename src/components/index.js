import '../styles/styles.css';
import { getWeather } from './api';
import * as DOM from './dom';

const input = document.querySelector('#location');
const btn_sub_input = document.querySelector('#btn-sub-location');

btn_sub_input.addEventListener('click', async () => {
    let location = input.value;
    if (/^[A-Za-z\s]+$/.test(location)) {
        location = location.toLowerCase();
        location = location
            .split('')
            .map((char) => (char === ' ' ? (char = '%20') : char))
            .join('');
        getWeather(location);
    } else {
        DOM.Output.Set('Enter Valid Location');
    }
});
