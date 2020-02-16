let checkbox = false;

function Dropdown(event) {
    checkbox = event;
    mask.display = checkbox ? "block" : "none";
}

function hideMask() {
    document.getElementById("dropdown-menu").checked = false;
    setTimeout(() => {mask.display = "none";}, 300);
}

let heightDiff;
let wintopPre = 100000000;
let scrollLine, header, mask;

function moveHeader(winTop) {
    if (!checkbox && Math.abs(winTop - wintopPre) > 4) {
        if (winTop > wintopPre) {
            header.top = "-60px";
        } else {
            header.top = "0";
        }
    }
    wintopPre = winTop;
}

function moveLine(winTop) {
    const scrolled = winTop * heightDiff;
    scrollLine.width = scrolled + "%";
}

function resize() {
    heightDiff = 100 / (document.body.scrollHeight - window.innerHeight);
    moveLine(document.body.scrollTop || document.documentElement.scrollTop);
}

window.onload = () => {
    document.getElementById("dropdown-menu").checked = false;
    scrollLine = document.getElementsByClassName("scroll-line")[0].style;
    header = document.getElementsByClassName("header")[0].style;
    mask = document.getElementsByClassName("mask")[0].style;
    resize();
};

document.body.onresize = resize;
window.onresize = resize;

window.onscroll = () => {
    const winTop = document.body.scrollTop || document.documentElement.scrollTop;
    moveLine(winTop);
    moveHeader(winTop);
};