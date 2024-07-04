const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const itemFilter = document.querySelector('#filter');

const displayItems = () => {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.forEach((item) => addItemToDOM(item));

  checkUI();
};

const onAddItemSubmit = (e) => {
  e.preventDefault();
  const newItem = itemInput.value;

  // Validate Input
  if (newItem === '') {
    alert('Please Add An Item.');
    return;
  }

  // Create item DOM elem
  addItemToDOM(newItem);

  // Add item to LS
  addItemToStorage(newItem);

  // Check to see if items can be shown
  checkUI();

  // Clear value after submission
  itemInput.value = '';
};

const addItemToDOM = (item) => {
  // Create LI
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');

  li.appendChild(button);
  // Add li to list (DOM)
  itemList.appendChild(li);
};

// Create Button
const createButton = (classes) => {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
};

// Create Icon
const createIcon = (classes) => {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
};

const addItemToStorage = (item) => {
  const itemsFromStorage = getItemsFromStorage();

  // Add new item to array
  itemsFromStorage.push(item);

  // Convert to JSON string and set to LS
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

const getItemsFromStorage = () => {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
};

const onClickItem = (e) => {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  }
};

// Remove Item with event delegation
const removeItem = (item) => {
  if (confirm('Are you sure?')) {
    // Remove item from DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
};

const removeItemFromStorage = (item) => {
  let itemsFromStorage = getItemsFromStorage();

  // filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Reset to LS
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

// Remove all list items
const removeItems = () => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  // Check to see if items can be shown
  checkUI();

  // Remove from LS
  localStorage.removeItem('items');
};

const filterItems = (e) => {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    // Basically if the text content matches the value, display the li
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
};

// Check and show elements depending on item length
const checkUI = () => {
  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    itemFilter.style.display = 'none';
    clearBtn.style.display = 'none';
  } else {
    itemFilter.style.display = 'block';
    clearBtn.style.display = 'block';
  }
};

// Init App
const init = () => {
  // Event Listeners
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', removeItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);

  checkUI();
};

init();
