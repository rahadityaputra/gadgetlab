const showPassword = document.getElementById('showPassword');
const passwordInput = document.getElementById('password');
const passwordConfirmation = document.getElementById('passwordConfirmation');

showPassword.addEventListener('click', () => {
    if (showPassword.checked) {
        passwordInput.type = "text";
        if (passwordConfirmation) {
            passwordConfirmation.type = "text";
        }
    } else {
        passwordInput.type = "password";
        if (passwordConfirmation) {
            passwordConfirmation.type = "password";
        }
    }
})