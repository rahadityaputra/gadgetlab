const searchInput1 = document.getElementById("search-phone-1");
const searchInput2 = document.getElementById("search-phone-2");
const recomendation1 = document.querySelector(".recomendation-phone-1");
const recomendation2 = document.querySelector(".recomendation-phone-2");
const phone1 = document.querySelector("phone-1");
const phone2 = document.querySelector("phone-2");

function debounce2(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Fungsi pencarian (contoh)
async function search(query, recomendationBox) {
  // Di sini Anda akan melakukan permintaan ke API atau database
  try {
    const results = await fetch(`http://localhost:3000/search/${query}`)
      .then((res) => res.json())
      .then((res) => res);
    // const {devi = result;
    // console.log(results);
    showRecomendation2(results.device, recomendationBox);
  } catch (error) {
    console.log(error);
  }
}

// Debounce fungsi pencarian
const debouncedSearch2 = debounce2(search, 300);

searchInput1.addEventListener("input", () => {
  const input = searchInput1.value;
  debouncedSearch2(input, recomendation1);
});

searchInput2.addEventListener("input", () => {
  const input = searchInput2.value;
  debouncedSearch2(input, recomendation2);
});

function showRecomendation2(results, recomendationBox) {
    console.log(recomendationBox);
  let recomendationResults = results.slice(0, 6);

  let phone;
  if (recomendationBox.dataset.phone == "1") {
    phone = "phone-1";
  } else {
    phone = "phone-2";
  }

  recomendationResults = recomendationResults
    .map((result) => {
      return `
             <div class=" d-flex p-2 w-100 bg-white cursor-pointer" >
              <div class="image w-25">
                <img src="${result.img}" alt="" style="width : 40px" class="${phone}" data-img="${result.img}" data-id="${result.id}"  data-name="${result.name}">
              </div>
              <div class="name fw-bold text-black ms-5 text-center">${result.name}</div>
             </div>
            `;
    })
    .join("");
  recomendationBox.innerHTML = recomendationResults;
}

// searchInput.addEventListener('change', function () {
// if (searchInput.value == "") {
// }
// })

searchInput.addEventListener("focusout", () => {
  searchInput.value = "";
  setTimeout(() => {
    recomendation.innerHTML = "";
  }, 2000);
});


document.body.addEventListener('click', function (event) {
    const element = event.target;
    console.log(element);
    if(element.classList.contains('phone-1')) {
        console.log('masuk brader');
        document.querySelector('.choose-phone-1').innerHTML = 
        `
        <div class="w-100 d-flex justify-content-center">
        <div class="image">
        <img src="${element.dataset.img}" alt="" style="width : 40px">
        </div>
        <div class="name fw-bold text-white">${element.dataset.name}</div>
        </div>
        `;
        
        document.querySelector('.choose-phone-1').dataset.id = element.dataset.id;
    } else if(element.classList.contains('phone-2')) {
        console.log('masuk brader');
        document.querySelector('.choose-phone-2').innerHTML = 
        `
        <div class="w-100">
        <div class="image">
        <img src="${element.dataset.img}" alt="" style="width : 40px">
        </div>
        <div class="name fw-bold text-white">${element.dataset.name}</div>
        </div>
        ` ;
    
        document.querySelector('.choose-phone-2').dataset.id = element.dataset.id;
    }
})


const compare = document.querySelector('.compare');

function renderDetailDevices(data, compareContainer) {
  // Clear the container
  compareContainer.innerHTML = "";

  // Create a table for each phone
  const phoneKeys = Object.keys(data);
  phoneKeys.forEach((phoneKey, index) => {
    const phone = data[phoneKey];

    // Create a container for phone details
    const phoneContainer = document.createElement("div");
    phoneContainer.style.width = "50%";
    phoneContainer.style.display = "inline-block";
    phoneContainer.style.verticalAlign = "top";
    phoneContainer.style.textAlign = "center";

    // Add phone image and name
    const phoneImage = document.createElement("img");
    phoneImage.src = phone.img;
    phoneImage.alt = phone.name;
    phoneImage.style.width = "150px";
    phoneImage.style.height = "auto";
    phoneContainer.appendChild(phoneImage);

    const phoneName = document.createElement("h3");
    phoneName.textContent = phone.name;
    phoneContainer.appendChild(phoneName);

    // Create a table for specifications
    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.marginTop = "10px";

    // Add rows for each category
    phone.detailSpec.forEach((category) => {
      // Add category as a header row
      const headerRow = document.createElement("tr");
      const headerCell = document.createElement("th");
      headerCell.colSpan = 2;
      headerCell.style.backgroundColor = "black";
      headerCell.style.padding = "10px";
      headerCell.style.textAlign = "left";
      headerCell.textContent = category.category;
      headerRow.appendChild(headerCell);
      table.appendChild(headerRow);

      // Add specifications as rows
      category.specifications.forEach((spec) => {
        const specRow = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = spec.name.trim();
        nameCell.style.padding = "8px";
        nameCell.style.border = "1px solid #ddd";
        nameCell.style.fontWeight = "bold";
        specRow.appendChild(nameCell);

        const valueCell = document.createElement("td");
        valueCell.textContent = spec.value.trim();
        valueCell.style.padding = "8px";
        valueCell.style.border = "1px solid #ddd";
        specRow.appendChild(valueCell);

        table.appendChild(specRow);
      });
    });

    phoneContainer.appendChild(table);
    compareContainer.appendChild(phoneContainer);
  });
}



const compareForm = document.getElementById('compare-form');

compareForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const id_phone1 = document.querySelector('.choose-phone-1').dataset.id;
    const id_phone2 = document.querySelector('.choose-phone-2').dataset.id;

    try {
        let results = await fetch(`http://localhost:3000/compare/${id_phone1}/${id_phone2}`);
        results = await results.json();
        console.log(results);
        renderDetailDevices(results.data, compare);

    } catch (error) {
        console.log(error);
    }

    
})

searchInput1.addEventListener('focusout', () => {
    searchInput1.value = "";
    setTimeout(()=>{
      recomendation1.innerHTML = "";
  
    }, 2000)
  })

searchInput2.addEventListener('focusout', () => {
    searchInput2.value = "";
    setTimeout(()=>{
      recomendation2.innerHTML = "";
  
    }, 2000)
  })