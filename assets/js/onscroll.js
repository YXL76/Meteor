let scrollLine = document.getElementById('scroll-line').style
let header = document.getElementById('header').style

let heightDiff = 0
let wintopPre = 100000000

function moveHeader(winTop) {
    const diff = winTop - wintopPre
    if (diff > 4) header.top = '-60px'
    else if (diff < -4) header.top = '0'
    wintopPre = winTop
}

function moveLine(winTop) {
    const scrolled = winTop * heightDiff
    scrollLine.width = scrolled + '%'
}

function resize() {
    heightDiff = 100 / (document.body.scrollHeight - window.innerHeight)
}

document.addEventListener('DOMContentLoaded', resize, false)
window.onresize = resize
document.body.onresize = resize

let scrollIndex = 0
let scrollTrigger = document.getElementsByClassName('scroll-trigger')
const scrollLength = scrollTrigger.length

function sTrigger(winTop) {
    for (let i = scrollIndex; i < scrollLength; ++i) {
        if (scrollTrigger[i].offsetTop < winTop) {
            scrollTrigger[i].classList.add('visible')
            scrollIndex += 1
        } else break
    }
    if (scrollIndex === scrollLength) resize()
}

sTrigger(document.body.scrollTop || document.documentElement.scrollTop + window.innerHeight - 128)

window.onscroll = () => {
    const winTop = document.body.scrollTop || document.documentElement.scrollTop
    moveLine(winTop)
    moveHeader(winTop)
    if (scrollIndex !== scrollLength) sTrigger(winTop + window.innerHeight - 128)
}
