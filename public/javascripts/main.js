// START DROPDOWN SIDEBAR
let dropdown = document.getElementById("js-dropdown-btn");
let menuBtn = document.getElementById("js-menu-mobile-btn");
let dropdownContent = document.getElementById("js-dropdown-container");
let menuDropdown = document.getElementById("sidebar");

dropdown.addEventListener("click", function () {
    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
    } else {
        dropdownContent.style.display = "block";
    }
});

menuBtn.addEventListener("click", function () {
    if (menuDropdown.style.display === "block") {
        menuDropdown.style.display = "none";
    } else {
        menuDropdown.style.display = "block";
    }
});
// END DROPDOWN SIDEBAR

// START PAGES NOTIFY

// function swapPages(event, page) {
//     let i, tabContent, tabLinks;

//     tabContent = document.getElementsByClassName("notify-table-content");
//     for (i = 0; i < tabContent.length; i++) {
//         tabContent[i].style.display = "none";
//     }
//     tabLinks = document.getElementsByClassName("tablinks");
//     for (i = 0; i < tabLinks.length; i++) {
//         tabLinks[i].className = tabLinks[i].className.replace("active", "");
//     }
//     document.getElementById(page).style.display = "table";
//     event.currentTarget.className += "active";

// }

// END PAGES NOTIFY

// START CREATE ACCOUNT

// const email = document.getElementById("email")
// const password = document.getElementById("password")
// const form = document.getElementById("form1")
// const errorElement = document.getElementById("error")

// form.addEventListener('submit', (e) => {
//     let message = []

//     e.preventDefault()

//     if (email.value === '' || email.value == null) {
//         message.push("email is required")
//     }

//     if (password.value.length <= 6) {
//         message.push("Password must be longer than 6 characters")
//     }

//     if (password.value.length >= 20) {
//         message.push("password must be less than 20 characters")
//     }

//     if (password.value === 'password') {
//         message.push("Password cannot be password")
//     }

//     if (message.length > 0) {
//         errorElement.innerText = message.join(', ')
//     }

//     const values = document.querySelectorAll('input[class=checkbox]:checked')

//     console.log(values)

// })

// END CREATE ACCOUNT

// TINYMCE
tinymce.init({
    selector: "#mytextarea",
    plugins: "lists",
    toolbar: "undo redo | bold italic underline | numlist bullist",
    menubar: false,
    branding: false,
});

// DATATABLES PLUGIN

// notify view
$(document).ready(function () {
    $("#notiTable").DataTable({ bSort: false });
});

// manageNotify view
$(document).ready(function () {
    $("#manageNotifyTable").DataTable();
});

// SOCKET
const socket = io();

// Get infor notification from server
socket.on("notify", (noti) => {
    console.log(noti);
    alert(noti.title);
});