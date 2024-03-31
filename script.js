const addItemBtnEl = document.querySelector("#add-item-btn");
const addItemTitleEl = document.querySelector("#add-item-title");
const addItemDescEl = document.querySelector("#add-item-desc");
const practiceItemsEl = document.querySelector("#practice-items")

let practiceItems = {}

addItemBtnEl.addEventListener('click', function () {

    const itemTitle = addItemTitleEl.value;
    const itemDesc = addItemDescEl.value;

    practiceItems[itemTitle] = itemDesc;

    render();

    clearInput(addItemTitleEl);
    clearInput(addItemDescEl);
})

function clearInput(itemToClear) {
    itemToClear.value = ""
}

function addPracticeItem(key, value) {
    //<div class="practice-item"></div>
    let newPracticeItem = document.createElement("div");
    newPracticeItem.className = 'practice-item';
    let newId = key.replace(/\s/g, '');
    newPracticeItem.id = newId + 'Id';
    practiceItemsEl.appendChild(newPracticeItem);

    //div location
    const newPracticeItemEl = document.querySelector(`#${newPracticeItem.id}`)

    //<h3>${key}</h3>
    let newTitle = document.createElement("h3");
    newTitle.textContent = key;
    newPracticeItemEl.appendChild(newTitle);

    //<p>${value}</p>
    let newDesc = document.createElement("p");
    newDesc.textContent = value;
    newPracticeItemEl.appendChild(newDesc);
}

function render() {

    practiceItemsEl.innerHTML = "";

    if (Object.keys(practiceItems) != 0) {
        for (const [key, value] of Object.entries(practiceItems)){

            let currentItemId = key;
            let currentItemDesc = value;

            addPracticeItem(currentItemId, currentItemDesc)

        }
    } else {
        practiceItemsEl.innerHTML = "No items here... yet";
    }
}