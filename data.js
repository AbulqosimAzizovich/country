const bod = document.querySelector("body");
const navbar = document.getElementById("navbar");
const wrapper1 = document.getElementById("wrapper");

const card = document.querySelector(".card");

const regions1 = [];

let reg = document.querySelector("#region");

davlat.forEach((e) => {
  regions1.push(e.region);
});

let b = Array.from(new Set(regions1));

b.forEach((e) => {
  let a = document.createElement("option");
  a.textContent = e;
  reg.append(a);
});

reg.addEventListener("change", (ec) => {
  wrapper1.innerHTML = "";

  const c = davlat.filter((el) => {
    return el.region.toLowerCase() == ec.target.value.toLowerCase();
  });

  render(c);
});

const dark = document.getElementById("dark");
let count = 0;

dark.addEventListener("input", (e) => {
  document.documentElement.classList.toggle("dark");
});

function render(data) {
  let res = "";
  data.map((value) => {
    res += `
            <div class="mx-auto w-[264px] h-[336px] bg-white border border-gray-200 rounded-lg shadow dark:bg-[#2B3844] dark:border-gray-700">
                <a href="#">
                    <img class="rounded-t-lg" src="${value.flags.svg}" alt="${value.name}" />
                </a>
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-[18px] font-extrabold tracking-tight text-gray-900 dark:text-white">${value.name}</h5>
                    </a>
                    <div class="flex items-center">
                        <h4 class="font-semibold dark:text-white text-[16px]">Population: </h4>
                        <p class="font-light dark:text-white">${value.population}</p>
                    </div>
                    
                    <div class="flex items-center" >
                        <h4 class="font-semibold text-[16px] dark:text-white">Region: </h4>
                        <p class="font-light dark:text-white">${value.region}</p>
                    </div>
                    
                    <div class="flex items-center" >
                        <h4 class="font-semibold text-[16px] dark:text-white">Capital: </h4>
                        <p class="font-light dark:text-white">${value.capital}</p>
                    </div>
                </div>
            </div>
        `;
  });

  wrapper1.innerHTML = res;
}

render(davlat);
