myform = document.querySelector("#myform");
mybtn = document.querySelector(".mybtn");
myinput = document.querySelector(".myname");
player = myinput.value
myform.onsubmit = function (e) {
    e.preventDefault();
    player = myinput.value
    if (player != "") {
        window.localStorage.setItem("player", player);
        window.open("mian.html", "_self");
    }
}