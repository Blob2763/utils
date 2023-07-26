function populateNavbar() {
    const links = {
        "Home": "/utils",
        "About": "/utils/about",
        "Tools": "/utils/tools",
        "Saved": "/utils/saved",
        "Settings": "/utils/settings",
    }

    let content = ""

    const keys = Object.keys(links);
    for (const key of keys) {
        const value = links[key];
        content = content.concat('<a href="', value, '">', key, '</a>\n')
    }

    var settings = localStorage.getItem('settings')
    if (settings == undefined || settings == NaN || settings == null) {
        localStorage.setItem('settings', '1,#23CE6B') // 1 = dark mode, 0 = light mode
        settings = localStorage.getItem('settings')
    }
    var mode = settings.split(',')[0]

    const styleSheet = document.createElement('link')
    styleSheet.rel = "stylesheet"
    styleSheet.href = mode == "1" ? '/utils/themes/dark.css' : '/utils/themes/light.css'
    styleSheet.id = "theme-style"

    const switcher = document.createElement('div');
    switcher.className = "darkSwitch"
    switcher.id = "darkSwitch"

    const icon = document.createElement('img');
    icon.src = getIcon(icon)
    icon.className = "darkSwitchIcon"

    switcher.addEventListener('click', function(e) {
        switchMode(icon);
    })

    document.getElementById("sidenav").innerHTML = content;
    document.body.appendChild(styleSheet)
    document.getElementById('sidenav').appendChild(switcher);
    switcher.appendChild(icon);
}

function switchMode(pic) {
    var settings = localStorage.getItem('settings')
    if (settings == undefined || settings == NaN || settings == null) {
        localStorage.setItem('settings', '1,#23CE6B') // 1 = dark mode, 0 = light mode
        settings = localStorage.getItem('settings')
    }
    var mode = settings.split(',')[0]
    var colour = settings.split(',')[1]

    localStorage.setItem('settings', mode == "1" ? 0 + "," + colour : 1 + "," + colour)
    pic.src = mode == "1" ? '../imgs/light.svg' : '../imgs/dark.svg'
    document.getElementById('theme-style').setAttribute('href', mode == "1" ? '../themes/light.css' : '../themes/dark.css')
}

function getIcon(pic) {
    var settings = localStorage.getItem('settings')
    if (settings == undefined || settings == NaN || settings == null) {
        localStorage.setItem('settings', '1,#23CE6B') // 1 = dark mode, 0 = light mode
        settings = localStorage.getItem('settings')
    }
    var mode = settings.split(',')[0]
    var colour = settings.split(',')[1]

    return mode == "1" ? '../imgs/dark.svg' : '../imgs/light.svg'
}
