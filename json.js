function testJSON() {
    fetch('https://blob2763.github.io/utils/tools.json')
        .then((response) => response.json())
        .then((json) => console.log(json));
}
