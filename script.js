const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const itemFilter = document.querySelector('#filter');

const addItem = (e) => {
  e.preventDefault();
  const newItem = itemInput.value;

  // Validate Input
  if (newItem === '') {
    alert('Please Add An Item.');
    return;
  }
  // Create LI
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  const button = createButton('remove-item btn-link text-red');

  li.appendChild(button);
  // Add li to list (DOM)
  itemList.appendChild(li);
  // Check to see if items can be shown
  checkUI();

  // Clear value after submission
  itemInput.value = '';
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

// Remove Item with event delegation
const removeItem = (e) => {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      // Check to see if items can be shown
      checkUI();
    }
  }
};

// Remove all list items
const removeItems = () => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  // Check to see if items can be shown
  checkUI();
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

// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', removeItems);
