//Handle theme switch
let isDarkMode = localStorage.getItem("isDarkMode");
const toggleBtn = document.querySelector("#theme-toggle");
const extensionListItemsContainer = document.querySelector(
	"#extension-list-items"
);
const allBtn = document.querySelector("#user-control-all");
const activeBtn = document.querySelector("#user-control-active");
const inActiveBtn = document.querySelector("#user-control-inactive");

//CHECK ACTIVE EXTENSION
function checkActiveExtensions() {
	let activeItem = extensionListItemsContainer.querySelectorAll(
		"input[type='checkbox']"
	);

	activeItem.forEach((item) => {
		if (item.dataset.isActive === "true") {
			item.checked = true;
		}
	});
	console.log(activeItem);
}

//DYNAMICALLY LOAD DATA
function loadData() {
	fetch("./data.json")
		.then((response) => response.json())
		.then((data) => {
			data.forEach((item) => {
				let article = document.createElement("article");
				article.className = "extension-list-item";
				article.innerHTML = `
			<div class="top">
			<img src="${item.logo}" alt="${item.name}" />
			
			<div class="text">
			<h2>${item.name}</h2>
			<p>
			${item.description}
			</p>
			</div>
			</div>
			<div class="bottom">
			<button onclick ="handleRemove(event)"
			id="remove-btn" type="button">Remove</button>
			<input id="input-toggle-switch" 
			role ="switch" aria-label="Extension use toggle" type="checkbox" data-is-active = ${item.isActive} />
			</div>`;

				extensionListItemsContainer.append(article);
			});

			checkActiveExtensions();
		})
		.catch((error) => console.error("Error Loading JSON file", error));
}

//handle theme page on load
if (isDarkMode === "active") enableDarkMode();
function enableDarkMode() {
	console.log("darkMode Enabled");
	localStorage.setItem("isDarkMode", "active");
	document.body.classList.add("dark-mode");
}

function disableDarkMode() {
	console.log("darkMode Disabled");
	localStorage.setItem("isDarkMode", "null");
	document.body.classList.remove("dark-mode");
}

function handleThemeSwitch() {
	isDarkMode = localStorage.getItem("isDarkMode");
	isDarkMode === "active" ? disableDarkMode() : enableDarkMode();
}

function changeBackground() {
	let buttons = document.querySelectorAll(".user-control-btn");
	console.log(buttons);
	buttons.forEach((button) => {
		button.classList.remove("red");
	});
}

function handleHandleAllBtnEvent(event) {
	let inputItems = extensionListItemsContainer.querySelectorAll(
		"input[type='checkBox']"
	);

	event.target.classList.add("red");

	inputItems.forEach((item) => {
		item.parentElement.parentElement.style.display = "flex";
	});
}
function handleHandleActiveBtnEvent(event) {
	// change button bgc
	changeBackground();
	event.target.classList.add("red");
	//search dom for element which have their isActive state set to false
	let inputItems = extensionListItemsContainer.querySelectorAll(
		"input[type='checkBox']"
	);

	inputItems.forEach((item) => {
		if (item.dataset.isActive === "false") {
			item.parentElement.parentElement.style.display = "none";
		} else {
			item.parentElement.parentElement.style.display = "flex";
		}
	});
}
function handleHandleInActiveBtnEvent(event) {
	// change button bgc
	changeBackground();
	event.target.classList.add("red");

	event.target.classList.add("red");

	let inputItems = extensionListItemsContainer.querySelectorAll(
		"input[type='checkBox']"
	);

	inputItems.forEach((item) => {
		if (item.dataset.isActive === "true") {
			item.parentElement.parentElement.style.display = "none";
		} else {
			item.parentElement.parentElement.style.display = "flex";
		}
	});
}

function handleRemove(event) {
	changeBackground();

	//remove parent article element
	event.target.parentElement.parentElement.remove();
}

toggleBtn.addEventListener("click", handleThemeSwitch);
allBtn.addEventListener("click", handleHandleAllBtnEvent);
activeBtn.addEventListener("click", handleHandleActiveBtnEvent);
inActiveBtn.addEventListener("click", handleHandleInActiveBtnEvent);

loadData();
