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

// START POST
// Get All Post
if(window.location.pathname == "/"){
    window.onload = getAllPost(1);
}
$(document).ready(function () {
    // Load more when scroll to the end page
    if (window.location.pathname == "/") {
        let nextPage = 2;
        let lengthPost = 10;
        window.onscroll = function (ev) {
            if ($(window).scrollTop() + $(window).height() == $(document).height() && lengthPost != 0) {
                lengthPost = getAllPost(nextPage);
                nextPage++;
            }
        };
    }

    // // Load Profile
    // if(window.location.pathname == "/profile"){
    //     let _idUser = document.getElementById("userId").getAttribute("value");
    //     console.log("Olalalala");
    //     getPostByUserId(_idUser);
    // }
    
});

function getIdUrlYoutube(url){
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return "error";
    }
}

function getAllPost(page) {
    var lengthPost = 0;
    $.ajax({
        type: "GET",
        url: `/api/posts/page/${page}`,
        data: "",
        async: false,
        dataType: "json",
        success: function (res) {
            if ("error" in res) {
                console.log(res.error);
            } else {
                // for(let i of res.result){
                //     console.log(i)
                // }

                for (let post of res.result) {
                    console.log(post);

                    const div = document.createElement("div");
                    div.classList.add("newfeed_content_post");
                    let date = new Date(post.date);

                    // Check exist video url and image post
                    let postBodyUpload = ``;
                    let embedUrl = `https://www.youtube.com/embed/${getIdUrlYoutube(post.video)}`;
                    if (post.image && post.video) {
                        postBodyUpload = `
                            <img src="${post.image}" alt="">
                            <iframe src="${embedUrl}"></iframe>
                        `;
                    } else if (post.image) {
                        postBodyUpload = `
                            <img src="${post.image}" alt="">
                        `;
                    } else if (post.video) {
                        postBodyUpload = `
                            <iframe src="${embedUrl}"></iframe>
                        `;
                    }

                    // fetch commment here
                    var listComment = ``;
                    post.comment.forEach((comment) => {
                        let result = getCommentById(comment._id);
                        if (result) {
                            console.log(result);
                            let comment = `
                                <div class="user_comment">
                                    <i class="ti-user"></i>
                                    <div class="comment_text">
                                        <a href="/profile/${result.commentBy.authId}"><h5>${result.commentBy.fullname}</h5></a>
                                        <p class="comment_text_content">${result.content}</p>
                                        <div class="comment_more">
                                            <i class="ti-more-alt"></i>
                                        </div>
                                    </div>
                                </div>
                            `;
                            listComment = listComment + comment;
                        }
                    });

                    let content = `
                            <div class="newfeed_post_header">
                                <div class="newfeed_post_info">
                                    <i class="ti-user"></i>
                                    <div class="post_NameDate">
                                        <a href="/profile/${post.postedBy.authId}"><p>${post.postedBy.fullname}</p></a>
                                        <span>${date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()}</span>
                                    </div>
                                </div>
                                <div class="newfeed_post_more">
                                    <i class="ti-more-alt"></i>
                                    <ul class="more_setting">
                                        <li>Chỉnh Sửa</li>
                                        <li>Xóa</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="newfeed_post_body">
                                <div class="post_body_text">
                                    <p>${post.content}</p>
                                </div>
                                <div class="post_body_upload">
                                    ${postBodyUpload}
                                </div>
                            </div>
                            <div class="newfeed_post_comment">
                                ${listComment}
                            </div>
                            <form action="/api/comment/" method="post" class="newfeed_post_createComment formCreateComment">
                                <i class="ti-user"></i>
                                <input type="hidden" name="_idPost" value="${post._id}"></input>
                                <input type="text" name="content" placeholder="Viết bình luận"></input>
                            </form>
                    `;
                    div.innerHTML = content;
                    const list = document.getElementById("postHere");
                    list.appendChild(div);
                }
            }
            lengthPost = Object.keys(res.result).length;
        },
    });
    return lengthPost;
}

function getPostByUserId(_idUser) {
    var lengthPost = 0;
    $.ajax({
        type: "GET",
        url: `/api/posts/user/${_idUser}`,
        data: "",
        async: false,
        dataType: "json",
        success: function (res) {
            if ("error" in res) {
                console.log(res.error);
            } else {
                // for(let i of res.result){
                //     console.log(i)
                // }

                for (let post of res.result) {
                    const div = document.createElement("div");
                    div.classList.add("newfeed_content_post");
                    let date = new Date(post.date);

                    // Check exist video url and image post
                    let postBodyUpload = ``;
                    let embedUrl = `https://www.youtube.com/embed/${getIdUrlYoutube(post.video)}`;
                    if (post.image && post.video) {
                        postBodyUpload = `
                            <img src="${post.image}" alt="">
                            <iframe src="${embedUrl}"></iframe>
                        `;
                    } else if (post.image) {
                        postBodyUpload = `
                            <img src="${post.image}" alt="">
                        `;
                    } else if (post.video) {
                        postBodyUpload = `
                            <iframe src="${embedUrl}"></iframe>
                        `;
                    }

                    // fetch commment of post here
                    var listComment = ``;
                    post.comment.forEach((comment) => {
                        let result = getCommentById(comment._id);
                        if (result) {
                            console.log(result);
                            let comment = `
                                <div class="user_comment">
                                    <i class="ti-user"></i>
                                    <div class="comment_text">
                                        <h5>${result.commentBy.fullname}</h5>
                                        <p class="comment_text_content">${result.content}</p>
                                        <div class="comment_more">
                                            <i class="ti-more-alt"></i>
                                        </div>
                                    </div>
                                </div>
                            `;
                            listComment = listComment + comment;
                        }
                    });

                    let content = `
                        <div class="newfeed_post_header">
                            <div class="newfeed_post_info">
                                <i class="ti-user"></i>
                                <div class="post_NameDate">
                                    <p>${post.postedBy.fullname}</p>
                                    <span>${date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()}</span>
                                </div>
                            </div>
                            <div class="newfeed_post_more">
                                <i class="ti-more-alt"></i>
                                <ul class="more_setting">
                                    <li>Chỉnh Sửa</li>
                                    <li>Xóa</li>
                                </ul>
                            </div>
                        </div>
                        <div class="newfeed_post_body">
                            <div class="post_body_text">
                                <p>${post.content}</p>
                            </div>
                            <div class="post_body_upload">
                                ${postBodyUpload}
                            </div>
                        </div>
                        <div class="newfeed_post_comment">
                            ${listComment}
                        </div>
                        <form action="/api/comment/" method="post" class="newfeed_post_createComment formCreateComment">
                            <i class="ti-user"></i>
                            <input type="hidden" name="_idPost" value="${post._id}"></input>
                            <input type="text" name="content" placeholder="Viết bình luận"></input>
                        </form>
                    `;
                    div.innerHTML = content;

                    const list = document.getElementById("pastHere");
                    list.insertBefore(div, list.childNodes[0]);
                }
            }
            lengthPost = Object.keys(res.result).length;
        },
    });
    return lengthPost;
}

// Create Post
$("#formCreatePost").submit(function (e) {
    e.preventDefault();

    let form = $(this);
    let url = form.attr("action");
    let formData = new FormData(form[0]);

    $.ajax({
        method: "POST",
        processData: false,
        contentType: false,
        cache: false,
        enctype: "multipart/form-data",
        url: url,
        data: formData,
        dataType: "json",
        success: function (res) {
            if (!"error" in res) {
                console.log(res.message);
            } else {
                console.log(res.message);
            }
            location.reload();
        },
    });
});

// Update Post
$("#formUpdatePost").submit(function (e) {
    e.preventDefault();

    let form = $(this);
    let url = form.attr("action");
    let formData = new FormData(form[0]);

    $.ajax({
        method: "POST",
        processData: false,
        contentType: false,
        cache: false,
        enctype: "multipart/form-data",
        url: url,
        data: formData,
        dataType: "json",
        success: function (res) {
            if (!"error" in res) {
                console.log(res.message);
            } else {
                console.log(res.message);
            }
            location.reload();
        },
    });
});

// Delete Post
$("#button").click(() => {
    let _idPost = document.getElementById("id").value;
    
    $.ajax({
        type: "delete",
        url: `/api/posts/${_idPost}`,
        dataType: "dataType",
        success: function (res) {
            if ("error" in res) {
                console.log("ERROR: ");
                console.log(res.error);
            } else {
                location.reload();
            }
        }
    });
})

// END POST

// START COMMENT
function getCommentById(id){
    var commentDetail = null;
    $.ajax({
        type: "GET",
        url: `/api/comment/${id}`,
        data: "",
        async: false,
        dataType: "json",
        success: function (res) {
            if ("error" in res) {
                console.log("ERROR: ");
                console.log(res.error);
            } else {
                commentDetail = res.result;
            }
        },
    });
    return commentDetail;
}

$(".formCreateComment").submit(function (e) {
    e.preventDefault();

    let form = $(this);
    let url = form.attr("action");

    $.ajax({
        method: "POST",
        async: false,
        processData: false,
        url: url,
        data: form.serialize(),
        dataType: "json",
        success: function (res) {
            if (!"error" in res) {
                console.log(res);
            } else {
                console.log(res);
                location.reload();
            }
        },
    });
});

// START NEWFEED VIEWS

$(document).ready(function () {
    let newfeed_Create1 = document.getElementById("firstRow_create_js");
    let modal_btn_active = document.querySelector("#modal");
    let modal_close = document.querySelectorAll(".modal_close");
    let btn_submit_post = document.querySelector("#btn_submit_post");

    function modal_active() {
        modal_btn_active.classList.add("modal_active");
        modal_create_js.classList.add("modal_active");
    }

    function modal_deactive() {
        modal_btn_active.classList.remove("modal_active");
    }

    newfeed_Create1.addEventListener("click", modal_active);
    for (var i = 0; i < modal_close.length; ++i) {
        modal_close[i].addEventListener("click", modal_deactive);

    }
    btn_submit_post.addEventListener("click", modal_deactive);

    let btn_setting_post = document.querySelector(".newfeed_post_more");
    let moreSetting = document.querySelector(".more_setting");
    btn_setting_post.addEventListener("click", function () {
        moreSetting.classList.add("active");
    });

    let btn_close_more = document.querySelector(".close_more_setting");


    btn_close_more.addEventListener("click", function () {
        moreSetting.classList.remove("active");
    });


    let btn_custom_more = document.querySelector(".btn_custom_more");
    let btn_delete_more = document.querySelector(".btn_delete_more");
    let newfeed_post = document.querySelector('.newfeed_content_post');

    let modal_create_js = document.querySelector("#modal_create_js");
    let modal_custom_js = document.querySelector('#modal_custom_js');

    btn_delete_more.addEventListener("click", function () {
        newfeed_post.remove();
    })

    btn_custom_more.addEventListener("click", function () {
        modal_btn_active.classList.add("modal_active");
        modal_custom_js.classList.add("modal_active");
        console.log("modal")
    })
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
var modal = document.getElementById("myModal");
var btn = document.getElementById("modaledit");
var span = document.getElementById("closeFormEditProfile");
var span2 = document.getElementById("saveModalButton");

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


