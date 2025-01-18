export const Output = (() => {
    const output = document.querySelector('#output-container');

    const Set = (text) => {
        output.textContent = text;
    };

    const Clear = () => {
        output.textContent = '';
    };

    return {
        Set,
        Clear
    };
})();
