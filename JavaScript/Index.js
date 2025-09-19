const CAR_PRODUCTOS = "HeartsId"; //recoge el evento de localstorage
//
document.addEventListener("DOMContentLoaded", () => {
// contendra funciones que se ejecutaran cuando la página se haya cargado por completo
loadProducts();
});
//función recuperar los productos(obtener datos de json, utilizando un fetch)
function getProductsDb() {
const url = "../Galeria W.json";
return fetch(url)
.then(response => {
return response.json();
})
.then(result => {
return result;
})
.catch(err => {
console.log(err);
});
}
async function loadProducts() {
// console.log("funcion loadProducts ejecutada correctamente");
const products = await getProductsDb();
// console.log(products);
//class="col-md-12"
let html = "";
products.forEach(product =>{
html += `
<div class="col-6 product-container">
  <div class="car product">
    <div class="card mb-6 border-warning"  style="max-width: 540px;">
      <div class="row g-0">
       
      <div class="col-md-6 bg-transparent border-warning"> 
          <img src="${product.imagen}" class="img-fluid rounded-start in" alt="${product.name}">
        </div>
        <div class="col-md-6">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text Vc">${product.InfoExtra}</p>
            <p class="card-text"><small class="text-body-secondary">$${product.precio}.00</small></p>
            <button type="button" class="btn btn-warning btn-cart"
            onClick=(addProductCart(${product.id}))>Añadir a la bolsa</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

`;
});
document.getElementsByClassName("products")[0].innerHTML = html;
}



//-----------------------------------------------------------
//funcionalidad del carrito
function openCloseCar() {
  const containerCar = document.getElementsByClassName("car-products")[0];
  containerCar.classList.forEach(item => {
  if (item === "hidden") {
  containerCar.classList.remove("hidden");
  containerCar.classList.add("active");
  }
  if (item === "active") {
  containerCar.classList.remove("active");
  containerCar.classList.add("hidden");
  }
  });
  }
  //cargamos los productos
  function addProductCar(idProduct) {
  let arrayProductsId = [];
  let localStorageItems = localStorage.getItem(CAR_PRODUCTOS);
  if (localStorageItems === null) {
  arrayProductsId.push(idProduct);
  localStorage.setItem(CAR_PRODUCTOS, arrayProductsId);
  } else {
  let productsId = localStorage.getItem(CAR_PRODUCTOS);
  if (productsId.length > 0) {
  productsId += "," + idProduct;
  } else {
  productsId = productId;
  }
  localStorage.setItem(CAR_PRODUCTOS, productsId);
  }
  loadProductCar();
  }
  async function loadProductCar() {
  const products = await getProductsDb();
  // Convertimos el resultado del localStorage en un array
  
  const localStorageItems = localStorage.getItem(CAR_PRODUCTOS);
  let html = "";
  if (!localStorageItems) {
  html = `
  <div class="car-product empty">
  <p>Carrito vacio.</p>
  </div>
  `;
  } else {
  const idProductsSplit = localStorageItems.split(",");
  // Eliminamos los IDs duplicaos
  const idProductsCar = Array.from(new Set(idProductsSplit));
  idProductsCar.forEach(id => {
  products.forEach(product => {
  if (id == product.id) {
  const quantity = countDuplicatesId(id, idProductsSplit);
  const totalPrice = product.price * quantity;
  html += `
  <div class="car-product">
  <img src="${product.image}" alt="${product.name}" />
  <div class="car-product-info">
  <span class="quantity">${quantity}</span>
  <p>${product.name}</p>
  <p>${totalPrice.toFixed(2)}</p>
  <p class="change-quantity">
  <button onClick="decreaseQuantity(${
  product.id
  })">-</button>
  <button onClick="increaseQuantity(${
  product.id
  })">+</button>
  </p>
  <p class="car-product-delete">
  <button onClick=(deleteProductCart(${
  product.id
  }))>Eliminar</button>
  </p>
  </div>
  </div>
  `;
  }
  
  });
  });
  }
  document.getElementsByClassName("car-products")[0].innerHTML = html;
  }
  //al agregar productos al carrito, aparece eliminar
  function deleteProductCar(idProduct) {
  const idProductsCar = localStorage.getItem(CAR_PRODUCTOS);
  const arrayIdProductsCar = idProductsCar.split(",");
  const resultIdDelete = deleteAllIds(idProduct, arrayIdProductsCar);
  if (resultIdDelete) {
  let count = 0;
  let idsString = "";
  resultIdDelete.forEach(id => {
  count++;
  if (count < resultIdDelete.length) {
  idsString += id + ",";
  } else {
  idsString += id;
  }
  });
  localStorage.setItem(CAR_PRODUCTOS, idsString);
  }
  const idsLocalStorage = localStorage.getItem(CAR_PRODUCTOS);
  if (!idsLocalStorage) {
  localStorage.removeItem(CAR_PRODUCTOS);
  }
  loadProductCar();
  }
  //incrementar producto.
  function increaseQuantity(idProduct) {
  const idProductsCar = localStorage.getItem(CAR_PRODUCTOS);
  const arrayIdProductsCar = idProductsCar.split(",");
  arrayIdProductsCar.push(idProduct);
  let count = 0;
  let idsString = "";
  arrayIdProductsCar.forEach(id => {
  
  count++;
  if (count < arrayIdProductsCar.length) {
  idsString += id + ",";
  } else {
  idsString += id;
  }
  });
  localStorage.setItem(CAR_PRODUCTOS, idsString);
  loadProductCar();
  }
  function decreaseQuantity(idProduct) {
  const idProductsCar = localStorage.getItem(CAR_PRODUCTOS);
  const arrayIdProductsCar = idProductsCar.split(",");
  const deleteItem = idProduct.toString();
  let index = arrayIdProductsCar.indexOf(deleteItem);
  if (index > -1) {
  arrayIdProductsCar.splice(index, 1);
  }
  let count = 0;
  let idsString = "";
  arrayIdProductsCar.forEach(id => {
  count++;
  if (count < arrayIdProductsCar.length) {
  idsString += id + ",";
  } else {
  idsString += id;
  }
  });
  localStorage.setItem(CAR_PRODUCTOS, idsString);
  loadProductCar();
  }
  function countDuplicatesId(value, arrayIds) {
  let count = 0;
  arrayIds.forEach(id => {
  if (value == id) {
  count++;
  }
  });
  return count;
  }
  
  function deleteAllIds(id, arrayIds) {
  return arrayIds.filter(itemId => {
  return itemId != id;
  });
  }