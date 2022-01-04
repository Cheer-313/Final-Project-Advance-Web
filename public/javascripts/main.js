// START DROPDOWN SIDEBAR
$(document).ready(function () {
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
});

// START NEWFEED VIEWS

$(document).ready(function () {
    function modal_active() {
        modal_btn_active.classList.add("modal_active");
    }

    function modal_deactive() {
        modal_btn_active.classList.remove("modal_active");
    }

    let newfeed_Create1 = document.getElementById("firstRow_create_js");
    let modal_btn_active = document.querySelector("#modal");
    let modal_close = document.querySelector(".modal_close");
    let btn_submit_post = document.querySelector("#btn_submit_post");

    newfeed_Create1.addEventListener("click", modal_active);
    modal_close.addEventListener("click", modal_deactive);
    btn_submit_post.addEventListener("click", modal_deactive);

    let btn_setting_post = document.querySelector(".newfeed_post_more");
    let moreSetting = document.querySelector(".more_setting");
    btn_setting_post.addEventListener("click", function () {
        moreSetting.classList.add("active");
    });
});



// END NEWFEED VIEWS




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










/* Giang */
$(document).ready(function () {
    let show = false;
    //set menu
    $("#set-menu").on("click", () => {
        if (show == false) {
            $("#setting-menu").show();
            show = true;
        } else {
            $("#setting-menu").hide();
            show = false;
        }
    });

    //set stt
    $("#set-stt").on("click", () => {
        if (show == false) {
            $("#setting-stt").show();
            show = true;
        } else {
            $("#setting-stt").hide();
            show = false;
        }
    });

    //set cmt
    $("#set-cmt").on("click", () => {
        if (show == false) {
            $("#setting-cmt").show();
            show = true;
        } else {
            $("#setting-cmt").hide();
            show = false;
        }
    });

    //edit profile
    let modal = document.getElementById("myModal");
    let btn = document.getElementById("modaledit");
    let span = document.getElementsByClassName("close");
    let span2 = document.getElementById("saveModalButton");

    btn.onclick = function () {
        modal.style.display = "block";
    };

    span.onclick = function () {
        modal.style.display = "none";
    };

    span2.onclick = function () {
        modal.style.display = "none";
    };
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    //edit post
    let modal2 = document.getElementById("myModal-2");
    let btn2 = document.getElementById("modaledit-2");
    let save2 = document.getElementById("saveModalButton-2");
    let closebtn = document.getElementById("close-edit-post");

    btn2.onclick = function () {
        modal2.style.display = "block";
    };
    closebtn.onclick = function () {
        modal2.style.display = "none";
    };

    save2.onclick = function () {
        modal2.style.display = "none";
    };

    //edit acc
    let modal3 = document.getElementById("myModal-3");
    let btn3 = document.getElementById("modaledit-3");
    let save3 = document.getElementById("saveModalButton-3");
    let closebtn3 = document.getElementById("close-edit-acc");

    btn3.onclick = function () {
        modal3.style.display = "block";
    };
    closebtn3.onclick = function () {
        modal3.style.display = "none";
    };

    save3.onclick = function () {
        modal3.style.display = "none";
    };
});
