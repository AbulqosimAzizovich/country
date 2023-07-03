const bod = document.querySelector("body")
const navbar = document.getElementById("navbar");
const wrapper1 = document.getElementById("wrapper");



const card = document.querySelector(".card");

const regions1 = [];

let reg = document.querySelector("#region");

davlat.forEach((e) => {
    regions1.push(e.region);
})

let b = Array.from(new Set(regions1));

b.forEach((e) => {
    let a = document.createElement("option");
    a.textContent = e;
    reg.append(a);
});

reg.addEventListener('change', (ec) => {

    wrapper1.innerHTML = "";

    const c = davlat.filter((el) => {
        return el.region.toLowerCase() == ec.target.value.toLowerCase()
    })

    render(c);
})


const dark = document.getElementById("dark");
let count = 0;

dark.addEventListener("change", (e) => {
    count += 1
    console.log(count);
    if (count % 2 == 1){
        bod.style.color = "#fff"
        bod.style.backgroundColor = "#202C36";
        navbar.style.backgroundColor = "#2B3844";
        bod.style.transition = "0.2s";
        navbar.style.transition = "0.2s";
    }else{
        bod.style.backgroundColor = "white";
        navbar.style.backgroundColor = "#fff";
        bod.style.color = "#111517";
    }
})



function render(data) {
  let res = "";
  data.map((value) => {
    res += `
            <div class="mx-auto w-[264px] h-[336px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 card">
                <a href="#">
                    <img class="rounded-t-lg" src="${value.flags.svg}" alt="${value.name}" />
                </a>
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-[18px] font-extrabold tracking-tight text-gray-900 dark:text-white">${value.name}</h5>
                    </a>
                    <div class="flex items-center">
                        <h4 class="font-semibold text-[16px]">Population: </h4>
                        <p class="font-light">${value.population}</p>
                    </div>
                    
                    <div class="flex items-center" >
                        <h4 class="font-semibold text-[16px]">Region: </h4>
                        <p class="font-light">${value.region}</p>
                    </div>
                    
                    <div class="flex items-center" >
                        <h4 class="font-semibold text-[16px]">Capital: </h4>
                        <p class="font-light">${value.capital}</p>
                    </div>
                </div>
            </div>
        `;
  });

  wrapper1.innerHTML = res;
}

render(davlat);