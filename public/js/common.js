console.log("common.js file has been included.")

function togglePassword(elem) {
    const passwordVisibility = elem.getAttribute('password-visibility');
    const passwordElems = document.querySelectorAll('.password_input');

    for (let item of passwordElems) {
        if (passwordVisibility == "visible") {
            item.setAttribute('type', 'password');
        } else {
            item.setAttribute('type', 'text');
        }
    }
    if (passwordVisibility == "visible") {
        elem.classList.replace('fa-eye', 'fa-eye-slash');
        elem.setAttribute('password-visibility', 'hide');
    } else {
        elem.classList.replace('fa-eye-slash', 'fa-eye');
        elem.setAttribute('password-visibility', 'visible');
    }
}

// (function () {
//     console.log("IIF function is running")
//     const storageValue = sessionStorage.getItem('sidebar-collapse');
//     if (storageValue === true) {
//         document.body.classList.add('sidebar-collapse');
//     }
// })()