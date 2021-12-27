const socket = io();

// Get infor notification from server
socket.on("notify", (noti) => {
    console.log(noti);
    alert(noti.title);
})