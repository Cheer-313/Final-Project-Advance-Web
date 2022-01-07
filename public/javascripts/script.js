let show = false;
//set menu
$('#set-menu').on("click",()=>{
    if (show == false){
        $("#setting-menu").show();
        show=true;
    } else {
        $("#setting-menu").hide();
        show=false;
    }
});

//set stt
$('#set-stt').on("click",()=>{
    if (show == false){
        $("#setting-stt").show();
        show=true;
    } else {
        $("#setting-stt").hide();
        show=false;
    }
});

//set cmt
$('#set-cmt').on("click",()=>{
    if (show == false){
        $("#setting-cmt").show();
        show=true;
    } else {
        $("#setting-cmt").hide();
        show=false;
    }
});

//edit profile
let modal = document.getElementById("myModal");
let btn = document.getElementById("modaledit");
let span = document.getElementsByClassName("close");
let span2 = document.getElementById("saveModalButton");
 
btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

span2.onclick = function(){
  modal.style.display = "none";

}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//edit post
let modal2 = document.getElementById("myModal-2");
let btn2 = document.getElementById("modaledit-2");
let save2 = document.getElementById("saveModalButton-2");
let closebtn = document.getElementById("close-edit-post");

btn2.onclick = function() {
  modal2.style.display = "block";
}
closebtn.onclick = function(){
    modal2.style.display = "none";
  
  }

save2.onclick = function(){
  modal2.style.display = "none";

}

//edit acc
let modal3 = document.getElementById("myModal-3");
let btn3 = document.getElementById("modaledit-3");
let save3 = document.getElementById("saveModalButton-3");
let closebtn3 = document.getElementById("close-edit-acc");

btn3.onclick = function() {
  modal3.style.display = "block";
}
closebtn3.onclick = function(){
    modal3.style.display = "none";
  
  }

save3.onclick = function(){
  modal3.style.display = "none";

}
