/*
    Gắn id post vào button hoặc href của delete hoặc update
    (tương tự comment)
    Sau khi bấm vào sẽ lấy id đó gán vào url
*/
// START POST
// Get All Post
function getAllPost() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/api/posts/",
        data: "",
        dataType: "json",
        success: function (res) {
            if("error" in res){
                console.log(res.error);
            } else{
                for(let post of res.result){
                    console.log(post)
                }
            }
            
        },
    });
}

if (window.location.pathname === "/test") {
    window.onload = getAllPost();
}

// Get detail post by id

// Create Post
$("#formCreatePost").submit(function (e) {
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
