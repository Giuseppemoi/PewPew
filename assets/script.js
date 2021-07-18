var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var image2 = document.getElementById("source2");
var img = document.getElementById("source");
var imgHaert = document.getElementById("source3")
ctx.lineWidth = "5";
ctx.strokeStyle = "#ffeb3b";
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight/1.5;
var yval = canvas.height-75;
var xval = (canvas.width/2) - 35;
var score = 0
var play = false;
var start;

var difficulty = 1;
var theme = 0;
var minutes = 0;
var numberTarget = 5;
var live = 3;

document.addEventListener("keydown", (event) => {
    if (event.code == "Space" && play) {
        startPlay();
    } else if (event.code == "Space" && !play) {
        startPlay();
    }
});

function startPlay(){
    if (play) {
        document.getElementById("buttonStart").innerHTML = "Start game";
        clearInterval(start);
        play = false;
        document.exitFullscreen()
    } else {
        document.getElementById("buttonStart").innerHTML = "Pause game";
        start = setInterval(draw, 10);
        play = true;
        document.documentElement.requestFullscreen()
    }
}

document.getElementById("buttonStart").addEventListener("click", () => {
    if (play) {
        startPlay()
    } else {
        startPlay()
    }
});

document.getElementById("buttonReset").addEventListener("click", () => {
    window.location.reload()
})

document.getElementById("buttonTheme").addEventListener("click", () => {
    theme++
    if(theme == 1) {
        document.querySelector("body").removeAttribute("class");
        document.querySelector("body").setAttribute("class", "purple");
    } else if(theme === 2) {
        document.querySelector("body").removeAttribute("class");
        document.querySelector("body").setAttribute("class", "jupiter");
    } else if(theme === 3) {
        document.querySelector("body").removeAttribute("class");
        document.querySelector("body").setAttribute("class", "milkyWay");
    } else if(theme === 4) {
        theme = 1;
        document.querySelector("body").removeAttribute("class");
        document.querySelector("body").setAttribute("class", "purple");
    }
});

var x = canvas.width/2;
var y = canvas.height-75;
var ballRadius = 5;
var dy = -2;

var shipX;
document.addEventListener('mousemove', function(event) {
    if (event.path[0].id === "game") {
        shipX = event.clientX-35
    }
});

var maxHaert = 1
var arrayHaert = [];
var haert = 0
for (let i = 0; i < maxHaert; i++) {
    arrayHaert.push({x: Math.floor(Math.random() * (canvas.width -35)), y: Math.floor(Math.random() * -500)-35})
}

function drawHaert() {
    for (let i = 0; i < arrayHaert.length; i++) {
        ctx.drawImage(imgHaert, arrayHaert[i].x, arrayHaert[i].y, imgHaert.width = 15, imgHaert.height = 15);
        arrayHaert[i].y += 2 * difficulty; 
    }
}

function newHaert(){
    if (haert == arrayHaert.length) {
        haert = 0
        arrayHaert = [];
        for (let i = 0; i < maxHaert; i++) {
            arrayHaert.push({x: Math.floor(Math.random() * (canvas.width -35)), y: Math.floor(Math.random() * -500)-35})
        }
    }
}

var target = 0;
var arrayTarget = [];
for (let i = 0; i < numberTarget; i++) {
    arrayTarget.push({x: Math.floor(Math.random() * (canvas.width -35)), y: Math.floor(Math.random() * -100)-35})
}

function newTarget(){
    if (target == arrayTarget.length) {
        target = 0
        arrayTarget = [];
        for (let i = 0; i < numberTarget; i++) {
            arrayTarget.push({x: Math.floor(Math.random() * (canvas.width -35)), y: Math.floor(Math.random() * -1000)-35})
        }
    }
}

function drawTarget() {
    for (let i = 0; i < arrayTarget.length; i++) {
        ctx.drawImage(image2, arrayTarget[i].x, arrayTarget[i].y, image2.width = 35, image2.height = 35);
        arrayTarget[i].y += (1 * difficulty) + ((`0.${i}`)*2);
    }
}

function drawShip (){
    ctx.drawImage(img, shipX, yval, img.width = 70, img.height = 70);
}

var arrayProjectile = [];
document.addEventListener("mousedown", function setProjectile(event) {
    if (event.button == 0) {
        if (play) {
            if (event.path[0].id === "game") {
                arrayProjectile.push([shipX, y])        
            }
        }
    }
})

var numTarget;
function drawProjectile() {
    for(numTarget = 0; numTarget < arrayProjectile.length; numTarget++){
        for (let i = arrayTarget.length-1; i > -1; i--) {
            if (arrayProjectile[numTarget] != undefined) {
                if(arrayTarget[i].x < arrayProjectile[numTarget][0]+35 + 5 && arrayTarget[i].x + 35 > arrayProjectile[numTarget][0]+35 && arrayTarget[i].y < arrayProjectile[numTarget][1] + 5 && 35 + arrayTarget[i].y > arrayProjectile[numTarget][1]) { //shoot hit
                    ctx.clearRect(arrayTarget[i].x, arrayTarget[i].y, image2.width = 35, image2.height = 35);
                    arrayProjectile.splice(numTarget, 1);
                    arrayTarget.splice(i, 1, {});
                    score++;
                    target++;
                }
                if (arrayProjectile[numTarget] != undefined) {
                    if (arrayProjectile.length > 0) {
                        ctx.beginPath();
                        ctx.rect(arrayProjectile[numTarget][0]+35, arrayProjectile[numTarget][1] + 15, 5, 5);
                        ctx.fillStyle = "#ffeb3b";
                        ctx.fill();
                        ctx.closePath();
                        arrayProjectile[numTarget][1] = (arrayProjectile[numTarget][1] + dy);
                        if (arrayProjectile[numTarget][1] < 0) {
                            arrayProjectile.splice(numTarget, 1);
                        }
                    }
                }
            }
        }
    }
}

var liveFlex = document.getElementById("liveFlex")
function collides() {
    for (let i = 0; i < arrayTarget.length; i++) {
        if(arrayTarget[i].x < shipX + 70 && arrayTarget[i].x + 35 > shipX && arrayTarget[i].y < yval + 70 && 35 + arrayTarget[i].y > yval) { //target hit
            var haertImg = document.getElementById(`live${live}`)
            ctx.clearRect(arrayTarget[i].x, arrayTarget[i].y, image2.width = 35, image2.height = 35);
            arrayTarget.splice(i, 1, {});
            target++;
            liveFlex.removeChild(haertImg)
            live--;
            checkLive();
        }
        if(arrayTarget[i].y > canvas.height) {
            ctx.clearRect(arrayTarget[i].x, arrayTarget[i].y, image2.width = 35, image2.height = 35);
            arrayTarget.splice(i, 1, {});
            target++;
        }
    }
}

function collidesHaert(){
    for (let i = 0; i < arrayHaert.length; i++) {
        if(arrayHaert[i].x < shipX + 70 && arrayHaert[i].x + 15 > shipX && arrayHaert[i].y < yval + 70 && 15 + arrayHaert[i].y > yval) { //target hit
            ctx.clearRect(arrayTarget[i].x, arrayTarget[i].y, image2.width = 35, image2.height = 35);
            arrayHaert.splice(i, 1, {});
            live++;
            haert++;
            liveFlex.innerHTML += `<img id="live${live}" class="heartClass" src="assets/img/heart.png"></img>`;
        }
        if(arrayHaert[i].y > canvas.height) {
            ctx.clearRect(arrayHaert[i].x, arrayHaert[i].y, imgHaert.width = 35, imgHaert.height = 35);
            arrayHaert.splice(i, 1, {});
            haert++;
        }
    }
}

function checkLive() {
    if(live === 0) {
        clearInterval(start);
        document.getElementById("winLose").innerHTML = "You Lose !";
        document.getElementById("game").setAttribute("style", "opacity: 0.5");
        convertToJSON()
    }
}

function logScore() {
    document.getElementById("score").innerHTML = score;
}

var timer = 0;
function time(){
    timer++
    if(timer < 999) {
        document.getElementById("gameTime").innerHTML = "00" + " : " + "0" + Math.floor(timer/100);
    } else if (timer > 999 && timer < 5999){
        document.getElementById("gameTime").innerHTML = "00" + " : " + Math.floor(timer/100);
    } else if (timer > 5999 && timer < 59999){
        if ((timer/100)%60 < 10) {
            document.getElementById("gameTime").innerHTML = "0" + Math.floor(timer/6000) + " : " + "0" + Math.floor((timer/100)%60);
        } else {
            document.getElementById("gameTime").innerHTML = "0" + Math.floor(timer/6000) + " : " + Math.floor((timer/100)%60);
        }
    } else if (timer > 59999 && timer < 359999){
        if ((timer/100)%60 < 10) {
            document.getElementById("gameTime").innerHTML = Math.floor(timer/6000) + " : " + "0" + Math.floor((timer/100)%60);
        } else {
            document.getElementById("gameTime").innerHTML = Math.floor(timer/6000) + " : " + Math.floor((timer/100)%60);
        }
    } else if (timer > 359999){
        if ((timer/100)%60 < 10) {
            if ((timer/100)%6000 < 10) {
                document.getElementById("gameTime").innerHTML = "0" + Math.floor(timer/360000) + " : " + "0" + Math.floor((timer - 360000) / 6000) + " : " + "0" + Math.floor((timer/100)%60);
            } else {document.getElementById("gameTime").innerHTML = "0" + Math.floor(timer/360000) + " : " + Math.floor((timer - 360000) / 6000) + " : " + "0" + Math.floor((timer/100)%60);
            }
        } else {
            if ((timer/100)%6000 > 10) {
                document.getElementById("gameTime").innerHTML = "0" + Math.floor(timer/360000) + " : " + Math.floor((timer - 360000) / 6000) + " : " + Math.floor((timer/100)%60);
            } else {
                document.getElementById("gameTime").innerHTML = "0" + Math.floor(timer/360000) + " : " + "0" + Math.floor((timer - 360000) / 6000) + " : " + Math.floor((timer/100)%60);
            }
        }
    }
};

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTarget();
    drawProjectile()
    drawShip();
    logScore()
    time()
    newTarget()
    drawHaert()
    newHaert()
    collides()
    collidesHaert()
};

document.getElementById("btnTableScore").addEventListener("click", () => {
    document.getElementById("popup").classList.toggle("show");
});
var tableScore = document.getElementById("tableScore");
var table = document.createElement("table");
tableScore.appendChild(table);
for (let a = 0; a < 10; a++) {
    let row = table.insertRow(a);
    for (let b = 0; b < 3; b++) {
        row.insertCell(b).innerText = (b+1) * (a+1);
    }
} ;
var tHead = table.createTHead();
var rowTHead = tHead.insertRow(0);
var cellTHead = rowTHead.insertCell(0);
cellTHead.setAttribute("colspan", "3")
cellTHead.innerHTML = "Table Score";












// function convertToJSON() {
//     var namevalue = "coucou";
//     var scoreValue = score;
//     var time = document.getElementById('gameTime').innerHTML;
//     //var jsonObject = {
//     localStorage.setItem('Name', JSON.stringify(namevalue));
//     localStorage.setItem('Score', JSON.stringify(scoreValue));
//     localStorage.setItem('Time', JSON.stringify(time));
// }


// localStorage.setItem('tableScore', convertToJSON());
// console.log('localStorage: ', localStorage);