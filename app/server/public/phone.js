const reviewForm = document.getElementById('review');
const reviewTextInput = document.getElementById('reviewText');
const ratingInput = document.getElementById('reviewRating');
const idUserInput = document.getElementById('idUser');
const idDeviceInput = document.getElementById('idDevice');


reviewForm.addEventListener('submit',async function (event) {
    event.preventDefault();
    console.log('hhahahah');
    if (!idUserInput) {
        window.location.replace("http://localhost:3000/login");
        return;
    }
    
    const reviewText = reviewTextInput.value;
    const rating = ratingInput.value;
    const id_user = idUserInput.value; 
    const id_device = idDeviceInput.value;


    reviewTextInput.value = "";
    ratingInput.value = "5";

    try {
        const result = await fetch('http://localhost:3000/review', {
             headers: {
                 "Content-Type": "application/json",
             },
             body : JSON.stringify({
                 review_text : reviewText,
                 id_user : id_user,
                 id_device : id_device,
                 rating : rating
             }),
             method : "POST"
         });
         
        window.location.replace(`http://localhost:3000/phone`);

    } catch (error) {
        
    }

})


const favoriteButton = document.getElementById('favorite');
const deviceImgInput = document.getElementById('deviceImg');
const deviceNameInput = document.getElementById('deviceName');

favoriteButton.addEventListener('click', async function () {


    if (!idUserInput) {
        window.location.replace("http://localhost:3000/login");
        return;
    }

    const id_user = idUserInput.value; 
    const id_device = idDeviceInput.value;
    const device_img = deviceImgInput.value;
    const device_name = deviceNameInput.value;

    try {
        const result = await fetch('http://localhost:3000/favorites', {
             headers: {
                 "Content-Type": "application/json",
             },
             body : JSON.stringify({
                 id_user,
                 id_device,
                 device_name,
                 device_img
             }),
             method : "POST"
         }).then(res => res.json());
     
         console.log(result);
    } catch (error) {
        
    }
})