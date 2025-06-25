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
  clone.querySelector(".normalBtn").addEventListener("click", () => {
    let productData = {
      id,
      price,
      name,
    };
    // Check Existing Product From localStorage
    const existing = JSON.parse(localStorage.getItem("products")) || [];
    const found = existing.find((data) => data.id == id);
    if (found) return;
    existing.push(productData);
    // set In Localstorage
    localStorage.setItem("products", JSON.stringify(existing));
    showAddToCartButton();
    // addToCart();
  });
  productPage.appendChild(clone);
});

/**========================================================================
 *                      Show Add To Cart Button
 *========================================================================**/

const cartButton = document.querySelector(".right .button");
const countProducts = document.querySelector(".count");
const productAmount = document.querySelector(".amount");

document.addEventListener('DOMContentLoaded', showAddToCartButton)

function showAddToCartButton() {
  
  const localProductData = JSON.parse(localStorage.getItem('products'));
  
  let amount = 0;
  if (localProductData) {
    //get total amount of products
    localProductData.forEach((data) => {
      amount = amount + data.price;
    })
    cartButton.style.bottom = "12px";
    countProducts.textContent = localProductData.length; 
    productAmount.textContent = amount;
  }
};

/*============================ END OF Show Add To Cart Button  ============================*/



/*============================ Start Checkout Cart section ============================*/
