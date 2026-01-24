// Firebase stuff
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
  onValue
} from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js';

const appSettings = {
  databaseURL: 'https://nikita-s-cart-default-rtdb.firebaseio.com/',
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingListNikita")


const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener('click',function(){
    let inputValue = inputFieldEl.value;
    push(shoppingListInDB, inputValue);


  clearInputField();

})
onValue(shoppingListInDB, function(snapshot){
if (snapshot.val() !==null ){
  let shoppingListArray = Object.values(snapshot.val());
  clearShoppingListEl();
  for (let i = 0; i < shoppingListArray.length; i++) {
    appendItemToShoppingListEl(shoppingListArray[i]);
  }
}

});

function clearShoppingListEl( ) {
  shoppingListEl.innerHTML = '';

}

function clearInputField(){
  inputFieldEl.value = null;
}

function appendItemToShoppingListEl(itemValue){
  if(itemValue.length > 1){
    shoppingListEl.innerHTML += `<li>${itemValue}</li> `;
  }
}










// let users = {
//   '00': 'drazen@gmail.com',
//   '01': 'nick@gmail.com',
//   '02': 'nikita@gmail.com',
// };

// console.log(Object.keys(users));
// console.log(Object.values(users));
// console.log(Object.entries(users)[0][1]);