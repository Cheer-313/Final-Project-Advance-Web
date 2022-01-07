/*
    Gắn id post vào button hoặc href của delete hoặc update
    (tương tự comment)
    Sau khi bấm vào sẽ lấy id đó gán vào url.
    Gắn id Post vào form comment của post
*/
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

    // Load Profile
    if(window.location.pathname == "/profile"){
        let _idUser = document.getElementById("userId").getAttribute("value");
        console.log("Olalalala");
        getPostByUserId(_idUser);
    }
    
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
                                        <a href="/profile/${result.commentBy._id}"><h5>${result.commentBy.fullname}</h5></a>
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

                    // let content = `
                    //     <div class="newfeed_content_post">
                    //         <div class="newfeed_post_header">
                    //             <div class="newfeed_post_info">
                    //                 <i class="ti-user"></i>
                    //                 <div class="post_NameDate">
                    //                     <a href="/profile/${post.postedBy.authId}"><p>${post.postedBy.fullname}</p></a>
                    //                     <span>${date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()}</span>
                    //                 </div>
                    //             </div>
                    //             <div class="newfeed_post_more">
                    //                 <i class="ti-more-alt"></i>
                    //                 <ul class="more_setting">
                    //                     <li>Chỉnh Sửa</li>
                    //                     <li>Xóa</li>
                    //                 </ul>
                    //             </div>
                    //         </div>
                    //         <div class="newfeed_post_body">
                    //             <div class="post_body_text">
                    //                 <p>${post.content}</p>
                    //             </div>
                    //             <div class="post_body_upload">${postBodyUpload}</div>
                    //         </div>
                    //         <div class="newfeed_post_comment">
                    //             ${listComment}
                    //         </div>
                    //         <form action="/api/comment/" method="post" class="newfeed_post_createComment formCreateComment">
                    //             <i class="ti-user"></i>
                    //             <input type="hidden" name="_idPost" value="${post._id}"></input>
                    //             <input type="text" name="content" placeholder="Viết bình luận"></input>
                    //         </form>
                    //     </div>
                    // `;
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

function deleteComment(){}