function testJSON() {
    fetch('https://utils.is-a.dev/tools.json')
        .then((response) => response.json())
        .then((json) => console.log(json));
}
