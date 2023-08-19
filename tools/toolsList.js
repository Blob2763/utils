function needsDotHTML() {
    const onSite = window.location.origin.startsWith('https://utils.is-a.dev')
    const on127 = window.location.origin.startsWith('http://127.0.0.1')

    return !(onSite || on127)
}

function getJSON() {
    console.log(fetch('../tools.json').then((response) => response.json()))
    return fetch('../tools.json')
        .then((response) => response.json());
}

function generateList(filter) {
    if (filter === "") {
        document.getElementById("search-results").style.display = "none"
        document.getElementById("all-tools").style.display = "inline"
    } else {
        document.getElementById("search-results").style.display = "inline"
        document.getElementById("all-tools").style.display = "none"

        getJSON()
            .then((toolsJSON) => {
                toolsJSON = toolsJSON[0]
                console.log(toolsJSON);

                let nameList = [];

                for (cat in toolsJSON) {
                    console.log("the category is", cat);

                    let categoryData = toolsJSON[cat];

                    for (tool in categoryData) {
                        if (tool.includes(filter.toUpperCase())) {
                            nameList.push({"tool": tool, "link": categoryData[tool], "category": cat});
                        }
                    }
                }

                console.log(nameList);

                let content = ""
                for (toolData in nameList) {
                    console.log("tooldata", nameList[toolData]);

                    const tool = nameList[toolData]["tool"];
                    const link = nameList[toolData]["link"];
                    const cat = nameList[toolData]["category"];

                    console.log(tool, link, cat);

                    const ending = needsDotHTML() ? ".html" : "";

                    content = content.concat(`<li><a href="../tools/${cat.toLowerCase()}/${link}${ending}">${tool} - ${cat}</a></li>`)
                }

                console.log(content);

                if (content === "") {
                    content = "NO TOOLS FOUND"
                }

                document.getElementById("results-list").innerHTML = content
            })

            .catch((error) => {
                console.error('Error fetching tools JSON:', error);
            });
    }
}