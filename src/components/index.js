import '../styles/styles.css';
import { getWeather } from './api';
import * as DOM from './dom';

const form = document.querySelector('#input-container');
const input = document.querySelector('#location');

input.addEventListener('focus', () => {
    form.classList.add('focused');
});

input.addEventListener('blur', () => {
    form.classList.remove('focused');
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let location = input.value;
    input.value = '';
    input.blur();
    if (/^[A-Za-z\s]+$/.test(location)) {
        location = encodeURIComponent(location.toLowerCase());
        getWeather(location);
    } else {
        DOM.Output.Set('Enter Valid Location');
    }
});

getWeather('new york');
