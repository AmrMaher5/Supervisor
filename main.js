const titleInput = document.getElementById('title');
const priceInput = document.getElementById('price');
const taxesInput = document.getElementById('taxes');
const adsInput = document.getElementById('ads');
const discountInput = document.getElementById('discount');
const totalOutput = document.getElementById('total');
const countInput = document.getElementById('count');
const categoryInput = document.getElementById('category');
const submitButton = document.getElementById('submit');
const tbody = document.getElementById('tbody');
const searchInput = document.getElementById('search');
const searchTitleButton = document.getElementById('searchTitleButton');
const searchCategoryButton = document.getElementById('searchCategoryButton');
const searchButton = document.getElementById('searchButtonId');

let sales = JSON.parse(localStorage.getItem('sales')) || [];
let mood = 'create';
let tmp;
let searchMood = 'title';

function getTotal() {
  if (priceInput.value !== '') {
    let result = +priceInput.value + +taxesInput.value + +adsInput.value - +discountInput.value;
    totalOutput.textContent = result;
    totalOutput.style.backgroundColor = '#4CAF50';
  } else {
    totalOutput.textContent = '';
    totalOutput.style.backgroundColor = '#f14343';
  }
}

submitButton.addEventListener('click', function() {
    const newSale = {
      title: titleInput.value,
      price: priceInput.value,
      taxes: taxesInput.value,
      ads: adsInput.value,
      discount: discountInput.value,
      total: totalOutput.textContent,
      count: countInput.value,
      category: categoryInput.value,
    };
  
    if (mood === 'create') {
      const count = parseInt(newSale.count);
      if (count > 1) {
        for (let i = 0; i < count; i++) {
          sales.push({ ...newSale }); // يجب أن تنشئ نسخة جديدة من newSale لكل عنصر داخل الحلقة
        }
      } else {
        sales.push(newSale);
      }
    } else {
      sales[tmp] = newSale;
      mood = 'create';
      submitButton.textContent = 'Create';
      countInput.style.display = 'block';
    }
  
    localStorage.setItem('sales', JSON.stringify(sales));
    clearInputFields();
    showSales();
  });

function clearInputFields() {
  titleInput.value = '';
  priceInput.value = '';
  taxesInput.value = '';
  adsInput.value = '';
  discountInput.value = '';
  countInput.value = '';
  totalOutput.textContent = '';
  categoryInput.value = '';
}

function showSales() {
  getTotal();
  let tableRows = '';
  sales.forEach((sale, index) => {
    if (
      (!searchInput.value ||
        sale.title.toLowerCase().includes(searchInput.value.toLowerCase())) &&
      (searchMood === 'title' ||
        sale.category.toLowerCase().includes(searchInput.value.toLowerCase()))
    ) {
      tableRows += `
        <tr>
          <td>${index + 1}</td>
          <td>${sale.title}</td>
          <td>${sale.price}</td>
          <td>${sale.taxes}</td>
          <td>${sale.ads}</td>
          <td>${sale.discount}</td>
          <td>${sale.total}</td>
          <td>${sale.category}</td>
          <td><button onclick="updateSale(${index})" class="update">Update</button></td>
          <td><button onclick="deleteSale(${index})" class="delete">Delete</button></td>
        </tr>
      `;
    }
  });

  tbody.innerHTML = tableRows;
  let deleteAllButton = document.getElementById('deleteAll');
  if (sales.length > 0) {
    deleteAllButton.innerHTML = '<button onclick="deleteAll()">Delete All</button>';
  } else {
    deleteAllButton.innerHTML = '';
  }
}

function deleteSale(index) {
  sales.splice(index, 1);
  localStorage.setItem('sales', JSON.stringify(sales));
  showSales();
}

function deleteAll() {
  localStorage.clear();
  sales = [];
  showSales();
}

countInput.addEventListener('input', getTotal);

function updateSale(index) {
  const sale = sales[index];
  titleInput.value = sale.title;
  priceInput.value = sale.price;
  taxesInput.value = sale.taxes;
  adsInput.value = sale.ads;
  discountInput.value = sale.discount;
  totalOutput.textContent = sale.total;
  categoryInput.value = sale.category;
  getTotal();
  countInput.style.display = 'none';
  submitButton.textContent = 'Update';
  mood = 'update';
  tmp = index;
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function searchData() {
  const searchValue = searchInput.value;
  showSales(searchValue);
}

searchButton.addEventListener('click', searchData);

searchTitleButton.addEventListener('click', function() {
  searchMood = 'title';
  showSales();
});

searchCategoryButton.addEventListener('click', function() {
  searchMood = 'category';
  showSales();
});

showSales();