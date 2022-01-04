/*
    Gắn id post vào button hoặc href của delete hoặc update
    (tương tự comment)
    Sau khi bấm vào sẽ lấy id đó gán vào url.
    Gắn id Post vào form comment của post
*/
// START POST
// Get All Post
$(document).ready(function () {
    // Load data when redirect to /home
    if (window.location.pathname === "/test") {
        window.onload = getAllPost(1);
    }

    // Load more when scroll to the end page
    let nextPage = 2;
    window.onscroll = function (ev) {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            getAllPost(nextPage);
            nextPage++;
        }
    };
});

function getAllPost(page) {
    console.log(`/api/posts/page/${page}`);
    
    $.ajax({
        type: "GET",
        url: `/api/posts/page/${page}`,
        data: "",
        dataType: "json",
        success: function (res) {
            if("error" in res){
                console.log(res.error);
            } else{

                // for(let i of res.result){
                //     console.log(i)
                // }
                for(let post of res.result){
                    const div = document.createElement("div");
                    div.classList.add("container");
                    let date = new Date(post.date);
                    div.innerHTML = `
                        <p>${post.content}</p>
                        <p>${post.image}</p>
                        <p>${post.video}</p>
                        <p>${post.postedBy.fullname}</p>
                        <p>${post.postedBy.avatar}</p>
                        <p>${date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()}</p>
                        <p>${post.comment}</p>
                    `;
                    const list = document.getElementById("test");
                    list.insertBefore(div, list.childNodes[0]);
                }
                
            }
        },
    });
}

// Get detail post by id

// Create Post
$("#formCreatePost").submit(function (e) {
    e.preventDefault();

    let form = $(this);
    let url = form.attr("action");
    let formData = new FormData(form[0]);

    for(let i of formData){
        console.log(i);
    }

    $.ajax({
        type: "POST",
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
        type: "POST",
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

// END POST

// START COMMENT

