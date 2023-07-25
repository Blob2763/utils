function getJSON() {
    return fetch('https://blob2763.github.io/utils/tools.json')
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

                for (category in toolsJSON) {
                    console.log("the category is", category);

                    let categoryData = toolsJSON[category];

                    for (tool in categoryData) {
                        if (tool.includes(filter.toUpperCase())) {
                            nameList.push({"tool": tool, "link": categoryData[tool], "category": category});
                        }
                    }
                }

                console.log(nameList);

                let content = ""
                for (toolData in nameList) {
                    console.log(toolData);

                    const tool = nameList[toolData]["tool"];
                    const link = nameList[toolData]["link"];

                    console.log(tool, link);

                    content = content.concat(`<li><a href="../tools/${category.toLowerCase()}/${link}">${tool} - ${category}</a></li>`)
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