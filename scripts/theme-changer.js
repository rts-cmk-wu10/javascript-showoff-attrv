const toggleButton = document.getElementById("toggleButton");
const bodyElement = document.body;
const headerElement = document.querySelector('header');

let isDark = localStorage.getItem('isDark') === 'true';
if (isDark) {
    bodyElement.classList.add('dark-mode');
    headerElement.classList.add('dark-mode');
}

toggleButton.addEventListener("click", function () {
    if (isDark) {
        bodyElement.classList.remove('dark-mode');
        headerElement.classList.remove('dark-mode');
    } else {
        bodyElement.classList.add('dark-mode');
        headerElement.classList.add('dark-mode');
    }
    isDark = !isDark;
    localStorage.setItem('isDark', isDark);
});