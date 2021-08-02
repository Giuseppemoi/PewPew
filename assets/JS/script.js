import * as funcMusic from "./musicFunctions.js";

let canvas = document.getElementById("game");
let popUpOver = document.getElementById("popUpOver");
let ctx = canvas.getContext("2d");
let imgTarget = document.getElementById("source2");
let imgShip = document.getElementById("source");
let imgHaert = document.getElementById("source3");

// Set context & canvas
ctx.lineWidth = "5";
ctx.strokeStyle = "#ffeb3b";
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight / 1.5;
let yShip = canvas.height-80;

var score = 0;
var play = false;
var start;

var difficulty = 1;
var theme = 0;
var numberTarget = 10;
var live = 3;

var animControl = document.getElementById("bounce");
animControl.style.animation = "bounce 0.7s ease infinite";

function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight/1.5;
    yShip = canvas.height-80;
    y = canvas.height-75;
}

window.addEventListener("resize", () => {
    resize()
})

function disableTheme() {
    if (theme === 0) {
        document.getElementById("buttonStart").setAttribute("disabled", "true")
    } else {
        document.getElementById("buttonStart").removeAttribute("disabled")
    }
}

function startPlay(){
    if (play) {
        document.getElementById("buttonStart").innerHTML = "Start game";
        clearInterval(start);
        play = false;
        document.exitFullscreen();
        canvas.setAttribute("style", "");
        funcMusic.pauseMusic()
        document.getElementById("buttonTheme").removeAttribute("disabled")
    } else {
        document.getElementById("buttonStart").innerHTML = "Pause game";
        start = setInterval(draw, 10);
        play = true;
        document.documentElement.requestFullscreen();
        canvas.setAttribute("style", "cursor:none");
        funcMusic.playMusic();
        document.getElementById("buttonTheme").setAttribute("disabled", "true")
    }
}

document.addEventListener("keyup", (event) => {
    if (event.code == "Space") {
        startPlay();
    }
});

document.getElementById("buttonStart").addEventListener("click", () => {
    startPlay();
});

document.getElementById("buttonReset").addEventListener("click", () => {
    window.location.reload()
})

document.getElementById("buttonTheme").addEventListener("click", () => {
    theme++
    if(theme == 1) {
        animControl.style.animation = "";
        document.querySelector("body").removeAttribute("class");
        document.querySelector("body").setAttribute("class", "purple");
    } else if(theme === 2) {
        animControl.style.animation = "";
        document.querySelector("body").removeAttribute("class");
        document.querySelector("body").setAttribute("class", "jupiter");
    } else if(theme === 3) {
        animControl.style.animation = "";
        document.querySelector("body").removeAttribute("class");
        document.querySelector("body").setAttribute("class", "milkyWay");
    } else if(theme === 4) {
        animControl.style.animation = "";
        theme = 1;
        animControl.removeAttribute("animation");
        animControl.removeAttribute("-webkit-animation");
        document.querySelector("body").removeAttribute("class");
        document.querySelector("body").setAttribute("class", "purple");
    }
    disableTheme()
});

var y = canvas.height-75;
var dy = -2;

var shipX;
document.addEventListener('mousemove', function(event) {
    if (event.target.id === "game") {
        shipX = event.clientX-35
    }
});

// draw haert
let heartWidth = 15;
let heartHeight = 15;
var maxHaert = 1
var arrayHaert = [];
var haert = 0
let popPosition = 36000;
function popHaert() {
    for (let i = 0; i < maxHaert; i++) {
        arrayHaert.push({x: Math.floor(Math.random() * (canvas.width -heartWidth)), y: Math.floor(Math.random() * -popPosition) - heartHeight})
    };
}

function drawHaert() {
    for (let i = 0; i < arrayHaert.length; i++) {
        ctx.drawImage(imgHaert, arrayHaert[i].x, arrayHaert[i].y, imgHaert.width = heartWidth, imgHaert.height = heartHeight);
        arrayHaert[i].y += 2 * difficulty; 
    }
};

function newHaert(){
    if (haert == arrayHaert.length) {
        haert = 0;
        arrayHaert = [];
        popHaert()
    }
};

// draw shield bonus & colides
var imgShield = document.getElementById("source4");

var maxShield = 1;
var arrayShield = [];
var shield = 0;
var sizeShield = 15;
for (let i = 0; i < maxShield; i++) {
    arrayShield.push({x: Math.floor(Math.random() * (canvas.width -35)), y: Math.floor(Math.random() * -popPosition)-35});
};

function drawShield() {
    for (let i = 0; i < arrayShield.length; i++) {
        ctx.drawImage(imgShield, arrayShield[i].x, arrayShield[i].y, imgShield.width = sizeShield, imgShield.height = sizeShield);
        arrayShield[i].y += 2 * difficulty; 
    }
};

function newShield(){
    if (shield == arrayShield.length) {
        shield = 0;
        arrayShield = [];
        for (let i = 0; i < maxShield; i++) {
            arrayShield.push({x: Math.floor(Math.random() * (canvas.width -35)), y: Math.floor(Math.random() * -popPosition)-35});
        }
    }
};

function collidesShield(){
    for (let i = 0; i < arrayShield.length; i++) {
        if(arrayShield[i].x < shipX + 70 && arrayShield[i].x + 15 > shipX && arrayShield[i].y < yShip + 70 && 15 + arrayShield[i].y > yShip) {
            arrayShield.splice(i, 1, {});
            shield++;
            colShield = true;
            shieldTime += 3000;
            funcMusic.actionSound(funcMusic.cling)
        }
        if(arrayShield[i].y > canvas.height) {
            arrayShield.splice(i, 1, {});
            shield++;
        }
    }
};

var shieldTime = 0;
function shieldTimer() {
    
    if (shieldTime > 0) {
        shieldTime--
    }
    if (shieldTime < 1000){
        document.getElementById("shieldTime").innerHTML = "00" + " : " + "0" + Math.floor(shieldTime/100);
    } else {
        document.getElementById("shieldTime").innerHTML = "00" + " : " + Math.floor(shieldTime/100);
    }
    if (shieldTime == 0) {
        colShield = false;
        document.getElementById("shieldTime").innerHTML = "00 : 00";
    }
};

var colShield = false;
var imgShipShield = document.getElementById("source7");
function drawShipShield() {
    if (colShield) {
        ctx.drawImage(imgShipShield, shipX-7, yShip-7, imgShipShield.width = 85, imgShipShield.height = 85);
    }
}

// draw triple laser bonus & colides
var imgTriple = document.getElementById("source5");

var maxTriple = 1;
var arrayTriple = [];
var triple = 0;
var sizeTriple = 15;
for (let i = 0; i < maxTriple; i++) {
    arrayTriple.push({x: Math.floor(Math.random() * (canvas.width -35)), y: Math.floor(Math.random() * -popPosition)-35});
};

function drawTriple() {
    for (let i = 0; i < arrayTriple.length; i++) {
        ctx.drawImage(imgTriple, arrayTriple[i].x, arrayTriple[i].y, imgTriple.width = sizeTriple, imgTriple.height = sizeTriple);
        arrayTriple[i].y += 2 * difficulty; 
    }
};

function newTriple(){
    if (triple == arrayTriple.length) {
        triple = 0;
        arrayTriple = [];
        for (let i = 0; i < maxTriple; i++) {
            arrayTriple.push({x: Math.floor(Math.random() * (canvas.width -35)), y: Math.floor(Math.random() * -popPosition)-35});
        }
    }
};

function collidesTriple(){
    for (let i = 0; i < arrayTriple.length; i++) {
        if(arrayTriple[i].x < shipX + 70 && arrayTriple[i].x + 15 > shipX && arrayTriple[i].y < yShip + 70 && 15 + arrayTriple[i].y > yShip) {
            arrayTriple.splice(i, 1, {});
            triple++;
            colTriple = true;
            tripleTime += 3000;
            funcMusic.actionSound(funcMusic.cling)
        }
        if(arrayTriple[i].y > canvas.height) {
            arrayTriple.splice(i, 1, {});
            triple++;
        }
    }
};

var tripleTime = 0;
function tripleTimer() {
    
    if (tripleTime > 0) {
        tripleTime--
    }
    if (tripleTime < 1000){
        document.getElementById("tripleTime").innerHTML = "00" + " : " + "0" + Math.floor(tripleTime/100);
    } else {
        document.getElementById("tripleTime").innerHTML = "00" + " : " + Math.floor(tripleTime/100);
    }
    if (tripleTime == 0) {
        document.getElementById("tripleTime").innerHTML = "00 : 00";
        colTriple = false
    }
};

var arrayProjectileTriple = [];

var numTargetTriple;
var colTriple = false;
function drawShipTriple() {
    for(numTargetTriple = 0; numTargetTriple < arrayProjectileTriple.length; numTargetTriple++){
        for (let i = arrayTarget.length-1; i > -1; i--) {
            if (arrayProjectileTriple[numTargetTriple].left != undefined) {
                if(arrayTarget[i].x < arrayProjectileTriple[numTargetTriple].left[0]+10 + 5 && arrayTarget[i].x + 35 > arrayProjectileTriple[numTargetTriple].left[0]+10 && arrayTarget[i].y < arrayProjectileTriple[numTargetTriple].left[1] + 20 && 35 + arrayTarget[i].y > arrayProjectileTriple[numTargetTriple].left[1]) {
                    funcMusic.actionSound(funcMusic.pour);
                    ctx.clearRect(arrayTarget[i].x, arrayTarget[i].y, imgTarget.width = 35, imgTarget.height = 35);
                    arrayProjectileTriple[numTargetTriple].left = [];
                    arrayTarget.splice(i, 1, {});
                    score++;
                    target++;
                }
            }
            if (arrayProjectileTriple[numTargetTriple].right != undefined) {
                if(arrayTarget[i].x < arrayProjectileTriple[numTargetTriple].right[0]+55 + 5 && arrayTarget[i].x + 35 > arrayProjectileTriple[numTargetTriple].right[0]+55 && arrayTarget[i].y < arrayProjectileTriple[numTargetTriple].right[1] + 20 && 35 + arrayTarget[i].y > arrayProjectileTriple[numTargetTriple].right[1]) {
                    funcMusic.actionSound(funcMusic.pour);
                    ctx.clearRect(arrayTarget[i].x, arrayTarget[i].y, imgTarget.width = 35, imgTarget.height = 35);
                    arrayProjectileTriple[numTargetTriple].right = [];
                    arrayTarget.splice(i, 1, {});
                    score++;
                    target++;
                }
            }
    
            if (arrayProjectileTriple[numTargetTriple].left != undefined) {
                if (arrayProjectileTriple.length > 0) {
                    ctx.beginPath();
                    ctx.rect(arrayProjectileTriple[numTargetTriple].left[0]+10, arrayProjectileTriple[numTargetTriple].left[1] + 20, 5, 5);
                    ctx.fillStyle = "#ff0000";
                    ctx.fill();
                    ctx.closePath();
                    arrayProjectileTriple[numTargetTriple].left[1] = (arrayProjectileTriple[numTargetTriple].left[1] + dy);
                    if (arrayProjectileTriple[numTargetTriple].left[1] < 0) {
                        arrayProjectileTriple[numTargetTriple].left = [];
                    }
                }
            }
            if (arrayProjectileTriple[numTargetTriple].right != undefined) {
                if (arrayProjectileTriple.length > 0) {
                    ctx.beginPath();
                    ctx.rect(arrayProjectileTriple[numTargetTriple].right[0]+55, arrayProjectileTriple[numTargetTriple].right[1] + 20, 5, 5);
                    ctx.fillStyle = "#ff0000";
                    ctx.fill();
                    ctx.closePath();
                    arrayProjectileTriple[numTargetTriple].right[1] = (arrayProjectileTriple[numTargetTriple].right[1] + dy);
                    if (arrayProjectileTriple[numTargetTriple].right[1] < 0) {
                        arrayProjectileTriple[numTargetTriple].right = [];
                    }
                }
            }
        }
    }
}

// draw cleaner bonus & colides
var imgCleaner = document.getElementById("source6");

var maxCleaner = 1;
var arrayCleaner = [];
var cleaner = 0;
var sizeCleanerX = 15;
var sizeCleanerY = 4;
for (let i = 0; i < maxCleaner; i++) {
    arrayCleaner.push({x: Math.floor(Math.random() * (canvas.width -35)), y: Math.floor(Math.random() * -popPosition)-35});
};


function drawCleaner() {
    for (let i = 0; i < arrayCleaner.length; i++) {
        ctx.drawImage(imgCleaner, arrayCleaner[i].x, arrayCleaner[i].y, imgCleaner.width = sizeCleanerX, imgCleaner.height = sizeCleanerY);
        arrayCleaner[i].y += 2 * difficulty; 
    }
};

function newCleaner(){
    if (cleaner == arrayCleaner.length) {
        cleaner = 0;
        arrayCleaner = [];
        for (let i = 0; i < maxCleaner; i++) {
            arrayCleaner.push({x: Math.floor(Math.random() * (canvas.width -35)), y: Math.floor(Math.random() * -popPosition)-35});
        }
    }
};

function collidesCleaner(){
    for (let i = 0; i < arrayCleaner.length; i++) {
        if(arrayCleaner[i].x < shipX + 70 && arrayCleaner[i].x + 15 > shipX && arrayCleaner[i].y < yShip + 70 && 4 + arrayCleaner[i].y > yShip) {
            arrayCleaner.splice(i, 1, {});
            cleaner++;
            colCleaner = true;
            funcMusic.actionSound(funcMusic.cling)
        }
        if(arrayCleaner[i].y > canvas.height) {
            arrayCleaner.splice(i, 1, {});
            cleaner++;
        }
    }
};

var colCleaner = false;
var canvasCleanerY = canvas.height;
var arrayCanvasCleaner = [0, canvasCleanerY];
var progress = document.getElementById("cleanerTime");
function drawCanvasCleaner() {
    if (colCleaner) {
        if (arrayCleaner.length > 0) {
            ctx.beginPath();
            ctx.rect(arrayCanvasCleaner[0], arrayCanvasCleaner[1], canvas.width, 5);
            ctx.fillStyle = "#2195f3";
            ctx.fill();
            ctx.closePath();
            arrayCanvasCleaner[1] = (arrayCanvasCleaner[1] + dy);
            progress.value += 100/(((canvas.height)-70)/2);
            
        }
    }
};

function collidesCanvasCleaner() {
    for (let i = 0; i < arrayTarget.length; i++) {
        if (colCleaner) {
            if(arrayTarget[i].x < 0 + canvas.width && arrayTarget[i].x + 35 > 0 && arrayTarget[i].y < arrayCanvasCleaner[1] + 10 && 35 + arrayTarget[i].y > arrayCanvasCleaner[1]) {
                funcMusic.actionSound(funcMusic.pour);
                arrayTarget.splice(i, 1, {});
                target++;
                score++;
            }
        } 

        if(arrayCanvasCleaner[1] < 0) {
            colCleaner = false;
            arrayCanvasCleaner = [0, canvasCleanerY];
            progress.value = 0;
        }
    }
}


// draw target
var target = 0;
var arrayTarget = [];
for (let i = 0; i < numberTarget; i++) {
    arrayTarget.push({x: Math.floor(Math.random() * (canvas.width -35)), y: Math.floor(Math.random() * -1000)-35});
};

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
        ctx.drawImage(imgTarget, arrayTarget[i].x, arrayTarget[i].y, imgTarget.width = 35, imgTarget.height = 35);
        arrayTarget[i].y += (1 * difficulty) + ((`0.${i}`)*2);
    }
}

// draw ship
function drawShip (){
    ctx.drawImage(imgShip, shipX, yShip, imgShip.width = 70, imgShip.height = 70);
}

// draw projectile & check collides
var arrayProjectile = [];
document.addEventListener("mousedown", function setProjectile(event) {
    if (event.button == 0) {
        if (play) {
            if (event.target.id === "game") {
                funcMusic.actionSound(funcMusic.peww);
                arrayProjectile.push([shipX, y]);
            }
            if (colTriple) {
                arrayProjectileTriple.push({left: [shipX, y], right: [shipX, y]});
            }
        }
    }
})

var numTarget;
function drawProjectile() {
    for(numTarget = 0; numTarget < arrayProjectile.length; numTarget++){
        for (let i = arrayTarget.length-1; i > -1; i--) {
            if (arrayProjectile[numTarget] != undefined) {
                if(arrayTarget[i].x < arrayProjectile[numTarget][0]+35 + 5 && arrayTarget[i].x + 35 > arrayProjectile[numTarget][0]+35 && arrayTarget[i].y < arrayProjectile[numTarget][1] + 5 && 35 + arrayTarget[i].y > arrayProjectile[numTarget][1]) {
                    funcMusic.actionSound(funcMusic.pour);
                    ctx.clearRect(arrayTarget[i].x, arrayTarget[i].y, imgTarget.width = 35, imgTarget.height = 35);
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

// target  collides
var liveFlex = document.getElementById("liveFlex")
function collides() {
    for (let i = 0; i < arrayTarget.length; i++) {
        if (colShield) {
            if(arrayTarget[i].x < shipX + 70 && arrayTarget[i].x + 35 > shipX && arrayTarget[i].y < yShip + 70 && 35 + arrayTarget[i].y > yShip) {
                funcMusic.actionSound(funcMusic.prout);
                arrayTarget.splice(i, 1, {});
                target++;
                score++;
            }
        } else if(arrayTarget[i].x < shipX + 70 && arrayTarget[i].x + 35 > shipX && arrayTarget[i].y < yShip + 70 && 35 + arrayTarget[i].y > yShip) {
            funcMusic.actionSound(funcMusic.ouch);
            var haertImg = document.getElementById(`live${live}`)
            arrayTarget.splice(i, 1, {});
            target++;
            liveFlex.removeChild(haertImg)
            live--;
            checkLive();
        }
        if(arrayTarget[i].y > canvas.height) {
            ctx.clearRect(arrayTarget[i].x, arrayTarget[i].y, imgTarget.width = 35, imgTarget.height = 35);
            arrayTarget.splice(i, 1, {});
            target++;
        }

    }
}

// collide haert
function collidesHaert(){
    for (let i = 0; i < arrayHaert.length; i++) {
        if(arrayHaert[i].x < shipX + 70 && arrayHaert[i].x + 15 > shipX && arrayHaert[i].y < yShip + 70 && 15 + arrayHaert[i].y > yShip) {
            arrayHaert.splice(i, 1, {});
            live++;
            haert++;
            liveFlex.innerHTML += `<img id="live${live}" class="heartClass" src="assets/img/heart.png"></img>`;
            funcMusic.actionSound(funcMusic.aaah);
        }
        if(arrayHaert[i].y > canvas.height) {
            arrayHaert.splice(i, 1, {});
            haert++;
        }
    }
}

// check lose
function checkLive() {
    if(live === 0) {
        funcMusic.pauseMusic();
        popUpOver.setAttribute("style", "display:flex");
        clearInterval(start);
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
    drawProjectile();
    drawShipTriple()
    drawShip();
    logScore();
    time();
    newTarget();
    drawHaert();
    newHaert();
    collides();
    collidesHaert();
    drawShield();
    newShield();
    collidesShield();
    drawShipShield();
    drawTriple();
    newTriple();
    collidesTriple();
    shieldTimer()
    tripleTimer()
    drawCleaner()
    newCleaner()
    collidesCleaner()
    drawCanvasCleaner()
    collidesCanvasCleaner()
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
var tr = document.querySelector('table').children[0];
let th1 = document.createElement('th');
let th2 = document.createElement('th');
let th3 = document.createElement('th');
th1.innerHTML = "Name";
th2.innerHTML = "Score";
th3.innerHTML = "Time";
tr.appendChild(th1);
tr.appendChild(th2);
tr.appendChild(th3);