const searchInput = document.getElementById('search');



function debounce(func, wait) {
    let timeout;
  
    return function executedFunction(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this,   
   args), wait);
    };
  }
  
  // Fungsi pencarian (contoh)
  async function search(query) {
        
    // Di sini Anda akan melakukan permintaan ke API atau database
    try {
      const results = await fetch(`http://localhost:3000/search/${query}`).then(res => res.json()).then(res => res);
      // const {devi = result;
      console.log(results);
      showRecomendation(results.device)
    } catch (error) {
      console.log(error);
    }
  }
  
  // Debounce fungsi pencarian
  const debouncedSearch = debounce(search, 300);

searchInput.addEventListener('input', () => {
    const input = searchInput.value;
    debouncedSearch(input);

})



const recomendation = document.getElementById('recomendation');


function showRecomendation (results) {
  let recomendationResults =  results.slice(0, 6);

  recomendationResults = recomendationResults.map(result => {
    return `
            <div class="w-100">
             <a class= "d-flex p-2 w-100 gap-2" href="/phone/${result.id}">
              <div class="image">
                <img src="${result.img}" alt="" style="width : 40px">
              </div>
              <div class="name fw-bold text-black mt-3">${result.name}</div>
             </a>
            </div>
          `
  }).join('');

  recomendation.innerHTML = recomendationResults;
}

// searchInput.addEventListener('change', function () {
  // if (searchInput.value == "") {
  // }
// })

searchInput.addEventListener('focusout', () => {
  searchInput.value = "";
  setTimeout(()=>{
    recomendation.innerHTML = "";

  }, 2000)
})