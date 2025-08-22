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
			<h4>${item.name}</h4>
			<p>
			${item.description}
			</p>
			</div>
			</div>
			<div class="bottom">
			<button id="remove-btn" type="button">Remove</button>
			<input id="input-toggle-switch" type="checkbox" data-is-active = ${item.isActive} />
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
	console.log("Theme Switch Handler");
}

function handleHandleAllBtnEvent() {
	let inputItems = extensionListItemsContainer.querySelectorAll(
		"input[type='checkBox']"
	);

	inputItems.forEach((item) => {
		item.parentElement.parentElement.style.display = "flex";
	});
}
function handleHandleActiveBtnEvent() {
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

	console.log(inActiveItems);
}
function handleHandleInActiveBtnEvent() {
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
	console.log("In Active Btn Clicked");
}

toggleBtn.addEventListener("click", handleThemeSwitch);
allBtn.addEventListener("click", handleHandleAllBtnEvent);
activeBtn.addEventListener("click", handleHandleActiveBtnEvent);
inActiveBtn.addEventListener("click", handleHandleInActiveBtnEvent);

loadData();
