/**========================================================================
 *                           Search Animation
 *========================================================================**/
const search = document.querySelector("#search");

let placeholderNames = [
  '"Milk"',
  '"Bread"',
  '"Sugar"',
  '"Butter"',
  '"rice"',
  '"egg"',
  '"chocolate"',
  '"butter"',
  '"paneer"',
  '"curd"',
  '"chips"',
];

let count = 0;
function animateSerchBar() {
  search.innerText = ``;
  // 2s all Time Token By Animation
  search.innerText = `Search ${placeholderNames[count]}`;
  search.style.animationName = "searchAnimation";
  count++;

  setTimeout(() => {
    search.style.animationName = "searchAnimation2";
    search.innerText = `Search ${placeholderNames[count]}`;
  }, 1000);

  if (count == placeholderNames.length - 1) count = 0;
}

setInterval(animateSerchBar, 2000); // run after 2s

/*============================ END OF Aniamation  ============================*/

/**========================================================================
 *                           Render Category In Page
 *========================================================================**/

import { categories } from "../public/seedData.js";

const categoryTemplate = document.querySelector(".category-template");
const cetegory = document.querySelector(".cetegory");

// Render Categories
categories.forEach((data) => {
  // Clone Template Data Times
  const clone = document.importNode(categoryTemplate.content, true);
  clone.querySelector("img").src = data.image;
  clone.querySelector(".category-name").textContent = data.name;
  cetegory.appendChild(clone);
});

/*============================ END OF render Category ============================*/

/**========================================================================
 *                           Render Products
 *========================================================================**/

import { products } from "../public/seedData.js";
const productTemplate = document.querySelector(".product-template");
const productPage = document.querySelector(".product-page");

products.forEach((data) => {
  let { image, name, price, discountPrice, quantity, id } = data;
  // Clone product template
  const clone = document.importNode(productTemplate.content, true);
  clone.querySelector("img").src = image;
  clone.querySelector(".product-name").textContent = name;
  clone.querySelector(".quantity").textContent = quantity;
  clone.querySelector(".product-price1").textContent = `₹${price}`;
  clone.querySelector("del").innerText = `₹${discountPrice}`;

  // Add To Cart
  clone.querySelector(".normalBtn").addEventListener("click", (e) => {
    let productData = {
      id,
      count: 1,
    };
    // Check Existing Product From localStorage
    const existing = JSON.parse(localStorage.getItem("products")) || [];
    const found = existing.find((data) => data.id == id);
    if (found) return;
    existing.push(productData);
    // set In Localstorage
    localStorage.setItem("products", JSON.stringify(existing));
    showAddToCartButton();
    addToCart();
  });
  productPage.appendChild(clone);
});

/**========================================================================
 *                      Show Add To Cart Button
 *========================================================================**/

const cartButton = document.querySelector(".right .button");
const countProducts = document.querySelector(".count");
const productAmount = document.querySelector(".amount");

document.addEventListener("DOMContentLoaded", () => {
  showAddToCartButton();
  addToCart();
});

function showAddToCartButton() {
  const localProductData = JSON.parse(localStorage.getItem("products"));

  let amount = 0;
  let count = 0;
  //get total amount of products
  localProductData.forEach((data) => {
    let find = products.find((productData) => productData.id === data.id);
    if (find) {
      amount = amount + find.price;
    }
  });

  cartButton.style.bottom = "12px";
  countProducts.textContent = localProductData.length;
  productAmount.textContent = amount;

  if (localProductData.length === 0) {
    cartButton.style.bottom = "-60px";
  }
}

/*============================ END OF Show Add To Cart Button  ============================*/

const cartTemplate = document.querySelector(".cart-detials");
const productCart = document.querySelector(".product-cart");

function addToCart() {
  let localProductData = JSON.parse(localStorage.getItem("products")) || [];
  productCart.innerHTML = "";
  Billing();
  localProductData.forEach((data) => {
    let finddata = products.find((finddata) => finddata.id === data.id);
    if (finddata) {
      const clone = document.importNode(cartTemplate.content, true);
      const { image, name, price, discountPrice, quantity } = finddata;
      clone.querySelector("img").src = image;
      clone.querySelector(".product-name").textContent = name;
      clone.querySelector(".quantity").textContent = quantity;
      clone.querySelector(".product-price1").textContent = `₹${price}`;
      clone.querySelector("del").innerText = `₹${discountPrice}`;
      let value = clone.querySelector(".value");
      value.textContent = data.count;
      clone.querySelector(".decrement").addEventListener("click", () => {
        let existing = JSON.parse(localStorage.getItem("products")) || [];

        let index = existing.findIndex((item) => data.id === item.id);

        if (index !== -1) {
          if (existing[index].count > 1) {
            existing[index].count -= 1;
          } else {
            existing.splice(index, 1);
          }
        }
        
        localStorage.setItem("products", JSON.stringify(existing));
        showAddToCartButton();
        addToCart();
        Billing();
      });
      clone.querySelector(".increment").addEventListener("click", () => {
        let existing = JSON.parse(localStorage.getItem("products")) || [];

        let index = existing.findIndex((item) => data.id === item.id);

        if (index !== -1 && existing[index].count < 16) {
          existing[index].count += 1;

          localStorage.setItem("products", JSON.stringify(existing));
          addToCart();
          Billing();
        }
      });
      productCart.appendChild(clone);
    }
  });
}

const subPrice = document.querySelector(".sub-price");
const grandPrice = document.querySelector(".grand-price");
function Billing() {
  let localProductData = JSON.parse(localStorage.getItem("products"));

  let subTotal = 0;

  localProductData.forEach((data) => {
    let product = products.find((Pdata) => Pdata.id == data.id);
    if (product.id === data.id) {
      subTotal += product.price * data.count;
    }
  });

  let deliveryCharge = 22;
  let HandiligFee = 6;

  grandPrice.textContent = `₹${deliveryCharge + HandiligFee + subTotal}`;

  subPrice.textContent = `₹${subTotal}`;
}

/*============================ Start Checkout Cart section ============================*/
