function needsDotHTML() {
    const onSite = window.location.origin.startsWith('https://utils.is-a.dev')
    const on127 = window.location.origin.startsWith('http://127.0.0.1')

    return !(onSite || on127)
}

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
    const isSaved = (allData[tool] === "true");

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
    const notTools = ["settings", "rounding", "debug"];

    const saveData = getSaveData();
    let saved = [];

    for (tool in saveData) {
        if (!(notTools.includes(tool))) {
            if (checkSave(tool)) {
                saved.push(tool);
            }
        }
    }
    console.log("SAVED", saved);

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
        const firstToolJSON = toolsJSON[0];

        for (const cat in firstToolJSON) {
            if (tool in firstToolJSON[cat]) {
                console.warn("CATEGORY FOUND:", cat);
                content = cat;
            }
        }

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
    const allSaved = await getAllSaved();
    let toolsJSON = await getJSON();
    toolsJSON = toolsJSON[0]

    console.log("TOOLS", toolsJSON)

    for (tool of allSaved) {
        const name = tool.toUpperCase();

        let cat = await category(tool);

        console.log("NAME", name)
        console.log("CATEGORY", cat)
        console.log("TOOL", tool)

        const link = toolsJSON[cat][name];
        
        cat = cat.toLowerCase()
        cat = cat.concat("/")

        console.log("LINK", link)

        const ending = needsDotHTML() ? ".html" : "";

        if (tool === "LENGTH") {
            content = content.concat(`<li><a href="${linkStart(home)}conversions/distance${ending}">LENGTH</a></li>`)
        } else {
            content = content.concat(`<li><a href="${linkStart(home)}${cat}${link}${ending}">${name}</a></li>`)
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
