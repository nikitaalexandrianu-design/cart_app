// Firebase stuff
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js';

const appSettings = {
  databaseURL: 'https://nikita-s-cart-default-rtdb.firebaseio.com/',
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, 'shoppingListNikita');

// My code
const inputFieldEl = document.getElementById('input-field');
const addButtonEl = document.getElementById('add-button');

const shoppingListEl = document.getElementById('shopping-list');

addButtonEl.addEventListener('click', function () {
  let inputValue = inputFieldEl.value;

  if (inputValue.length > 1) {
    push(shoppingListInDB, inputValue);
    clearInputFieldEl();
  }
});

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.val() !== null) {
    let shoppingListArray = Object.entries(snapshot.val());
    clearShoppingListEl();
    for (let i = 0; i < shoppingListArray.length; i++) {
      let currentItem = shoppingListArray[i];
      let currentItemId = currentItem[0];
      let currentItemValue = currentItem[1];
      appendItemToShoppingListEl(currentItem);
    }
  }
});

function clearShoppingListEl() {
  shoppingListEl.innerHTML = '';
}

function clearInputFieldEl() {
  inputFieldEl.value = null;
}

function appendItemToShoppingListEl(item) {
  //shoppingListEl.innerHTML += `<li>${itemValue}</li>`;

  let itemId = item[0]
  let itemValue = item[1]

  let newLiEl = document.createElement('li');
  newLiEl.textContent = itemValue;

  newLiEl.addEventListener('dblclick', function(){
    let exactLocationOfItemInDB = ref(database,`shoppingListNikita/${itemId}`)

    remove(exactLocationOfItemInDB)
  })
  

  shoppingListEl.append(newLiEl);
}