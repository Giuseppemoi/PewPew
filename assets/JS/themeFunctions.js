let buttonStart = document.getElementById("buttonStart");
let buttonTheme = document.getElementById("buttonTheme");
let theme = 0;
let animControl = document.getElementById("bounce");
animControl.style.animation = "bounce 0.7s ease infinite";

function disableTheme() {
    if (theme === 0) {
        buttonStart.setAttribute("disabled", "true")
    } else {
        buttonStart.removeAttribute("disabled")
    }
}

buttonTheme.addEventListener("click", () => {
    theme++;
    if(theme === 1) {
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
    disableTheme();
});