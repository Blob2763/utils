const data = {
    "TEMPERATURE": {
        "heading": "TEMPERATURE",
        "category": "CONVERSIONS",
        "dropdown": [
            {"value": "celcius", "label": "°C",},
            {"value": "farenheit", "label": "°F",},
            {"value": "kelvin", "label": "K",},
        ]
    },
    "DISTANCE": {
        "heading": "LENGTH",
        "category": "CONVERSIONS",
        "dropdown": [
            {"value": "kilometer", "label": "km",},
            {"value": "meter", "label": "m",},
            {"value": "centimeter", "label": "cm",},
            {"value": "millimeter", "label": "mm",},
            {"value": "mile", "label": "mi",},
            {"value": "yard", "label": "yd",},
            {"value": "foot", "label": "ft",},
            {"value": "inch", "label": "in",},
        ]
    },
};

function dropdown(type, tool) {
    const toolData = data[tool];

    let dropdown = "";
    let cutOff = 0;
    if (type === "a") {
        cutOff = 0
    } else if (type === "b") {
        cutOff = 1
    }

    const options = toolData["dropdown"];
    for (option in options) {
        const optionData = options[option];

        let selected = "";
        if (option == cutOff) {
            selected = " selected";
        }

        dropdown = dropdown.concat(`<option value="${optionData["value"]}"${selected}>${optionData["label"]}</option>\n`)
        console.log(`<option value="${optionData["value"]}"${selected}>${optionData["label"]}</option>\n`);
    }

    return dropdown
}

function populateConversionSite(tool) {
    const toolData = data[tool];

    let heading = `<span id="utils-header">${toolData["heading"]}</span> ${toolData["category"]}`;

    document.getElementById("heading").innerHTML = heading
    document.getElementById("units-a").innerHTML = dropdown("a", tool)
    document.getElementById("units-b").innerHTML = dropdown("b", tool)
}