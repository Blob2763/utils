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
    "TIME": {
        "heading": "TIME",
        "category": "CONVERSIONS",
        "dropdown": [
            {"value": "millisecond", "label": "ms",},
            {"value": "second", "label": "s",},
            {"value": "minute", "label": "m",},
            {"value": "hour", "label": "h",},
            {"value": "day", "label": "d",},
            {"value": "week", "label": "wk",},
            {"value": "month", "label": "mo",},
            {"value": "year", "label": "y",},
        ]
    },
    "AREA": {
        "heading": "AREA",
        "category": "CONVERSIONS",
        "dropdown": [
            {"value": "square kilometer", "label": "km²",},
            {"value": "square meter", "label": "m²",},
            {"value": "square centimeter", "label": "cm²",},
            {"value": "square mile", "label": "mi²",},
            {"value": "square yard", "label": "yd²",},
            {"value": "square foot", "label": "ft²",},
            {"value": "square inch", "label": "in²",},
            {"value": "hectare", "label": "ha",},
            {"value": "acre", "label": "ac",},
        ]
    },
    "STORAGE": {
        "heading": "STORAGE",
        "category": "CONVERSIONS",
        "dropdown": [
            {"value": "bit", "label": "b",},
            {"value": "byte", "label": "B",},
            {"value": "kilobyte", "label": "KB",},
            {"value": "megabyte", "label": "MB",},
            {"value": "gigabyte", "label": "GB",},
            {"value": "terabyte", "label": "TB",},
            {"value": "petabyte", "label": "PB",},
        ]
    },
    "BASE": {
        "heading": "BASE",
        "category": "CONVERSIONS",
        "dropdown": "no dropdown"
    },
};

function dropdown(type, tool) {
    const toolData = data[tool];
    const options = toolData["dropdown"];

    let dropdown = "";
    let cutOff = 0;
    if (type === "a") {
        cutOff = 0
    } else if (type === "b") {
        cutOff = 1
    }

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

    const dropdownOptions = toolData["dropdown"];
    if (dropdownOptions !== "no dropdown") {
        document.getElementById("units-a").innerHTML = dropdown("a", tool)
        document.getElementById("units-b").innerHTML = dropdown("b", tool)
    }
}