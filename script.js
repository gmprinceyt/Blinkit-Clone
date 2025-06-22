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




