const canvas = document.querySelector('.signature-area')
const signPad = document.querySelector('.pad-form')
const clearBtn = document.querySelector('.clear-btn')
const downloadBtn = document.querySelector('.download-btn')
const sendBtn = document.querySelector('.send-btn')
const penSize = document.querySelector('.pen-size')

const ctx = canvas.getContext('2d');
let editMode = false;

canvas.width = 600
canvas.height = 400

let signaturePen = 1

penSize.addEventListener('keyup', () => {
    clearPad()
    signaturePen = penSize.value
})

signPad.addEventListener('submit', (e) => {
    e.preventDefault()
    const imgURL = canvas.toDataURL()
    
    // const img = document.createElement('img')
    // img.src = imgURL
    // img.height = canvas.height;
    // img.width = canvas.width;
    // img.style.display = 'block'
    // img.style.marginLeft = 'auto'
    // img.style.marginRight = 'auto'
    // signPad.appendChild(img)

    const downloadLink = document.createElement('a')
    downloadLink.download = 'E-Signature.png';
    downloadLink.href = imgURL;
    downloadLink.click();
    
    clearPad()
})

const clearPad = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

clearBtn.addEventListener('click', (e) => {
    e.preventDefault()
    clearPad()
})

const drawerPosition = (e) => {
    positionX = e.clientX - e.target.getBoundingClientRect().x
    positionY = e.clientY - e.target.getBoundingClientRect().y

    return [positionX, positionY]
}

const drawerMove = (e) => {
    if(!editMode){
        return
    }

    const [positionX, positionY] = drawerPosition(e)
    ctx.lineTo(positionX, positionY)
    ctx.stroke()
    ctx.lineWidth = signaturePen;
}

const drawerUp = () => {
    editMode = false
}

const drawerDown = (e) => {
    editMode = true
    ctx.beginPath()

    const [positionX, positionY] = drawerPosition(e)
    ctx.moveTo(positionX, positionY)
}


ctx.lineWidth = 3
ctx.lineJoin = ctx.lineCap = 'round'

canvas.addEventListener('pointerdown', drawerDown, {passive: true} )
canvas.addEventListener('pointerup', drawerUp, {passive: true} )
canvas.addEventListener('pointermove', drawerMove, {passive: true} )