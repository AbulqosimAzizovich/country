const bod = document.querySelector("body");
const navbar = document.getElementById("navbar");
const wrapper1 = document.getElementById("wrapper");
const card = document.querySelector(".card");
const inp = document.getElementById("default-search");

let regi = document.querySelector("#region");
let searchBy = document.querySelector("#search-by");

function render(arr) {
  let res = "";
  arr.map((value) => {
    res += `
            <div id="country-card" data-code="${
              value.alpha3Code
            }" class=" mx-auto w-[264px] h-[370px] bg-white border border-gray-200 rounded-lg shadow dark:bg-[#2B3844] dark:border-gray-700">
                <div class="h-[160px] w-full object-cover overflow-hidden ">
                    <img class="rounded-t-lg w-full h-full" src="${
                      value.flags.svg
                    }" alt="${value.name}" />
                </div>
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-[18px] font-extrabold tracking-tight text-gray-900 dark:text-white" title="${
                          value.name
                        }">${
      value.name.length > 20 ? value.name.slice(0, 20) + "..." : value.name
    } </h5>
                    </a>
                    <div class="flex items-center">
                        <h4 class="font-semibold dark:text-white text-[16px]">Population: </h4>
                        <p class="font-light dark:text-white">${
                          value.population
                        }</p>
                    </div>
                    
                    <div class="flex items-center" >
                        <h4 class="font-semibold text-[16px] dark:text-white">Region: </h4>
                        <p class="font-light dark:text-white">${
                          value.region
                        }</p>
                    </div>
                    
                    <div class="flex items-center" >
                        <h4 class="font-semibold text-[16px] dark:text-white">Capital: </h4>
                        <p class="font-light dark:text-white">${
                          value.capital
                        }</p>
                    </div>
                    <button class="px-3 py-2 w-full bg-blue-400 rounded-xl text-[20px] font-medium mt-4 dark:text-[white]" id="country-card-btn"> Details </button>
                </div>
            </div>
        `;
  });

  wrapper1.innerHTML = res;
}

wrapper1.addEventListener("click", (e) => {
  if (e.target.id.includes("country-card-btn")) {
    let alpha3Code =
      e.target.parentElement.parentElement.getAttribute("data-code");
    window.localStorage.setItem("code", alpha3Code);
    window.location.href = "http://127.0.0.1:5501/details.html";
  }
});

render(davlatlar);

let reg = [];
davlatlar.forEach((val) => {
  reg.push(val.region);
});
let regions = [...new Set(reg)];

regions.forEach((v) => {
  let opt = document.createElement("option");
  opt.value = v;
  opt.textContent = v;
  regi.append(opt);
});

let keyzz = [];
davlatlar.forEach((v) => {
  for (const key in v) {
    keyzz.push(key);
  }
});

let keyz = [...new Set(keyzz)];

keyz.forEach((key) => {
  let opt = document.createElement("option");
  opt.value = key;
  opt.textContent = key;
  searchBy.append(opt);
});

inp.addEventListener("input", (e) => {
  let res = davlatlar.filter((v) =>
    v[searchBy.value]?.toLowerCase()?.includes(e.target.value.toLowerCase())
  );
  render(res);
});

regi.addEventListener("input", (e) => {
  let res = davlatlar.filter((v) => v.region === e.target.value);
  render(res);
});

const dark = document.getElementById("dark");
dark.addEventListener("input", (e) => {
  document.documentElement.classList.toggle("dark");
});
