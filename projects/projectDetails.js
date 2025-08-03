import { projects } from './projectsData.js';

const projectDetailsContainerElem = document.querySelector(".project-details-container");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const project = projects.find(p => p.id == id); // Use == if ID is a number in URL but string in data
console.log(project.gitHubRepo);

function createIcons(iconsArray) {
    if (!iconsArray) return '';
    return iconsArray.map(element => `
        <div title = ${element.name} class="icon" style="margin:5px;">
            <img src="${element.url}" alt="${element.name}">
        </div>
    `).join('');
}

function createSkillList() {
    if (!project.skills) return '';
    return project.skills.map(skill => `<li>${skill}</li>`).join('');
}

function createProjectDetails() {
    return `
        <div class="project-img-box">
            <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-info">
            <h1>${project.title}</h1>
            <p class="desc">${project.description}</p>
            <div class="project-meta">
                <div class="meta-block">
                    <h3>Framework</h3>
                    <div class="icons-container">
                        ${createIcons(project.frameWorkIcons)}
                    </div>
                </div>
                <div class="meta-block">
                    <h3>Built With</h3>
                    <div class="icons-container">
                        ${createIcons(project.builtWithIcons)}
                    </div>
                </div>
                <div class="meta-block">
                    <h3>Skills Demonstrated</h3>
                    <ul>${createSkillList()}</ul>
                </div>
                <div class="meta-block">
                    <h3>Git Hub Repo</h3>
                    <a target="_blank" href=${project.gitHubRepo}>${(project.gitHubRepo == "") ? "Not done yet" : project.title}</a>
                </div>
            </div>
        </div>
    `;
}

projectDetailsContainerElem.innerHTML = createProjectDetails();