let mainContainer = document.querySelector("#portfolio-container");
let classHeaderContainer = document.querySelector("#class-header");
let getStartedMsg = document.querySelector("#get-started");
let img = document.getElementById("home-image");

function loadData(inClass) {

    let request = new XMLHttpRequest();

    request.open("GET", "js/spa-data.json", true);

    request.onreadystatechange = function() {

        if (request.readyState == 4 && request.status == 200) {

            classHeaderContainer.innerHTML = "";
            getStartedMsg.style.display = 'none';
            img.style.display = "none";

            let classHeader = document.createElement("h1");
                classHeader.innerHTML = "Animal:" + " " + inClass;
                classHeaderContainer.appendChild(classHeader);

            mainContainer.innerHTML = "";

            //returns JSON array containing all objects
            let data = JSON.parse(this.responseText);

            const dataParse = data.data;

            for (let i = 0; i < dataParse.length; i++) {
                const project = dataParse[i];
                
                console.log(project);

                if (project.class == inClass) {
                    //create div for each project
                    let projectContainer = document.createElement("div");
                    projectContainer.className = "project-container";
                    //create img element that pulls pathname from json
                    let projectIMG = document.createElement("img");
                    projectIMG.setAttribute("src", project.img);
                    projectIMG.className = "project-img";
                    projectContainer.appendChild(projectIMG);
                    //create animal name h3 element
                    let animalName = document.createElement("h3");
                    animalName.className = "project-name";
                    animalName.innerHTML = project.animalName;
                    projectContainer.appendChild(animalName);
                    mainContainer.appendChild(projectContainer);
                }
                
            }
        }
    }

    request.send();
}

const returnToHome = () => {
    mainContainer.innerHTML = "";
    classHeaderContainer.innerHTML = "";
    getStartedMsg.style.display = "block";
    img.style.display = "block";
}



document.getElementById("cats").addEventListener('click', function() {
    loadData("Cats");
});

document.getElementById("dogs").addEventListener('click', function() {
    loadData("Dogs");
});

document.getElementById("birds").addEventListener('click', function() {
    loadData("Birds");
});
document.getElementById("fish").addEventListener('click', function() {
    loadData("Fish");
});

document.getElementById("home").addEventListener('click', returnToHome);





