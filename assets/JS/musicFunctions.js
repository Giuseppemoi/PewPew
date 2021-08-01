let Xivine_Shockwave = new Audio('assets/media/Xivine_Shockwave.mp3');
Xivine_Shockwave.volume = .1;
Xivine_Shockwave.loop = true;

let Nihilore_Bush_Week = new Audio("assets/media/Nihilore_Bush_Week.mp3");
Nihilore_Bush_Week.volume = .1;
Nihilore_Bush_Week.loop = true;

let Ghostrifter_Deflector = new Audio("assets/media/Ghostrifter_Deflector.mp3");
Ghostrifter_Deflector.volume = 0.1;
Ghostrifter_Deflector.loop = true;

let ouch = new Audio("assets/media/ouch.m4a");
ouch.volume = .5;

let peww = new Audio("assets/media/Pewwwwww.m4a");
peww.volume = .5;

let prout = new Audio("assets/media/Proust.m4a");
prout.volume = .5;

let pour = new Audio("assets/media/Pourrr.m4a");
pour.volume = .5;

let cling = new Audio("assets/media/Cling.m4a");
cling.volume = 1;

let aaah = new Audio("assets/media/Aaaah.m4a");
aaah.volume = 1;

function playMusic() {
    if (document.querySelector(".purple")) {
        Xivine_Shockwave.play();
    } else if (document.querySelector(".jupiter")) {
        Ghostrifter_Deflector.play();
    } else if (document.querySelector(".milkyWay")) {
        Nihilore_Bush_Week.play();
    }
}

function pauseMusic() {
    Xivine_Shockwave.pause();
    Ghostrifter_Deflector.pause();
    Nihilore_Bush_Week.pause();
}

function actionSound(sound) {
    sound.load();
    sound.play();
}

export {playMusic, pauseMusic, actionSound, peww, prout, pour, cling, aaah, ouch};