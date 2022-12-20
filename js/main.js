"use strict";

// input selectors
let titleInput = document.querySelector("#title");
let priceInput = document.querySelector("#price");
let taxesInput = document.querySelector("#taxes");
let adsInput = document.querySelector("#ads");
let discountInput = document.querySelector("#discount");
let totalInput = document.querySelector("#total");
let countInput = document.querySelector("#count");
let categoryInput = document.querySelector("#category");
let searchInput = document.querySelector("#search");
let bodyTable = document.querySelector("#tbody");
// helpers variables
let mood = "create";
let tmp;



// button selectors

let createButton = document.querySelector("#submit");
let searchButton = document.querySelector("#searchTitle");
let categoryButton = document.querySelector("#searchCategory");

// Start the logical code

// Sum total and discount products function
function getTotal() {
  if (priceInput.value != "") {
    let result =
      +priceInput.value +
      +taxesInput.value +
      +adsInput.value -
      +discountInput.value;
    totalInput.innerHTML = result;
    totalInput.className = `bg-success border rounded-2 p-2 w-25 my-2 mx-3`;
  } else {
    taxesInput.innerHTML = "";
    totalInput.className = `bg-danger border rounded-2 p-2 w-25 my-2 mx-3`;
  }
}

// Create Product function
let dataProduct;
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

createButton.addEventListener("click", function () {
  let newProduct = {
    title: titleInput.value.toLowerCase(),
    price: priceInput.value,
    taxes: taxesInput.value,
    ads: adsInput.value,
    discount: discountInput.value,
    total: totalInput.innerHTML,
    count: countInput.value,
    category: categoryInput.value.toLowerCase(),
  };
  // validate input value
  if (
    taxesInput.value != "" &&
    priceInput.value != "" &&
    taxesInput.value != "" &&
    adsInput.value != "" &&
    discountInput.value != "" &&
    countInput.value <= 100
  ) {
    if (mood === "create") {
      // count the product
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct[tmp] = newProduct;
      mood = "create";
      createButton.innerHTML = "Create";
      countInput.style.display = "block";
    }
    clearData();
  }

  // saved in localStorage
  localStorage.setItem("product", JSON.stringify(dataProduct));

  showData();
});

// Clear all input function

function clearData() {
  titleInput.value = "";
  priceInput.value = "";
  taxesInput.value = "";
  adsInput.value = "";
  discountInput.value = "";
  totalInput.innerHTML = "";
  countInput.value = "";
  categoryInput.value = "";
}

// Read data function

function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += `
      <tr>
        <th class="text-white" scope="row">${i + 1}</th>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateData(${i})"  type="button" class="btn btn-success">update</button></td>
        <td><button onclick="deleteData(${i})" type="button" class="btn btn-danger">delete</button></td>
      </tr>
     `;
  }
  bodyTable.innerHTML = table;
  let buttonDeleteAll = document.querySelector("#deleteAll");
  if (dataProduct.length > 0) {
    buttonDeleteAll.innerHTML = `<button onclick="deleteAll()" class="btn btn-primary w-100 my-2 mx-1" id="submit">Delete All (${dataProduct.length})</button>`;
  } else {
    buttonDeleteAll.innerHTML = "";
  }
}
showData();

// delete one product function
function deleteData(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}

// delete all product function

function deleteAll() {
  localStorage.clear();
  dataProduct.splice(0);
  showData();
}

// update Product function

function updateData(i) {
  titleInput.value = dataProduct[i].title;
  priceInput.value = dataProduct[i].price;
  taxesInput.value = dataProduct[i].taxes;
  adsInput.value = dataProduct[i].ads;
  discountInput.value = dataProduct[i].discount;
  getTotal();
  countInput.style.display = "none";
  categoryInput.value = dataProduct[i].category;
  createButton.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search Product function
let searchMood = "title";
function getSearchMood(id) {
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  searchInput.placeholder = `Search By ${searchMood}`;
  searchInput.focus();
  searchInput.innerHTML = "";
  showData();
}

// Search Product function by Date

function searchDate(value) {
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    if (searchMood == "title") {
      if (dataProduct[i].title.includes(value.toLowerCase())) {
        table += `
                  <tr>
                    <th class="text-white" scope="row">${i + 1}</th>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick="updateData(${i})"  type="button" class="btn btn-success">update</button></td>
                    <td><button onclick="deleteData(${i})" type="button" class="btn btn-danger">delete</button></td>
                  </tr>
          `;
      }
    } else {
      if (dataProduct[i].category.includes(value.toLowerCase())) {
        table += `
                  <tr>
                    <th class="text-white" scope="row">${i + 1}</th>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick="updateData(${i})"  type="button" class="btn btn-success">update</button></td>
                    <td><button onclick="deleteData(${i})" type="button" class="btn btn-danger">delete</button></td>
                  </tr>
          `;
      }
    }
  }
  bodyTable.innerHTML = table;
}
