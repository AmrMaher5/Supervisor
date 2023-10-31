const customerNameInput = document.getElementById('customername');
const phoneNumberInput = document.getElementById('phoneNumber');
const edgeInput = document.getElementById('edge');
const emailInput = document.getElementById('Email');
const addressInput = document.getElementById('Address');
const submitBtn = document.getElementById('submit');
const tbody = document.getElementById('tbody');
const searchInput = document.getElementById('search');
const searchNameButton = document.getElementById('searchNameButton');
const deleteAllButton = document.getElementById('deleteAll');
let customers = JSON.parse(localStorage.getItem('Customers')) || [];
let searchMode = 'customername';
let mood = 'create';
let tmp;

submitBtn.addEventListener('click', function() {
    const newCustomer = {
        customername: customerNameInput.value,
        phoneNumber: phoneNumberInput.value,
        Email: emailInput.value,
        Address: addressInput.value,
        edge: edgeInput.value,
    };

    if (mood === 'create') {
        customers.push(newCustomer);
    } else {
        customers[tmp] = newCustomer;
        mood = 'create';
        submitBtn.innerHTML = 'Create';
    }

    localStorage.setItem('Customers', JSON.stringify(customers));
    clearInputFields();
    showCustomers();
});

function clearInputFields() {
    customerNameInput.value = '';
    phoneNumberInput.value = '';
    emailInput.value = '';
    addressInput.value = '';
    edgeInput.value = '';
}

function showCustomers(searchValue = '') {
    let tableRows = '';
    customers.forEach((customer, index) => {
        if (
            (!searchValue || customer.customername.toLowerCase().includes(searchValue.toLowerCase())) &&
            (searchMode === 'customername' || customer.phoneNumber.toLowerCase().includes(searchValue.toLowerCase()))
        ) {
            tableRows += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${customer.customername}</td>
                    <td>${customer.phoneNumber}</td>
                    <td>${customer.edge}</td>
                    <td>${customer.Email}</td>
                    <td>${customer.Address}</td>
                    <td><button onclick="updateCustomer(${index})" class="update">Update</button></td>
                    <td><button onclick="deleteCustomer(${index})" class="delete">Delete</button></td>
                </tr>
            `;
        }
    });

    tbody.innerHTML = tableRows;
    let deleteAllButton = document.getElementById('deleteAll');
    if (customers.length > 0) {
        deleteAllButton.innerHTML = '<button onclick="deleteAllCustomers()">Delete All</button>';
    } else {
        deleteAllButton.innerHTML = '';
    }
}

function deleteCustomer(index) {
    customers.splice(index, 1);
    localStorage.setItem('Customers', JSON.stringify(customers));
    showCustomers();
}

function deleteAllCustomers() {
    localStorage.clear();
    customers = [];
    showCustomers();
}

function updateCustomer(index) {
    const customer = customers[index];
    customerNameInput.value = customer.customername;
    phoneNumberInput.value = customer.phoneNumber;
    emailInput.value = customer.Email;
    addressInput.value = customer.Address;
    edgeInput.value = customer.edge;
    searchMode = 'customername';
    submitBtn.innerHTML = 'Update';
    mood = 'update';
    tmp = index;
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
    showCustomers();
}

function searchData() {
    const searchValue = searchInput.value;
    showCustomers(searchValue);
}

searchNameButton.addEventListener('click', function() {
    searchMode = 'customername';
    showCustomers();
});

showCustomers();
