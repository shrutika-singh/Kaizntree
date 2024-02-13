const TAGS = ["Etsy", "settings", "dollars", "cart", "tools", "shop", "zero"]
const TAGS_IMAGE_URLS = ['images/etsy.png',
'images/settings.png',
'images/dollars.png',
'images/cart.png',
'images/tools.png',
'images/shop.png',
'images/zero.png',
]
const CATEGORY_NAMES = ["Bundles", "Raw Materials", "Finished Products","Finished Products"]
var tableData;
var addNewItem = false;


function loadSideMenu(){
    fetch('../sideNav.html')
  .then(response => response.text())
  .then(text => document.getElementById('sidebar-placeholder').innerHTML = text);
}
//loadSideMenu();

function createTableRow(data) {
    const tagsImagesHtml = data.tags
    .map(tagNumber => `<img src="${TAGS_IMAGE_URLS[tagNumber-1]}" alt="Tag">`)
    .join('');

    const inStockDot = data.in_stock < 100 ? '<span class="red-dot"></span>' : '<span class="green-dot"></span>';
    const availableStockDot = data.available_stock < 100 ? '<span class="red-dot"></span>' : '<span class="green-dot"></span>';

    return `
      <tr>
        <td>${data.checkbox ? '<input type="checkbox" checked>' : '<input type="checkbox">'}</td>
        <td>${data.SKU}</td>
        <td><a href="#">${data.name}</a></td>
        <td>${tagsImagesHtml}</td>
        <td><a href="#">${CATEGORY_NAMES[data.category-1]}</a></td>
        <td>${inStockDot} ${data.in_stock}</td>
        <td>${availableStockDot} ${data.available_stock}</td>
      </tr>
    `;
  }

function getAllItems(stock_status,searchParam){
    // searchParam = 'BWAX';
    let url = 'http://127.0.0.1:8000/items/';

    const params = new URLSearchParams();
    if (stock_status) params.append('stock_status', stock_status);
    if (searchParam) params.append('search', searchParam);
    if (params.toString()) url += `?${params}`;
    
    const token = localStorage.getItem('token');
    fetch(url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}` // Include the token in the Authorization header
        },
    })
    .then((response) => response.json()) // Convert the response to JSON
    .then(data => {
        console.log(data)
        tableData = data
      const tableBody = document.querySelector('.contents tbody');
      tableBody.innerHTML = '';
      data.forEach(item => {
        tableBody.innerHTML += createTableRow(item);
      });
    })
    .catch(error => console.error('Error:', error));

   
    document.getElementById("filterDropdown").classList.remove("show");
   
} 

getAllItems();
document.addEventListener('DOMContentLoaded',()=>{
    const navItems = document.querySelectorAll('.sidebar .nav-item');
    navItems.forEach(item=>{
        item.addEventListener('click',()=>{
            navItems.forEach(subItem => {
                subItem.classList.remove('active');
            });
            this.classList.add('active');
        })
    })

})
function openNewItemForm(){
    // addNewItem = true;
    const myDiv = document.getElementById('newItem');
    myDiv.style.display = 'block'; 
}
function addNewItem($event){
    event.preventDefault();
    console.log(event)
    var SKU = document.getElementById('SKU').value;
    var name = document.getElementById('name').value;
    var tags = document.getElementById('tags').value;
    var category = document.getElementById('category').value;
    var in_stock = document.getElementById('inStock').value;
    var available_stock = document.getElementById('availableStock').value;

    newData = {
        "SKU": SKU,
        "name": name,
        "category": category,
        "tags": [Number(tags)],
        "stock_status": "in_stock",
        "available_stock": available_stock,
        "in_stock": in_stock
    };
    tableData.push(newData);

    const tableBody = document.querySelector('.contents tbody');
    tableData.forEach(item => {
        tableBody.innerHTML += createTableRow(item);
      });
     
      //addNewItem = false;
    const myDiv = document.getElementById('newItem');
    myDiv.style.display = 'none'; 

}
function searchItems(){
    let searchString = document.getElementById('search').value
    searchString = searchString.trim()
    if (searchString!==null && searchString!=undefined & searchString!==''){
        getAllItems(null,searchString)
    }else{
        getAllItems();
    }
}
function filterSelection(selectedOption){
    let searchString = document.getElementById('search').value
    searchString = searchString.trim()
    if (searchString!==null && searchString!=undefined & searchString!==''){
        getAllItems(selectedOption,searchString)
    }else{
        getAllItems(selectedOption);
    }
    getAllItems(selectedOption)
}

function toggleDropdown() {
    document.getElementById("filterDropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
}