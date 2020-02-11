let checkbox = false;

function Dropdown(event) {
    checkbox = event;
    mask.display = checkbox ? "block" : "none";
};

function scroollAction(winTop) {
    if (!checkbox) {
        if (winTop >= wintopPre) {
            header.transform = "translateY(-60px)";
        } else {
            header.transform = "translateY(0)";
        }
    }
    wintopPre = winTop;
};

let heightDiff;

function resize() {
    heightDiff = 100 / (document.body.scrollHeight - window.innerHeight);
    scroollAction(document.documentElement.scrollTop);
};

let wintopPre = 100000000;
let scrollLine, header, mask;

window.onload = () => {
    document.getElementById("dropdown-menu").checked = false;
    scrollLine = document.getElementsByClassName("scroll-line")[0].style;
    header = document.getElementsByClassName("header")[0].style;
    mask = document.getElementsByClassName("mask")[0].style
    resize();
};

document.body.onresize = resize;

window.onresize = resize;

let onscrollTimer = true;

window.onscroll = () => {
    const winTop = document.body.scrollTop || document.documentElement.scrollTop;
    const scrolled = winTop * heightDiff;
    scrollLine.width = scrolled + "%";
    if (onscrollTimer) {
        setTimeout(() => {
            onscrollTimer = true;
            scroollAction(winTop);
        }, 200); 
        onscrollTimer = false;
    }
};