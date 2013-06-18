var dat = require('./vendor/dat.gui.js')
  , raf = require('raf')
  , hypotrochoid = require('./')

var canvas = document.createElement('canvas')
  , ctx = canvas.getContext('2d')
  , gui = new dat.GUI
  , sliders = []
  , output = []
  , width
  , height

var radii = [
    Math.random() * 190 + 10
  , Math.random() * 190 + 10
  , Math.random() * 190 + 10
  , Math.random() * 190 + 10
  , Math.random() * 190 + 10
  , Math.random() * 190 + 10
]

var options = {
    'Slider Count': 3
  , 'Radius #1': radii[0]
  , 'Radius #2': radii[1]
  , 'Radius #3': radii[2]
  , 'Radius #4': radii[3]
  , 'Radius #5': radii[4]
  , 'Radius #6': radii[5]
  , 'Size': 30 + Math.random() * 60
  , 'Undulate': true
}

gui.add(options, 'Size', 0, 200)
   .step(1)
   .onChange(draw)

gui.add(options, 'Slider Count', 2, 6)
   .step(1)
   .onFinishChange(updateSliders)

gui.add(options, 'Undulate')

document.body.style.background = '#000'
document.body.style.margin = '0'
document.body.style.padding = '0'
document.body.appendChild(canvas)

function updateSliders(count) {
  sliders.forEach(function(slider, n) {
    slider.domElement.parentNode.parentNode.parentNode.parentNode.removeChild(slider.domElement.parentNode.parentNode.parentNode)
  })
  sliders = []
  for (var i = 0; i < count; i += 1) (function(i) {
    options[key] = radii[i] = radii[i] || 50

    var key = 'Radius #' + (i+1)
    var slider = gui.add(options, key, 10, 200).onChange(function(value) {
      radii[i] = value
      draw()
    })

    sliders.push(slider)
  })(i)

  radii.length = count
  draw()
}
updateSliders(options['Slider Count'])

function draw() {
  var h = options['Size']

  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, width, height)
  ctx.save()
  ctx.translate(width/2, height/2)

  ctx.globalCompositeOperation = 'lighter'
  ctx.strokeStyle = 'rgba(205,255,215,0.25)'
  ctx.beginPath()

  // The rest of the code is presentation:
  // this is how you would use the module
  // to trace out a curve.
  hypotrochoid(h, radii, 0, output)
  ctx.moveTo(output[0], output[1])
  for (var i = 0; i < 40000; i += 2.5) {
    hypotrochoid(h, radii, i * Math.PI / 200, output)
    ctx.lineTo(output[0], output[1])
  }

  ctx.stroke()
  ctx.restore()
}


function resize() {
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
  draw()
}
;(window.onresize = resize)()

raf(canvas).on('data', function() {
  if (!options.Undulate) return
  var now = Date.now ? Date.now() : +new Date

  for (var i = 0, l = radii.length; i < l; i += 1) {
    radii[i] += Math.sin((now - i * 5000) * 0.0001 * Math.sin(i / 1.3)) * 0.0025
    options.Size += Math.sin((now + 5000) * 0.00008) * 0.025
  }

  draw()
})
