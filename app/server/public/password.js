const passwordForm = document.getElementById('password-form');
const passwordInput = document.getElementById('password');
const newPasswordInput = document.getElementById('newPassword');


passwordForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const password = passwordInput.value;
    const newPassword= newPasswordInput.value;
    console.log(password, newPassword);

    try {
        const result = await fetch('http://localhost:3000/password', {
            method : "PUT",
             headers: {
                 "Content-Type": "application/json",
             },
             body : JSON.stringify({
                 "password" : password,
                 "newPassword" : newPassword,
             }),
         });

         const a = await result.json();
         
        window.location.replace(`http://localhost:3000`);

    } catch (error) {
        console.log(error);
    }

})