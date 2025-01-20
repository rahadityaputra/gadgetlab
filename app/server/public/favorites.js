const deleteButtons = document.querySelectorAll('.delete');

deleteButtons.forEach(button => {
    button.addEventListener('click', deleteFavoriteDevice);
})


async function deleteFavoriteDevice() {
    console.log('p bang');
    const id_device = this.dataset.deviceId;
    const id_user = this.dataset.idUser;
    
    try {
        const result = await fetch(`http://localhost:3000/favorites/delete/${id_device}`, {
            method : "DELETE"
        })
        console.log(await result.json());
        window.location.replace(`http://localhost:3000/favorites`);
    } catch (error) {
        console.log(error);
    }
}
