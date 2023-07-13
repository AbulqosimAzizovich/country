"use strict";

let fullNameCountry = localStorage.getItem("fullname");
let baseURL = "https://restcountries.com/v2";

const goback=() => {
    location.replace("./index.html")
}

window.addEventListener("DOMContentLoaded", () => {
  getCountry(fullNameCountry);
});

async function getCountry(isName) {
  try {
    const res = await fetch(`${baseURL}/name/${isName}?fullText=true`);
    const result = await res.json();

    const c = result[0];
    // console.log(c.borders, c);

      $("#wrapper").innerHTML = `

                   <div class="container mx-auto">
      <button onclick="goback()" class="flex items-center gap-[10px] cursor-pointer mb-[80px]">
        <i class="bx bx-left-arrow-alt text-[30px]"></i>
        <p class="font-normal text-[20px] ">Back</p>
      </button>

      <div class="flex items-center gap-[121px]">
        <img
          class="w-[559px] h-[483px]"
          src="${c.flags.svg}"
          alt="${c.name}"
        />

          <div class="">
            <h1 class="font-extrabold text-[32px] mb-[23px]">
              ${c.name}
            </h1>
            <div class="flex items-start gap-[141px]">
              <ul>
                <li><strong>Native name:</strong> ${c.nativeName}</li>
                <li><strong>Population:</strong> ${c.population}</li>
                <li><strong>Region:</strong> ${c.region}</li>
                <li><strong>Sub Region:</strong> ${c.subregion}</li>
                <li><strong>Capital:</strong> ${c.capital}</li>
              </ul>

              <ul>
                <li>
                  <strong>Top level domain:</strong> ${c.topLevelDomain}
                </li>
                <li>
                  <strong>Currencies:</strong> ${c.currencies[0].name}
                </li>
                <li>
                  <strong>Languages:</strong> ${c.languages.map((e) => {
                    return e.name;
                  })};
                </li>
              </ul>
            </div>

            <div class="flex mt-[70px] gap-4">
                <h2 class="font-bold ">Border Countries:</h2>
                  ${c?.borders.map((e) => {
                    return `<span class="mx-2 w-[96px] h-[28px] shadow-xl rounded-[2px] py-1 px-7">${e}</span>`;
                  })}
            </div>
        </div>

      </div>
    </div>
        `;
  } catch (err) {
    console.log("Error message");
  }
  finally{
     $(".loader-wrapper").style.display = "none";
  }
}


const dark = document.getElementById("dark");
dark.addEventListener("input", (e) => {
  document.documentElement.classList.toggle("dark");
});



// function singCont(s_data) {
//   let [singleCountry] = s_data.filter(
//     (e) => e.alpha3Code === localStorage.getItem("fullname")
//   );
//   console.log(singleCountry);
// //   render(singleCountry);
// }

// function render(data) {

// }

