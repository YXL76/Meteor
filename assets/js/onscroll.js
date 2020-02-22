document.getElementById('dropdown-menu-input').checked = false
let scrollLine = document.getElementById('scroll-line').style
let header = document.getElementById('header').style
let dropdownIcon = document.getElementById('dropdown-icon').className
let mask = document.getElementById('mask').style

function Dropdown(event) {
    if (event) {
        mask.display = 'block'
        dropdownIcon = 'checked'
    } else {
        mask.display = 'none'
        dropdownIcon = ''
    }
}

let heightDiff = 0
let wintopPre = 100000000

function moveHeader(winTop) {
    if (Math.abs(winTop - wintopPre) > 4) {
        if (winTop > wintopPre) {
            header.top = '-60px'
        } else {
            header.top = '0'
        }
    }
    wintopPre = winTop;
}

function moveLine(winTop) {
    const scrolled = winTop * heightDiff
    scrollLine.width = scrolled + '%'
}

function resize() {
    heightDiff = 100 / (document.body.scrollHeight - window.innerHeight)
    moveLine(document.body.scrollTop || document.documentElement.scrollTop)
}

window.onload = resize
window.onresize = resize
document.body.onresize = resize

window.onscroll = () => {
    const winTop = document.body.scrollTop || document.documentElement.scrollTop
    moveLine(winTop)
    moveHeader(winTop)
};
