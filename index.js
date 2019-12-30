container = document.querySelector(".container");
basket = document.querySelector(".basket");
timer = document.querySelector(".timer");
audio = document.getElementById("my-audio");
modalText=document.getElementById("model-text");
close=document.querySelector(".close");
//the model javascript code!!!!!
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
starttime = 60;
timer.innerText = starttime;
var leftmove = 0;
var counter = 0;
var eggs = [];
var count = 0;
var goldencount = 0;
var score = 0;
var out = 5;
player = document.querySelector(".player");
player.innerText = "player :" + localStorage.getItem("player");
life = document.querySelector(".lifevalue");
life.innerText = out;
scoreval = document.querySelector(".value");
scoreval.innerText = score;
time = setInterval(() => {
    if (starttime > 0) {
        starttime--;
        timer.innerText = starttime;
    }
}, 1000);
window.onload = function() {
   audio.src="audio/sound.mp3";
   audio.play();
}
document.onkeydown = function movebasketleftorright(e) {
    if (e.keyCode == 39) {
        if (leftmove < innerWidth - 150) {
            leftmove += 60;
            basket.style.left = leftmove + 'px';
        }
    }
    if (e.keyCode == 37) {
        if (leftmove > 0) {
            leftmove -= 60;
            basket.style.left = leftmove + 'px';
        }
    }
}
function createCatcoot(leftpos) {
    catcoot = document.createElement("div");
    catcoot.classList.add("catcoot");
    catcoot.style.bottom = 0;
    catcoot.style.left = leftpos;
    container.appendChild(catcoot);
}
function createEgg(lft) {
    egg = document.createElement("div");
    if (lft % 20 == 0) {
        egg.classList.add("goldenegg");
        egg.style.left = lft + 'px';
        container.appendChild(egg);
    } else {
        egg.classList.add("eggs");
        egg.style.left = lft + 'px';
        container.appendChild(egg);
    }
}
function checkEggHitBasket(egg_droped) {
    eggtop = parseInt(egg_droped.style.top.replace('px', ''));
    if (eggtop > innerHeight - 100 && eggtop < innerHeight - 80) {
        egg_left_side = parseInt(egg_droped.style.left.replace('px', ''));
        egg_right_side = egg_left_side + 50;
        basket_left_side = parseInt(basket.style.left.replace('px', ''));
        basket_right_side = basket_left_side + 100;
        if (egg_left_side < basket_right_side && egg_right_side > basket_left_side) {
            return true;

        }
    }
}
function checkEggHitFloor(egg_droped) {
    eggtop = parseInt(egg_droped.style.top.replace('px', ''));
    if (eggtop > innerHeight - 50 && eggtop < innerHeight - 30) {
        return true;
    }
}

function animateEggs() {
    for (i in eggs) {
        topOfEgg = eggs[i].style.top;
        postion = parseInt(topOfEgg.replace('px', ''));
        postion += 10;
        eggs[i].style.top = postion + 'px';
        if (checkEggHitBasket(eggs[i])) {

            if (eggs[i].classList.contains('goldenegg')) {
                score += 2;
                console.log("true");
                eggs[i].remove();
                eggs.splice(i, 1);
                scoreval.innerText = score;
            } else {
                score++;
                eggs[i].remove();
                eggs.splice(i, 1);
                scoreval.innerText = score;
            }
            if(score>=20)
            {
                clearInterval(startplay);
                modalText.innerText="WOW  YOU ARE WINNNER!!!!!!"
                 modal.style.display = "block";
                 clearInterval(time);
            }

        } else if (checkEggHitFloor(eggs[i])) {

            createCatcoot(parseInt(eggs[i].style.left.replace("px", '')) - 14);
            setTimeout(() => {
                catcoot.remove();
            }, 1000);
            eggs[i].remove();
            eggs.splice(i, 1);
            out--;
            life.innerText = out;
            if (out <= 0) {
                modalText.innerText="GAME OVER!!!!!!"
                modal.style.display = "block";
                clearInterval(startplay);
                clearInterval(time);
                eggs.forEach(function (eg) {
                    eg.remove();
                })  
            }
        }

    }
}
startplay = setInterval(() => {
    if (starttime > 0) {
        counter++;
        if (counter == 20) {
            var left = Math.ceil(Math.random() * 1200);
            createEgg(left);
            eggs.push(egg);
            counter = 0;
            egg.style.top = 5 + 'px';
        }
        animateEggs();
    } else {
        clearInterval(startplay);
        modalText.innerText="GAME OVER!!!!!!"
        modal.style.display = "block";
        eggs.forEach(function (eg) {
            eg.remove();
        })
    }
}, 100);
close.onclick=function(){
    window.open("first.html","_self");
}