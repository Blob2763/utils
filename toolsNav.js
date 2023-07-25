function populateNavbar() {
    const links = {
        "Home": "index.html",
        "About": "about.html",
        "Tools": "tools.html",
        "Saved": "saved.html",
        "Settings": "settings.html",
    }

    let content = ""

    const keys = Object.keys(links);
    for (const key of keys) {
        const value = links[key];
        console.log(`${key}: ${value}`);

        content = content.concat('<a href="../../', value, '">', key, '</a>\n')
    }

    document.getElementById("sidenav").innerHTML = content
}