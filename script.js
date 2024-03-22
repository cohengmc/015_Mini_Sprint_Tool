import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove , update} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const addItemBtnEl = document.querySelector("#add-item-btn");
const addItemTitleEl = document.querySelector("#add-item-title");
const addItemDescEl = document.querySelector("#add-item-desc");
const practiceItemsEl = document.querySelector("#practice-items")

const appSettings = {
    databaseURL: "https://playground-b42aa-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const practiceItemsInDB = ref(database, "miniSprint/practiceItems")

addItemBtnEl.addEventListener('click', function () {

    const itemTitle = addItemTitleEl.value;
    const itemDesc = addItemDescEl.value;

    update(practiceItemsInDB, {
        [itemTitle]: itemDesc
    })

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

onValue(practiceItemsInDB, function(snapshot){
    if(snapshot.exists()){
        let itemArray = Object.entries(snapshot.val());

        practiceItemsEl.innerHTML = "";

        itemArray.forEach(element => {

            let currentItemId = element[0];
            let currentItemDesc = element[1];

            addPracticeItem(currentItemId, currentItemDesc)
            
        });


    } else {
        practiceItemsEl.innerHTML = "No items here... yet";
    }
})