'use strict'

function MirrorYTile (pos = { x: 0, y: 0, z: -1 }) {
  Event.call(this, 'mirrory', pos)

  this.sprite.color = 'yellow'

  this.onStep = function (e) {
    if (!e.pos.effect) { e.pos.effect = { x: 1, y: 1 } }
    e.pos.effect.y = e.pos.effect.y ? e.pos.effect.y * -1 : -1
  }

  this.toString = function () {
    return `|y`
  }
}
