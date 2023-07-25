// DONT TOUCH THIS CODE ITS SO HARD TO READ D:

function getData() {  // gets data and returns it as a promise whatever that is
    return fetch("https://blob2763.github.io/utils/tools.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

function populateToolList() {  // makes the data not a promise and populates the list in the function below
    getData()
        .then((data) => {
            data = data[0]
            populateList(data);
        })
        .catch((error) => {
            console.error('Error fetching tools JSON:', error);
        });

}

function populateList(tools) {
    let content = "";

    for (category in tools) {
        content = content.concat("<h3>", category, "</h3>\n")
        content = content.concat("<ul>\n")

        console.log(tools[category])
        for (tool in tools[category]) {
            content = content.concat('<li><a href="tools/conversions/', tools[category][tool], '">', tool, '</a></li>\n')
        }

        content = content.concat("</ul>")
        content.concat("\n")
    }

    console.log(content);

    document.getElementById("tools").innerHTML = content
}