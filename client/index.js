const serverAddress = "http://localhost:3000";

const createCard = (user) => {
    let temp = document.createElement("div");
    temp.id = `div-${user.id}`;
    temp.setAttribute("data-card-id", user.id);
    temp.className = "card-slides m-2 p-10 relative";
    temp.innerHTML = `<div class="card-image p-1 ">
        <img class="image-fit" src=${
            user.gender === "male"
                ? "./placeholder/male-images.png"
                : "./placeholder/female-profile.png"
        } alt="">
    </div>
    <div class="card-body">
    <div class="name f-1 fw-600 p-10">ID: ${user.id}</div>
        <div class="name f-1 fw-600 p-10">Name: ${user.name}</div>
        <div class="id p-10">Employee-ID: ${user.emp_id}</div>
        <div class="skills p-10">Skills: ${user.skills}</div>
        <div class="project p-10">Project: ${user.project}</div>
        <div class="hcm p-10">HCM: ${user.hcm}</div>
    </div>
    <div class="card-buttons text-center m-2">
        <button id="" class="card-action-button save-edit-button btn-primary">
            Edit
        </button>
        <button id="" class="card-action-button card-cancel-button btn-danger">
            Cancel
        </button>
    </div>
    <div class="close absolute">
        <button class="close-button card-action-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
        </button>
    </div>`;
    return temp;
};

const createList = (user) => {
    let temp = document.createElement("tr");
    temp.id = `list-${user.id}`;
    temp.setAttribute("data-list-id", user.id);
    temp.className = "table-row";
    temp.innerHTML = `<td>${user.id}</td>
    <td>${user.name}</td>
    <td>${user.emp_id}</td>
    <td class="skills">
        <span class="display-inline-block">${user.skills}</span>
    </td>
    <td>${user.project}</td>
    <td>${user.hcm}</td>
    <td class="table-list-buttons">
        <button class="list-buttons edit-button display-inline-block p-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
            </svg>
        </button>
        <button class="list-buttons close-button p-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
        </button>
    </td>`;
    return temp;
};

const handleFetch = (location, { method = "GET", onSuccess, data = {} }) => {
    fetch(serverAddress + location, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Accept-Type": "application/json",
        },
        ...(method !== "GET" && { body: JSON.stringify(data) }),
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            onSuccess(data);
        })
        .catch((err) => {
            console.log(err);
        });
};

const temporary = () => {
    handleFetch("/", {
        onSuccess: (data) => {
            const gridView = document.getElementById("cards-section");
            const listView = document.querySelector("#list-section table");
            data.forEach((element) => {
                gridView.appendChild(createCard(element));
                listView.appendChild(createList(element));
            });
            const listButtons = [...document.querySelectorAll(".list-buttons")];
            listButtons.forEach((element) => {
                element.addEventListener("click", (e) => {
                    handleListButtons(e, element);
                });
            });
            const cardButtons = [
                ...document.querySelectorAll(".card-action-button"),
            ];
            cardButtons.forEach((element) => {
                element.addEventListener("click", (e) => {
                    handleCardButtons(e, element);
                });
            });
        },
    });
};
temporary();
/**
 * For toggling the grid and list icon
 */
const visible = (element) => {
    element.classList.remove("display-none");
    element.classList.add("display-inline-block");
};
const invisible = (element) => {
    element.classList.remove("display-inline-block");
    element.classList.add("display-none");
};
document.getElementById("toggle-button").addEventListener("click", (e) => {
    let gridIcon = document.getElementById("grid-icon");
    let listIcon = document.getElementById("list-icon");
    let gridSection = document.getElementById("cards-section");
    let listSection = document.getElementById("list-section");
    if (gridIcon.classList.contains("display-none")) {
        visible(gridIcon);
        visible(gridSection);

        invisible(listIcon);
        invisible(listSection);
    } else {
        visible(listIcon);
        visible(listSection);

        invisible(gridIcon);
        invisible(gridSection);
    }
});

let previousData;
const handleListButtons = (e, element) => {
    let id = Number(e.path[2].getAttribute("data-list-id"));
    let skillColumn = document
        .getElementById(`list-${id}`)
        .querySelector(".skills");
    let cardSkills = document
        .getElementById(`div-${id}`)
        .querySelector(".skills");
    if (element.classList.contains("edit-button")) {
        element.classList.remove("edit-button");
        element.classList.add("save-button");
        element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-save" viewBox="0 0 16 16"> <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" /> </svg>`;
        previousData = skillColumn.innerHTML;
        skillColumn.innerHTML = `<input type="text" id="skills-info-${id}" class="skills" name="skills"></input>`;
    } else if (element.classList.contains("save-button")) {
        element.classList.remove("save-button");
        element.classList.add("edit-button");
        element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"> <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" /> <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" /> </svg>`;
        let newSkill = document.getElementById(`skills-info-${id}`);
        if (newSkill.value !== "") {
            handleFetch("/" + id, {
                method: "PATCH",
                onSuccess: (data) => {
                    skillColumn.innerHTML = newSkill.value;
                    cardSkills.innerHTML = `Skills: ${newSkill.value}`;
                },
                data: { skills: newSkill.value },
            });
        } else {
            skillColumn.innerHTML = previousData;
        }
    } else {
        handleFetch("/", {
            onSuccess: (data) => {
                skillColumn.innerHTML = data[id - 1].skills;
            },
        });
        let index;
        for (let i = 0; i < e.path.length; i++) {
            let classes = e.path[i].classList;
            if (classes.contains("table-list-buttons")) {
                index = i;
                break;
            }
        }
        let previousButton = e.path[index].firstElementChild;
        if (previousButton.classList.contains("save-button")) {
            previousButton.classList.remove("save-button");
            previousButton.classList.add("edit-button");
            previousButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"> <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" /> <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" /> </svg>`;
        }
    }
};

const handleCardButtons = (e, element) => {
    // console.log(e);
    let id = Number(e.path[2].getAttribute("data-card-id"));
    let listSkill = document
        .getElementById(`list-${id}`)
        .querySelector(".skills");
    let skillElement = document
        .getElementById(`div-${id}`)
        .querySelector(".skills");
    previousData = skillElement.innerHTML;
    // console.log(skillElement);
    if (element.classList.contains("close-button")) {
        handleFetch("/" + id, {
            method: "DELETE",
            onSuccess: (data) => {
                // console.log(data);
                window.location.reload();
            },
            data: {},
        });
    } else {
        listSkill = listSkill.children[0];
        if (element.classList.contains("save-edit-button")) {
            if (element.innerHTML.trim() === "Edit") {
                element.innerHTML = "Save";
                previousData = skillElement;
                skillElement.innerHTML = `<span>Skills: </span><input type="text" id="skills-info-${id}" class="skills" name="skills"></input>`;
            } else {
                element.innerHTML = "Edit";
                let newSkill = document.getElementById(`skills-info-${id}`);
                if (newSkill.value !== "") {
                    handleFetch("/" + id, {
                        method: "PATCH",
                        onSuccess: (data) => {
                            skillElement.innerHTML = `<div class="skills p-10">Skills: ${newSkill.value}</div>`;
                            listSkill.innerHTML = newSkill.value;
                        },
                        data: { skills: newSkill.value },
                    });
                } else {
                    skillElement.innerHTML = `${previousData}`;
                }
            }
        } else {
            let previousButton = e.path[2].children[2].firstElementChild;
            if (previousButton.innerHTML.trim() === "Save") {
                previousButton.innerHTML = "Edit";
            }
            handleFetch("/", {
                onSuccess: (data) => {
                    skillElement.innerHTML = `<div class="skills">Skills: ${
                        data[id - 1].skills
                    }</div>`;
                },
            });
        }
    }
};

// TODO: Have to implement the delete key for both grid and list view
