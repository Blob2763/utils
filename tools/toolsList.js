function getJSON() {
    return fetch('https://blob2763.github.io/utils/tools.json')
        .then((response) => response.json());
}

function generateList() {
    getJSON()
        .then((toolsJSON) => {
            toolsJSON = toolsJSON[0]
            console.log(toolsJSON);

            let nameList = [];

            for (category in toolsJSON) {
                console.log(category);

                let categoryData = toolsJSON[category];

                for (tool in categoryData) {
                    nameList.push(tool);
                }
            }

            console.log(nameList);
        })

        .catch((error) => {
            console.error('Error fetching tools JSON:', error);
        });
}