function populateNavbar() {
    const links = {
        "Home": "../index.html",
        "About": "../about",
        "Tools": "../tools",
        "Saved": "../saved",
        "Settings": "../settings",
    }

    let content = ""

    const keys = Object.keys(links);
    for (const key of keys) {
        const value = links[key];
        console.log(`${key}: ${value}`);

        content = content.concat('<a href="', value, '">', key, '</a>\n')
    }

    document.getElementById("sidenav").innerHTML = content
}
