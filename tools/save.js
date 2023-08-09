function getJSON() {
    console.log(fetch('/tools.json').then((response) => response.json()))
    return fetch('/tools.json')
        .then((response) => response.json());
}

function getSaveData() {
    return { ...localStorage }
}

function checkSave(tool) {
    const allData = getSaveData();

    console.log("data", allData);

    const isSaved = (allData[tool] === "true");

    console.log(isSaved);

    if (isSaved) {
        console.log(`${tool} is saved`)
    } else {
        console.log(`${tool} is not saved`)
    }

    localStorage.setItem(tool, isSaved);

    return isSaved
}

function displaySave(tool) {
    let content = "";
    if (checkSave(tool)) {
        content = '<span class="material-symbols-outlined saved">bookmark</span>'
    } else {
        content = '<span class="material-symbols-outlined not-saved">bookmark</span>'
    }

    document.getElementById("save").innerHTML = content
}

function save(tool) {
    localStorage.setItem(tool, (!checkSave(tool)));

    displaySave(tool);
}

function getAllSaved() {
    const saveData = getSaveData();
    let saved = [];

    for (tool in saveData) {
        if (tool !== "settings") {
            if (checkSave(tool)) {
                saved.push(tool);
            }
        }
    }
    console.log(saved);

    return saved
}

function linkStart(home) {
    if (home) {
        return "tools/"
    } else {
        return "../tools/"
    }
}

async function category(tool) {
    tool = tool.toUpperCase();
    let content = "";

    try {
        const toolsJSON = await getJSON();

        console.log("TOOLSJSON", toolsJSON);

        const firstToolJSON = toolsJSON[0];
        console.log("FIRST TOOLSJSON", firstToolJSON);

        for (const cat in firstToolJSON) {
            if (tool in firstToolJSON[cat]) {
                console.warn("CATEGORY FOUND:", cat);
                content = cat;
            }
        }

        content = content.concat("/");
        console.log("CONTENT", content);

        return content;

    } catch (error) {
        content = "error";
        console.error('Error fetching tools JSON:', error);

        return content;
    }
}


async function displayAllSaved(home) {
    let content = "";
    const allSaved = getAllSaved();

    for (tool of allSaved) {
        const name = tool.toUpperCase();

        let cat = await category(tool);
        cat = cat.toLowerCase()

        console.log("NAME", name)
        console.log("CATEGORY", cat)

        if (tool === "DISTANCE" || tool === "LENGTH") {
            content = content.concat(`<li><a href="${linkStart(home)}conversions/distance.html">LENGTH</a></li>`)
        } else {
            content = content.concat(`<li><a href="${linkStart(home)}${cat}${tool.toLowerCase()}.html">${name}</a></li>`)
        }
    }

    console.log(content);

    if (content === "") {
        content = "<li>Click the bookmark on a tool to save it</li>"
    }

    document.getElementById("all-saved").innerHTML = content
}

function clearAll() {
    const content = document.getElementById("delete-all").innerHTML
    if (content === "CLEAR ALL DATA") {
        document.getElementById("delete-all").innerHTML = "ARE YOU SURE?"
    } else {
        localStorage.clear()
        document.getElementById("delete-all").innerHTML = "CLEARED"
    }
}
