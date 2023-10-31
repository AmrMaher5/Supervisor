const title = document.getElementById('title');
const availableQuantity = document.getElementById('availableQuantity');
const incomingQuantity = document.getElementById('incomingQuantity');
const quantitySold = document.getElementById('quantitySold');
const theDate = document.getElementById('theDate');
const total = document.getElementById('total');
const category = document.getElementById('category');
const submitBtn = document.getElementById('submit');
const tbody = document.getElementById('tbody');
const searchValueInput = document.getElementById('search');
const searchTitleButton = document.getElementById('searchTitleButton');
const searchCategoryButton = document.getElementById('searchCategoryButton');
const deleteAllButton = document.getElementById('deleteAll');
let stores = JSON.parse(localStorage.getItem('Stores')) || [];
let mood = 'create';
let tmp;
let searchMood = 'title';

submitBtn.addEventListener('click', function() {
    let newStore = {
        title: title.value,
        availableQuantity: availableQuantity.value,
        incomingQuantity: incomingQuantity.value,
        quantitySold: quantitySold.value,
        theDate: theDate.value,
        total: total.innerHTML,
        category: category.value
    };

    if (mood === 'create') {
        if (validateProduct(newStore)) {
            stores.push(newStore);
            localStorage.setItem('Stores', JSON.stringify(stores));
            clearInputFields();
            showStores();
        } else {
            alert('Please fill out all fields.');
        }
    } else {
        stores[tmp] = newStore;
        mood = 'create';
        submitBtn.textContent = 'Create';
        localStorage.setItem('Stores', JSON.stringify(stores));
        clearInputFields();
        showStores();
    }
});

function clearInputFields() {
    title.value = '';
    availableQuantity.value = '';
    incomingQuantity.value = '';
    quantitySold.value = '';
    theDate.value = '';
    total.innerHTML = '';
    category.value = '';
}

function showStores() {
    getTotal();
    let tableRows = '';
    stores.forEach((store, index) => {
        if (
            (!searchValueInput.value || store.title.toLowerCase().includes(searchValueInput.value.toLowerCase())) &&
            (searchMood === 'title' || store.category.toLowerCase().includes(searchValueInput.value.toLowerCase()))
        ) {
            tableRows += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${store.title}</td>
                    <th>${store.availableQuantity}</th>
                    <th>${store.incomingQuantity}</th>
                    <th>${store.quantitySold}</th>
                    <th>${store.theDate}</th>
                    <td>${store.total}</td>
                    <td>${store.category}</td>
                    <td><button onclick="updateStore(${index})" class="update">Update</button></td>
                    <td><button onclick="deleteStore(${index})" class="delete">Delete</button></td>
                </tr>
            `;
        }
    });

    tbody.innerHTML = tableRows;
    let btnDelete = document.getElementById('deleteAll');
    if (stores.length > 0) {
        btnDelete.innerHTML = '<button onclick="deleteAll()">Delete All</button>';
    } else {
        btnDelete.innerHTML = '';
    }
}

function deleteStore(index) {
    stores.splice(index, 1);
    localStorage.setItem('Stores', JSON.stringify(stores));
    showStores();
}

function deleteAll() {
    localStorage.clear();
    stores = [];
    showStores();
}

function updateStore(index) {
    const store = stores[index];
    title.value = store.title;
    availableQuantity.value = store.availableQuantity;
    incomingQuantity.value = store.incomingQuantity;
    quantitySold.value = store.quantitySold;
    theDate.value = store.theDate;
    total.innerHTML = store.total;
    category.value = store.category;
    getTotal();
    submitBtn.textContent = 'Update';
    mood = 'update';
    tmp = index;
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function searchData(searchValue) {
    showStores(searchValue);
}

function getTotal() {
    if (availableQuantity.value !== '') {
        let result = (+availableQuantity.value + +incomingQuantity.value) - +quantitySold.value;
        total.innerHTML = result;
        total.style.backgroundColor = '#4CAF50';
    } else {
        total.innerHTML = '';
        total.style.backgroundColor = '#f14343';
    }
}

function validateProduct(store) {
    return store.title && store.availableQuantity >= 0 && store.incomingQuantity >= 0 && store.quantitySold >= 0;
}

showStores();