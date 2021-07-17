var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var image2 = document.getElementById("source2");
var img = document.getElementById("source");
var imgHaert = document.getElementById("source3")
ctx.lineWidth = "5";
ctx.strokeStyle = "rgb(54, 95, 156)";
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight/1.5;
var yval = canvas.height-75;
var xval = (canvas.width/2) - 35;
var score = 0
var play = false;
var start;
var popTarget;
var startTimer;

var difficulty = 1;
var theme = 0;
var timer = 0;
var minutes = 0;
var numberTarget = 5;
var live = 3;

function timerScore() {
    timer++;
}

document.getElementById("buttonStart").addEventListener("click", () => {
    // if(difficulty === 0) {
    //     document.getElementById("winLose").innerHTML = "Choice your difficulty !";
    // }
    // else {
    //     document.getElementById("winLose").innerHTML = "";
        if (play) {
            document.getElementById("buttonStart").innerHTML = "Start game";
            clearInterval(start);
            clearInterval(startTimer);
            play = false;
        } else {
            document.getElementById("buttonStart").innerHTML = "Pause game";
            start = setInterval(draw, 10);
            startTimer = setInterval(timerScore, 1000)
            play = true;
        }
    //     if(play === true) {
    //         document.getElementById("buttonDifficulty").disabled = true;
    //     }
    //     if(play === true) {
    //         document.getElementById("buttonTheme").disabled = true;
    //     }
    // }
});

document.getElementById("buttonReset").addEventListener("click", () => {
    window.location.reload()
})

// document.getElementById("buttonDifficulty").addEventListener("click", () => {
//     difficulty++;
//     if(difficulty === 1) {
//         document.getElementById("buttonDifficulty").innerHTML = "Difficulty: Easy";
//     }
//     else if(difficulty === 2) {
//         document.getElementById("buttonDifficulty").innerHTML = "Difficulty: Medium";
//     }
//     else if(difficulty === 3) {
//         document.getElementById("buttonDifficulty").innerHTML = "Difficulty: Hard";
//     }
//     else if(difficulty === 4) {
//         document.getElementById("buttonDifficulty").innerHTML = "Difficulty: Extrem";
//     }
//     else if(difficulty === 5) {
//         difficulty = 1;
//         document.getElementById("buttonDifficulty").innerHTML = "Difficulty: Easy";
//     }
// });

document.getElementById("buttonTheme").addEventListener("click", () => {
    theme++;
    if(theme === 1) {
        document.getElementById("game").removeAttribute("class");
        document.getElementById("game").setAttribute("class", "theme1");
    }
    else if(theme === 2) {
        document.getElementById("game").removeAttribute("class");
        document.getElementById("game").setAttribute("class", "theme2");
    }
    else if(theme === 3) {
        document.getElementById("game").removeAttribute("class");
        document.getElementById("game").setAttribute("class", "theme3");
    }
    else if(theme === 4) {
        theme = 1;
        document.getElementById("game").removeAttribute("class");
        document.getElementById("game").setAttribute("class", "theme1");
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
        arrayHaert[i].y += 1 * difficulty; 
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
        arrayTarget[i].y += 1 * difficulty;
    }
}

function drawShip (){
    ctx.drawImage(img, shipX, yval, img.width = 70, img.height = 70);
}

var arrayProjectile = [];
document.addEventListener("mousedown", function setProjectile(event) {
    
    if (event.path[0].id === "game") {
        arrayProjectile.push([shipX, y])        
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
                        ctx.fillStyle = "#c73133";
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
        // if(arrayHaert[i].x < shipX + 70 && arrayHaert[i].x + 15 > shipX && arrayHaert[i].y < yval + 70 && 15 + arrayHaert[i].y > yval) { //target hit
        //     ctx.clearRect(arrayTarget[i].x, arrayTarget[i].y, image2.width = 35, image2.height = 35);
        //     arrayHaert.splice(i, 1, {});
        //     live++;
        //     haert++;
        //     liveFlex.innerHTML += `<img id="live${live}" class="heartClass" src="assets/img/hearticon-removebg-preview.png"></img>`;
        //     
        //     
        // }
        if(arrayTarget[i].y > canvas.height) {
            ctx.clearRect(arrayTarget[i].x, arrayTarget[i].y, image2.width = 35, image2.height = 35);
            arrayTarget.splice(i, 1, {});
            target++;
        }
        // if(arrayHaert[i].y > canvas.height) {
        //     ctx.clearRect(arrayHaert[i].x, arrayHaert[i].y, imgHaert.width = 35, imgHaert.height = 35);
        //     arrayHaert.splice(i, 1, {});
        //     haert++;
        //     
        //     
        // }
        
    }
}

function collidesHaert(){
    for (let i = 0; i < arrayHaert.length; i++) {
        if(arrayHaert[i].x < shipX + 70 && arrayHaert[i].x + 15 > shipX && arrayHaert[i].y < yval + 70 && 15 + arrayHaert[i].y > yval) { //target hit
            ctx.clearRect(arrayTarget[i].x, arrayTarget[i].y, image2.width = 35, image2.height = 35);
            arrayHaert.splice(i, 1, {});
            live++;
            haert++;
            liveFlex.innerHTML += `<img id="live${live}" class="heartClass" src="assets/img/hearticon-removebg-preview.png"></img>`;
            
            
        }
        if(arrayHaert[i].y > canvas.height) {
            ctx.clearRect(arrayHaert[i].x, arrayHaert[i].y, imgHaert.width = 35, imgHaert.height = 35);
            arrayHaert.splice(i, 1, {});
            haert++;
            
            
        }
    }
}

function checkLive() {
    /*if(live === 2 ){
    document.getElementById("live3").setAttribute("style", "display: none");
    }
    else if(live === 1 ){
        document.getElementById("live2").setAttribute("style", "display: none");
    }
    else*/ if(live === 0) {
        clearInterval(start);
        document.getElementById("winLose").innerHTML = "You Lose !";
        document.getElementById("game").setAttribute("style", "opacity: 0.5");
        //document.getElementById("live").setAttribute("style", "display: none");
    }
}

function logScore() {
    document.getElementById("score").innerHTML = score;
}

// function win() {
//     if (score === numberTarget) {
//         clearInterval(inter);
//         clearInterval(interTimer);
//         document.getElementById("winLose").innerHTML = "You win !";
//         document.getElementById("game").setAttribute("style", "opacity: 0.5");
//     }
// }
function time(){
    if(timer < 10) {
        document.getElementById("gameTime").innerHTML = "0" + minutes + " : " + 0 + timer;
    }
    else {
        document.getElementById("gameTime").innerHTML = "0" + minutes + " : " + timer;
    }
    if(timer === 60) {
        timer = 0;
        minutes += 1;
    } 
}


function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTarget();
    drawProjectile()
    drawShip();
    logScore()
    //win()
    time()
    newTarget()
    drawHaert()
    newHaert()
    collides()
    collidesHaert()
}


