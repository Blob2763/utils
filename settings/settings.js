const colorScheme = document.getElementById('colorSchemeModal');
const colorSchemeText = document.getElementById('colorSchemeText');

const darkModeCheckbox = document.getElementById('darkModeCheck');
const darkModeInput = document.getElementById('inputColour');

if (localStorage.getItem('settings') == undefined || localStorage.getItem('settings') == null) {
    localStorage.setItem('settings', '1,#23CE6B')
}

var settings = localStorage.getItem('settings')
var darkMode = parseInt(settings.split(',')[0])
var mainColour = settings.split(',')[1]

darkModeInput.value = mainColour;
darkModeCheckbox.checked = darkMode == 1 ? true : false;

colorSchemeText.addEventListener('click', function () {
    colorScheme.showModal();
})

darkModeCheckbox.addEventListener('click', function (e) {
    darkMode = darkMode == 1 ? 0 : 1;
    localStorage.setItem('settings', darkMode + ',' + mainColour);
    settings = localStorage.getItem('settings')
})

darkModeInput.addEventListener('change', function (e) {
    console.log(darkModeInput.value)
    mainColour = darkModeInput.value.length == 7 ? darkModeInput.value : mainColour;
    localStorage.setItem('settings', darkMode + ',' + mainColour)
    settings = localStorage.getItem('settings')
})