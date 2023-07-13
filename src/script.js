"use strict";

let baseURL = "https://restcountries.com/v2";
let regions = [];

// ----------------- data fetching ----------------

async function getCountries() {
  try {
    const response = await fetch(`${baseURL}/all`);
    const result = await response.json();
    renderCountries(result);
    filterRegion(result);
  } catch (err) {
    console.log(err.message);
  } finally {
    console.log("done fetching countries");
    $(".loader-wrapper").style.display = "none"
  }
}

getCountries();

// ------------------ data render ---------------------

function renderCountries(countries) {
  if (countries.length) {
    countries.forEach((element) => {
      const card = createElement(
        "div",
        "card w-[267px] shadow-sm bg-white dark:text-white dark:bg-[#2B3844]",
        `

         <img src="${
           element?.flag
         }" alt="germany" class="w-full h-[160px] object-cover">

         <div class="p-6">

             <h1 class="text-lg font-extrabold mb-4">${element?.name}</h1>

             <ul>
                 <li class="leading-4 mb-4">
                     <p>
                         <strong>Population:</strong> ${String(
                           element?.population
                         ).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                     </p>
                 </li>
                 <li class="leading-4 mb-4">
                     <p>
                         <strong>Region:</strong> ${element?.region}
                     </p>
                 </li>
                 <li class="leading-4 mb-4">
                     <p>
                         <strong> Capital:</strong> ${
                           element?.capital ? element?.capital : "-"
                         }
                     </p>
                 </li>
                  <a href="./country.html" data-fullname="${
                    element?.name
                  }" class="px-3 py-2 bg-cyan-600 rounded-xl text-white"> Details </a>
             </ul>

         </div>  `
      );

      $("#wrapper").append(card);
    });
  }
}

// -------------------------- UNIQUE REGION FILTE FUNCTION --------------------------------------

function filterRegion(data) {
  if (data) {
    let res = data.map((item) => {
      return item.region;
    });
    regions = Array.from(new Set(res));

    renderOptions(regions);
  }
}

// -------------------------- RENDER OPTIONS  --------------------------------------

function renderOptions(data) {
  if (data) {
    data?.sort().forEach((el) => {
      const option = createElement("option", "options", el);
      $("#region").append(option);
    });
  }
}

// ------------------------- SEARCH BY NAME --------------------------------

$("#search").addEventListener("keyup", (e) => {
  $("#wrapper").innerHTML = "";
  renderSearch(e.target.value);
});

async function renderSearch(text) {
  try {
    const response = await fetch(`${baseURL}/name/${text}`);
    const result = await response.json();

    renderCountries(result);

    if (!text.length) {
      getCountries();
    }
  } catch (err) {
    alert(err.message);
  }

}

// ------------------------- SORT  BY REGIONS --------------------------------

$("#region").addEventListener("change", (e) => {
  $("#wrapper").innerHTML = "";
  renderRegions(e.target.value);
});

async function renderRegions(text) {
  try {
    const response = await fetch(`${baseURL}/region/${text}`);
    const result = await response.json();

    renderCountries(result);

    if (!text.length) {
      getCountries();
    }
  } catch (err) {
    alert(err.message);
  }
}

$("#wrapper").addEventListener("click", (e) => {
  if (e.target.classList.contains("bg-cyan-600")) {
    localStorage.setItem("fullname", e.target.getAttribute("data-fullname"));
  }
});

const dark = document.getElementById("dark");
dark.addEventListener("input", (e) => {
  document.documentElement.classList.toggle("dark");
});
