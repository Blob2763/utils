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

    const r = rgb["r"];
    const g = rgb["g"];
    const b = rgb["b"];

    rgb["r"] = Math.round(r * multiplier[0])
    rgb["g"] = Math.round(g * multiplier[1])
    rgb["b"] = Math.round(b * multiplier[2])

    return rgbToHex(rgb)
}

function brightenHex(hex, multiplier) {
    let rgb = hexToRgb(hex);

    const r = rgb["r"];
    const g = rgb["g"];
    const b = rgb["b"];

    const isPositive = [
        multiplier[0] >= 0, 
        multiplier[1] >= 0, 
        multiplier[2] >= 0
    ];

    const difference = [
        isPositive[0] ? 255 - r : r, 
        isPositive[1] ? 255 - g : g, 
        isPositive[2] ? 255 - b : b
    ];

    multiplier[0] -= isPositive[0] ? 0 : 1
    multiplier[0] -= isPositive[0] ? 0 : 1
    multiplier[0] -= isPositive[0] ? 0 : 1

    rgb["r"] = Math.round(r + (multiplier[0] * difference[0]))
    rgb["g"] = Math.round(g + (multiplier[1] * difference[1]))
    rgb["b"] = Math.round(b + (multiplier[2] * difference[2]))

    return rgbToHex(rgb)
}

const primaryToSecondary = [-0.7, -0.7, -0.7];
const primaryToAccent = [0.5, 0.5, 0.5];

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
        const secondary = brightenHex(primary, primaryToSecondary);
        const accent = brightenHex(primary, primaryToAccent);

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
