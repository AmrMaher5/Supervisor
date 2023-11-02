const titleInput = document.getElementById('title');
const priceInput = document.getElementById('price');
const taxesInput = document.getElementById('taxes');
const adsInput = document.getElementById('ads');
const discountInput = document.getElementById('discount');
const totalOutput = document.getElementById('total');
const countInput = document.getElementById('count');
const categoryInput = document.getElementById('category');
const submitButton = document.getElementById('submit'); // Corrected variable name
const tbody = document.getElementById('tbody');
const searchInput = document.getElementById('search');
const searchTitleButton = document.getElementById('searchTitleButton');
const searchCategoryButton = document.getElementById('searchCategoryButton');
const searchButton = document.getElementById('searchButtonId');
const quantitySold = document.getElementById('quantitySold');
let products = JSON.parse(localStorage.getItem('products')) || [];

// Rest of your code remains unchanged


function getTotal() {
  if (priceInput.value !== '') {
    let result = (+priceInput.value + +taxesInput.value + +adsInput.value - +discountInput.value )* +quantitySold.value;
    totalOutput.textContent = result;
    totalOutput.style.backgroundColor = '#4CAF50';
  } else {
    totalOutput.textContent = '';
    totalOutput.style.backgroundColor = '#f14343';
  }
}

// انتظر حدوث حدث تحميل الصفحة
window.addEventListener('load', function() {
  // احصل على عنصر الفوتر
  var footer = document.getElementById('footer');

  // تعيين سنة الحقوق المحفوظة كسنة الحالية
  var currentYear = new Date().getFullYear();
  footer.innerHTML = 'جميع الحقوق محفوظة &copy; ' + currentYear;
});

function submitBtn() {
  window.print();
}

submitButton.addEventListener('click', function() {
  const newSale = {
    title: titleInput.value,
    price: priceInput.value,
    taxes: taxesInput.value,
    ads: adsInput.value,
    discount: discountInput.value,
    total: totalOutput.textContent,
    quantitySold: quantitySold.value,
  };

  // إضافة الصف الجديد إلى قائمة المنتجات
  products.push(newSale);

  // حفظ قائمة المنتجات في التخزين المحلي
  localStorage.setItem('products', JSON.stringify(products));

  // إنشاء صف جديد
  var newRow = document.createElement('tr');

  // إنشاء خلايا الصف
  var titleCell = document.createElement('td');
  titleCell.textContent = newSale.title;

  var priceCell = document.createElement('td');
  priceCell.textContent = newSale.price;

  var taxesCell = document.createElement('td');
  taxesCell.textContent = newSale.taxes;

  var adsCell = document.createElement('td');
  adsCell.textContent = newSale.ads;

  var discountCell = document.createElement('td');
  discountCell.textContent = newSale.discount;

  var totalCell = document.createElement('td');
  totalCell.textContent = newSale.total;

  var quantitySoldCell = document.createElement('td');
  quantitySoldCell.textContent = quantitySoldInput.value;


  // إضافة خلايا الصف إلى الصف الجديد
  newRow.appendChild(titleCell);
  newRow.appendChild(priceCell);
  newRow.appendChild(taxesCell);
  newRow.appendChild(adsCell);
  newRow.appendChild(discountCell);
  newRow.appendChild(totalCell);
  newRow.appendChild(quantitySoldCell);
 

  // إضافة الصف الجديد إلى الجدول
  tbody.appendChild(newRow);

  // إعادة تعيين قيم الإدخال
  titleInput.value = '';
  priceInput.value = '';
  taxesInput.value = '';
  adsInput.value = '';
  discountInput.value = '';
  totalOutput.textContent = '';
  quantitySold.value = '';
});
function openProgram() {
    fetch('Debug\Supervisor.exe', {
        method: 'GET'
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // ستظهر رسالة "تم فتح البرنامج بنجاح" في وحدة التحكم
    })
    .catch(error => {
        console.error('حدث خطأ:', error);
    });
}