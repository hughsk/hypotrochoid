var cos = Math.cos
  , sin = Math.sin

module.exports = hypotrochoid

function hypotrochoid(d, radii, t, output) {
  output = output || []

  var x = 0
    , y = 0
    , i = 0
    , l = radii.length - 1
    , a
    , b

  var cosT = cos(t)
    , sinT = sin(t)

  for (; i < l; i += 1) {
    b = radii[i+1]
    a = radii[i] - b
    x += a * cosT + d * cos(a / b * t)
    y += a * sinT - d * sin(a / b * t)
  }

  output[0] = x
  output[1] = y

  return output
}
