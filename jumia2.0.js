document.addEventListener("DOMContentLoaded", function() {
  const itemInput = document.getElementById('itemInput');
  const addItemBtn = document.getElementById('addItemBtn');
  const clearListBtn = document.getElementById('clearListBtn');
  const itemList = document.getElementById('itemList');
  let shoppingList = [];

  // Check for saved items in localStorage
  if (localStorage.getItem('shoppingList')) {
      shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
      renderList();
  }

  // Function to render the shopping list
  function renderList() {
      itemList.innerHTML = '';
      shoppingList.forEach((item, index) => {
          const li = document.createElement('li');
          li.textContent = item.name;
          if (item.purchased) {
              li.classList.add('purchased');
          }
          li.dataset.index = index;
          li.addEventListener('click', togglePurchased);
          itemList.appendChild(li);
      });
      updateLocalStorage();
  }

  // Function to add new item to the list
  function addItem() {
      const itemName = itemInput.value.trim();
      if (itemName === '') return;
      shoppingList.push({ name: itemName, purchased: false });
      renderList();
      itemInput.value = '';
  }

  // Event listener for addItemBtn
  addItemBtn.addEventListener('click', addItem);

  // Event listener for clearListBtn
  clearListBtn.addEventListener('click', () => {
      shoppingList = [];
      renderList();
  });

  // Function to toggle purchased status
  function togglePurchased() {
      const index = this.dataset.index;
      shoppingList[index].purchased = !shoppingList[index].purchased;
      renderList();
  }

  // Function to update localStorage
  function updateLocalStorage() {
      localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  }
});
