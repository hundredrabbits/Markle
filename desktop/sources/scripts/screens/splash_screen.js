'use strict'

function SplashScreen () {
  Screen.call(this, 'splash')

  this.logo = this._create_el('logo')

  this.install = function (host) {
    this.el.appendChild(this.logo)

    host.appendChild(this.el)
  }

  this.run = function (speed = 250) {
    if (!markl.scenario || !markl.scenario.script) { console.log('Missing script'); return }

    console.log('Found script!')

    setTimeout(() => {
      // markl.flow.goto('fighter')
    }, speed)
  }
}

module.exports = SplashScreen
