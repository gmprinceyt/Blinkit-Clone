// Search animation
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

// Fetch Data and Render in Html
import { products, categories } from "./category/seedData.js";

const cetegoryHTML = document.querySelector(".category-template");
const cetegory = document.querySelector(".cetegory")

// Render Categories
categories.forEach(data => {
  // Clone the template
  const clone = document.importNode(cetegoryHTML.content, true);

  // Fill Data on Element 
  clone.querySelector('img').src = data.image
  clone.querySelector('.category-name').textContent = data.name;

  // Append to the Cetegory
  cetegory.appendChild(clone);
});

// Render Producst 

const productHTML = document.querySelector(".product-template");
const productPage = document.querySelector(".product-page")

products.forEach((data) => {
  // Clone product template
  const clone = document.importNode(productHTML.content , true);

  // fill Data On product Elemenr
  const {image,name,price,discountPrice,quantity} = data;

  clone.querySelector("img").src = image;
  clone.querySelector(".product-name").textContent = name;
  clone.querySelector(".quantity").textContent = quantity;
  clone.querySelector(".product-price").textContent = `₹${price}`;
  clone.querySelector('del').innerText = `₹${discountPrice}`;
  

  // Append To the Product 
  productPage.appendChild(clone)
})




