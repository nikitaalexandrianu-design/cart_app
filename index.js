// Firebase stuff
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
} from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js';

const appSettings = {
  databaseURL: 'https://nikita-s-cart-default-rtdb.firebaseio.com/',
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingListNikita")


const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppinglistEl = document.getElementById("shopping-list");

addButtonEl.addEventListener('click',function(){
    let inputValue = inputFieldEl.value;
    push(shoppingListInDB, inputValue);

    shoppinglistEl.innerHTML += `<li>${inputValue}</li> `;

    inputFieldEl.value = '';

})