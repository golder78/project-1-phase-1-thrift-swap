// Load items from a mock JSON database
let items = [];

// Fetch items from the external JSON file
fetch('http://localhost:3000/items')
    .then(response => response.json())
    .then(data => {
        items = data;
        displayItems();
    })
    .catch(error => console.error('Error fetching the items:', error));

// Function to display items in the HTML
function displayItems() {
    const itemContainer = document.querySelector('.featured');
    itemContainer.innerHTML = '';  // Clear current items

    items.forEach((item, index) => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('item');
        itemCard.id = `item${item.id}`;

        itemCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>Size: ${item.size} | Condition: ${item.condition}</p>
            <button onclick="swapItem(${index})">Swap</button>
            <button onclick="buyItem(${index})">Buy (ksh${item.price})</button>
            <button onclick="deleteItem(${item.id})">Delete</button> <!-- Delete Button -->
            <p class="status" id="status-item${item.id}">${item.isSwapped ? 'Swapped' : 'Available for swap / Buy'}</p>
        `;
        itemContainer.appendChild(itemCard);
    });
}

// Buy an item
function buyItem(index) {
    const item = items[index];
    if (!item.isSwapped) {
        alert(`You bought the ${item.name} for ksh${item.price}!`);
    } else {
        alert(`${item.name} is already bought!`);
    }
}

// Swap an item
function swapItem(index) {
    const item = items[index];
    if (!item.isSwapped) {
        items[index].isSwapped = true;
        
        displayItems();  // Refresh the display
    } else {
        alert('This item has already been swapped!');
    }
}
 
// Delete an item
function deleteItem(id) {
    // Remove the item from the local array
    items = items.filter(item => item.id !== id);

    // Remove the item from the JSON server
    fetch(`http://localhost:3000/items/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert(`Item with ID ${id} has been deleted.`);
            displayItems(); // Refresh the display
        } else {
            alert('Error deleting.');
        }
    })
    .catch(error => console.error('Error deleting the item:', error));
}
 