import '../styles/main.scss';
import { getWeather } from './api';
import * as DOM from './dom';

let unitGroup = 'uk';

const form = document.querySelector('#input-container');
const input = document.querySelector('#location');

// unit toggle
const unitToggle = document.querySelector('#unitToggle');
const circle = document.querySelector('#unitToggle #circle');

unitToggle.addEventListener('click', () => {
    circle.classList.toggle('clicked');
    unitToggle.classList.toggle('clicked');
    switchUnit();
});

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
        getWeather(location, unitGroup);
    } else {
        DOM.Output.Set('Enter Valid Location');
    }
});

function switchUnit() {
    if (unitGroup === 'us') {
        unitGroup = 'uk';
        DOM.Output.ConvertTemp('c');
    } else {
        unitGroup = 'us';
        DOM.Output.ConvertTemp('f');
    }
}

getWeather('new york', unitGroup);
