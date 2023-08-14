function hexToRgb(hex) {
    hex = hex.replace("#", "");

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { "r": r, "g": g, "b": b }
}

function rgbToHex(rgb) {
    const r = rgb["r"];
    const g = rgb["g"];
    const b = rgb["b"];

    let hexValue = `${r.toString(16)}${g.toString(16)}${b.toString(16)}`.padStart(6, "0");
    hexValue = hexValue.slice(0, 6)

    return "#" + hexValue
}

function multiplyHex(hex, multiplier) {
    let rgb = hexToRgb(hex);

    rgb["r"] = Math.round(rgb["r"] * multiplier[0])
    rgb["g"] = Math.round(rgb["g"] * multiplier[1])
    rgb["b"] = Math.round(rgb["b"] * multiplier[2])

    return rgbToHex(rgb)
}

// --text: #fafafa;
// --background: #050505;
// --background-darker: #292929;
// --primary: #23CE6B; 2346603
// --secondary: #062d24; 404772
// --accent: #85ff66;
// --switch-bg: #374151;


// const primary = "eb4034";
// const primaryRGB = hexToRgb(primary);
// console.log(primaryRGB);

// const secondary = "062d24";
// const secondaryRGB = hexToRgb(secondary);
// console.log(secondaryRGB);

// const accent = "85ff66";
// const accentRGB = hexToRgb(accent);
// console.log(accentRGB);

// const primaryToSecondary = [
//     secondaryRGB["r"] / primaryRGB["r"],
//     secondaryRGB["g"] / primaryRGB["g"],
//     secondaryRGB["b"] / primaryRGB["b"],
// ]
// console.log(primaryToSecondary);

// const primaryToAccent = [
//     accentRGB["r"] / primaryRGB["r"],
//     accentRGB["g"] / primaryRGB["g"],
//     accentRGB["b"] / primaryRGB["b"],
// ]
// console.log(primaryToAccent);

const primaryToSecondary = [0.3255, 0.3031, 0.2923];
const primaryToAccent = [1.5659, 1.48437, 1.5615];

function saveColourScheme() {
    let settings = localStorage.getItem("settings");
    let theme = settings.split(",")[0];
    let colour = document.getElementById("inputColour").value;

    localStorage.setItem("settings", `${theme},${colour}`);

    changeColourScheme();
}

function changeColourScheme() {
    let settings = localStorage.getItem("settings");
    let colour = settings.split(",")[1];

    if (colour === "default") {
        document.documentElement.style.setProperty("--primary", "#23CE6B");
        document.documentElement.style.setProperty("--secondary", "#062d24");
        document.documentElement.style.setProperty("--accent", "#85ff66");

    } else {
        const primary = colour;
        const secondary = multiplyHex(primary, primaryToSecondary);
        const accent = multiplyHex(primary, primaryToAccent);

        console.log(primary, secondary, accent);

        document.documentElement.style.setProperty("--primary", primary);
        document.documentElement.style.setProperty("--secondary", secondary);
        document.documentElement.style.setProperty("--accent", accent);
    }
}

function resetColours() {
    document.documentElement.style.setProperty("--primary", "#23CE6B");
    document.documentElement.style.setProperty("--secondary", "#062d24");
    document.documentElement.style.setProperty("--accent", "#85ff66");

    let settings = localStorage.getItem("settings");
    let theme = settings.split(",")[0];

    localStorage.setItem('settings', `${theme},default`);
}

changeColourScheme();
