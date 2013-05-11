# hypotrochoid #

Returns points across one or more
[hypotrochoids](http://en.wikipedia.org/wiki/Hypotrochoid) for varying values
of `t`.

Trivia: you can trace out curves like this using a
[spirograph](http://en.wikipedia.org/wiki/Spirograph), yielding similar
results to Guilloché machines - which were used to create intricate patterns
[resistant to counterfeiting](http://en.wikipedia.org/wiki/Guilloch%C3%A9#In_today.E2.80.99s_terminology).

[check out the demo](http://hughsk.github.io/hypotrochoid)

## Installation ##

``` bash
npm install hypotrochoid
```

## Usage ##

**hypotrochoid(distance, radii, t, [result])**

* `distance` is the distance of each point from the interior circle(s).
* `radii` is an array of circle radii - use two elements for a simple
  hypotrochoid. Three or more will sum the results for each adjacent
  pair of elements.
* `t` the point across the curve.
* `result` is an array you can use to output the X/Y position to - otherwise,
  a new array will be created and returned.

![Hypotrochoid](http://upload.wikimedia.org/wikipedia/commons/f/fa/HypotrochoidOutThreeFifths.gif)
