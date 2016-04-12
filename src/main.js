import $ from 'jquery'

const canvas = $('#canvas')
const context = document.getElementById('canvas').getContext('2d')
let paint = false

const clickX = []
const clickY = []
const clickDrag = []

function addClick(x, y, dragging) {
  clickX.push(x)
  clickY.push(y)
  clickDrag.push(dragging)
}

function redraw() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
  context.strokeStyle = '#ffcf33'
  context.lineJoin = 'round'
  context.lineWidth = 15

  let i = 0
  for (i; i < clickX.length; i++) {
    context.beginPath()
    if (clickDrag[i] && i) {
      context.moveTo(clickX[i - 1], clickY[i - 1])
    } else {
      context.moveTo(clickX[i] - 1, clickY[i])
    }
    context.lineTo(clickX[i], clickY[i])
    context.closePath()
    context.stroke()
  }
}

canvas.mousedown(function(e) {
  paint = true
  const mouseX = e.pageX - this.offsetLeft
  const mouseY = e.pageY - this.offsetTop

  addClick(mouseX, mouseY)
  redraw()
})

canvas.mousemove(function(e) {
  if (paint) {
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true)
    redraw()
  }
})

canvas.mouseup(() => {
  paint = false
})

canvas.mouseleave(() => {
  paint = false
})
