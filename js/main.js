//^=========================================

let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;

//*============================================

$(document).ready(() => {
  searchByName("").then(() => {
    $(".loading-screen").fadeOut(500);
    $("body").css("overflow", "auto");
  });

  $(".Search").on("click", () => {
    showSearchInputs()
    closeSideNav()
  })
  $(".Categories").on("click", () => {
    getCategories()
    closeSideNav()
  })
  $(".Area").on("click", () => {
    getArea()
    closeSideNav()
  })
  $(".Ingredients").on("click", () => {
    getIngredients()
    closeSideNav()
  })
  $(".Contact").on("click", () => {
    showContacts()
    closeSideNav()
  })
});

//%===============================================

function openSideNav() {
  $(".side-nav-menu").animate({ left: 0 }, 500);
  $(".open-close-icon").removeClass("fa-align-justify").addClass("fa-x");

  for (let i = 0; i < 5; i++) {
    $(".links li").eq(i).animate({ top: 0 }, (i + 5) * 100);
  }
}

//&===================================================

function closeSideNav() {
  let boxWidth = $(".side-nav-menu .nav-tab").outerWidth();
  $(".side-nav-menu").animate({ left: -boxWidth }, 500);

  $(".open-close-icon").addClass("fa-align-justify").removeClass("fa-x");

  $(".links li").animate({ top: 300 }, 500);
}

//!============================================

$(".side-nav-menu i.open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});

//?============================================

function displayMeals(Meals) {
  let cart = "";

  for (let i = 0; i < 20 ; i++) {
    cart += `
      <div class="col-md-3">
        <div class="meal position-relative overflow-hidden rounded-2" data-meal-id="${Meals[i].idMeal}">
          <img class="w-100" src="${Meals[i].strMealThumb}" alt="" srcset="">
          <div class="meal-layer position-absolute d-flex align-items-center justify-content-center text-black p-2">
            <h3>${Meals[i].strMeal}</h3>
          </div>
        </div>
      </div>`;
  }

  rowData.innerHTML = cart;

  attachMealClickEvent();
}

//&_-----------------------

function attachMealClickEvent() {
  const mealElements = document.querySelectorAll('.meal');

  mealElements.forEach(mealElement => {
    mealElement.addEventListener('click', () => {
      const mealId = mealElement.getAttribute('data-meal-id');
      getMealDetails(mealId);
    });
  });
}

//?========================================================

async function getCategories() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(500);
  searchContainer.innerHTML = "";

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  response = await response.json();

  displayCategories(response.categories);
  $(".inner-loading-screen").fadeOut(500);
}

//?_____________ Display categories function ______________

function displayCategories(Categories) {
  let cartoona = "";

  for (let i = 0; i < Categories.length; i++) {
    cartoona += `
      <div class="col-md-3">
        <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer" data-category="${Categories[i].strCategory}">
          <img class="w-100" src="${Categories[i].strCategoryThumb}" alt="" srcset="">
          <div class="meal-layer position-absolute text-center text-black p-2">
            <h3>${Categories[i].strCategory}</h3>
            <p>${Categories[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
          </div>
        </div>
      </div>`;
  }

  rowData.innerHTML = cartoona;

  attachCategoryClickEvent();
}

//&======================================================

function attachCategoryClickEvent() {
  const categoryElements = document.querySelectorAll('.meal');

  categoryElements.forEach(categoryElement => {
    categoryElement.addEventListener('click', () => {
      const categoryName = categoryElement.getAttribute('data-category');
      getCategoryMeals(categoryName);
    });
  });
}

//*---------------------------------------------------

async function getArea() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);
  searchContainer.innerHTML = "";

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  response = await response.json();

  displayArea(response.meals);
  $(".inner-loading-screen").fadeOut(500);
}

//?++++++=======================================
function displayArea(Area) {
  let cartoona = "";

  for (let i = 0; i < Area.length; i++) {
    cartoona += `
      <div class="col-md-3">
        <div class="area rounded-2 text-center cursor-pointer" data-area="${Area[i].strArea}">
          <i class="fa-solid fa-house-laptop fa-4x"></i>
          <h3>${Area[i].strArea}</h3>
        </div>
      </div>`;
  }

  rowData.innerHTML = cartoona;

  attachAreaClickEvent();
}

//&_____________ Function to attach click event to areas ______________

function attachAreaClickEvent() {
  const areaElements = document.querySelectorAll('.area');

  areaElements.forEach(areaElement => {
    areaElement.addEventListener('click', () => {
      const areaName = areaElement.getAttribute('data-area');
      getAreaMeals(areaName);
    });
  });
}

//?_____________ Function to Fetch ingredients and display them ______________

async function getIngredients() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(500);
  searchContainer.innerHTML = "";

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  response = await response.json();

  displayIngredients(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(500);
}

//?_____________ Function to Display ingredients ______________

function displayIngredients(Ingredients) {
  let cartoona = "";

  for (let i = 0; i < Ingredients.length; i++) {
    cartoona += `
      <div class="col-md-3">
        <div class="ingredient rounded-2 text-center cursor-pointer" data-ingredient="${Ingredients[i].strIngredient}">
          <i class="fa-solid fa-drumstick-bite fa-4x"></i>
          <h3>${Ingredients[i].strIngredient}</h3>
          <p>${Ingredients[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
        </div>
      </div>`;
  }

  rowData.innerHTML = cartoona;

  attachIngredientClickEvent();
}

//&_____________ Function to attach click event to ingredients _______________

function attachIngredientClickEvent() {
  const ingredientElements = document.querySelectorAll('.ingredient');

  ingredientElements.forEach(ingredientElement => {
    ingredientElement.addEventListener('click', () => {
      const ingredientName = ingredientElement.getAttribute('data-ingredient');
      getIngredientsMeals(ingredientName);
    });
  });
}

//?_____________ Function to Fetch meals by category ______________

async function getCategoryMeals(category) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(500);

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(500);
}

//?_____________ Function to Fetch meals by area ______________

async function getAreaMeals(area) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(500);

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(500);
}

//?_____________ Function to Fetch meals by ingredient ______________

async function getIngredientsMeals(ingredients) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(500);

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(500);
}

//?_____________ 

async function getMealDetails(mealID) {
  closeSideNav();
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(500);

  searchContainer.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
  response = await response.json();

  displayMealDetails(response.meals[0]);
  $(".inner-loading-screen").fadeOut(500);
}

//?_____________ 
function displayMealDetails(meal) {
  searchContainer.innerHTML = "";

  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];

  let tagsStr = '';
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let cartoona = `
    <div class="col-md-4">
      <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
      <h2>${meal.strMeal}</h2>
    </div>
    <div class="col-md-8">
      <a href=""><i class="fa-solid fa-circle-xmark closeBtn"></i></a>
      <h2>Instructions</h2>
      <p>${meal.strInstructions}</p>
      <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
      <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
      <h3>Recipes :</h3>
      <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${ingredients}
      </ul>
      <h3>Tags :</h3>
      <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${tagsStr}
      </ul>
      <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
      <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>`;

  rowData.innerHTML = cartoona;

}

//?_____________ 

function showSearchInputs() {
  searchContainer.innerHTML = `
    <div class="row py-4 ">
      <div class="col-md-6 ">
        <input id="searchByNameInput" class="form-control bg-dark text-white" type="text" placeholder="Search By Name">
      </div>
      <div class="col-md-6">
        <input id="searchByFLetterInput" maxlength="1" class="form-control bg-dark text-white" type="text" placeholder="Search By First Letter">
      </div>
    </div>`;

  rowData.innerHTML = "";

  attachSearchEvents();
}

//&_____________ 

function attachSearchEvents() {
  const searchByNameInput = document.getElementById('searchByNameInput');
  const searchByFLetterInput = document.getElementById('searchByFLetterInput');

  searchByNameInput.addEventListener('keyup', () => {
    searchByName(searchByNameInput.value);
  });

  searchByFLetterInput.addEventListener('keyup', () => {
    searchByFLetter(searchByFLetterInput.value);
  });
}

//?_____________ 

async function searchByName(Name) {
  closeSideNav();
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(500);

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${Name}`);
  response = await response.json();
  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".inner-loading-screen").fadeOut(500);
}

//?_____________ 

async function searchByFLetter(Letter) {
  closeSideNav();
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(500);

  Letter == "" ? Letter = "a" : "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${Letter}`);
  response = await response.json();

  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".inner-loading-screen").fadeOut(500);
}

//?_____________ 

function showContacts() {
  rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
  <div class="container w-75 text-center">
      <div class="row g-4">
          <div class="col-md-6">
              <input id="nameInput"   type="text" class="form-control" placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Special characters and numbers not allowed
              </div>
          </div>
          <div class="col-md-6">
              <input id="emailInput"  type="email" class="form-control " placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid *exemple@yyy.zzz
              </div>
          </div>
          <div class="col-md-6">
              <input id="phoneInput"  type="text" class="form-control " placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid Phone Number
              </div>
          </div>
          <div class="col-md-6">
              <input id="ageInput"  type="number" class="form-control " placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age
              </div>
          </div>
          <div class="col-md-6">
              <input  id="passwordInput"  type="password" class="form-control " placeholder="Enter Your Password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
              </div>
          </div>
          <div class="col-md-6">
              <input  id="repasswordInput"  type="password" class="form-control " placeholder="Repassword">
              <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid repassword 
              </div>
          </div>
      </div>
      <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
  </div>
</div> `
  submitBtn = document.getElementById("submitBtn")


  //!_______________ 

  document.getElementById("nameInput").addEventListener("keyup", () => {
    inputsValidation()
  })

  document.getElementById("emailInput").addEventListener("keyup", () => {
    inputsValidation()
  })

  document.getElementById("phoneInput").addEventListener("keyup", () => {
    inputsValidation()
  })

  document.getElementById("ageInput").addEventListener("keyup", () => {
    inputsValidation()
  })

  document.getElementById("passwordInput").addEventListener("keyup", () => {
    inputsValidation()
  })

  document.getElementById("repasswordInput").addEventListener("keyup", () => {
    inputsValidation()
  })

  //!________________ Validate Each input while typing  ____________________ 

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true
  })

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true
  })

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true
  })

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true
  })

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true
  })

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true
  })
}

//^_____________ 
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document.getElementById("nameAlert").classList.replace("d-block", "d-none")

    } else {
      document.getElementById("nameAlert").classList.replace("d-none", "d-block")

    }
  }
  if (emailInputTouched) {

    if (emailValidation()) {
      document.getElementById("emailAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("emailAlert").classList.replace("d-none", "d-block")

    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document.getElementById("ageAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("ageAlert").classList.replace("d-none", "d-block")

    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

    }
  }

  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

    }
  }

  if (nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()) {
    submitBtn.removeAttribute("disabled")
  } else {
    submitBtn.setAttribute("disabled", true)
  }
}

//^_____________ 
function nameValidation() {
  return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

//^_____________ 
function emailValidation() {
  return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

//^_____________
function phoneValidation() {
  return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

//^_____________ 
function ageValidation() {
  return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

//^_____________ 

function passwordValidation() {
  return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

//^_____________ 
function repasswordValidation() {
  return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}