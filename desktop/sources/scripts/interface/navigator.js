'use strict'

function Navigator () {
  let Fightlang = require('../server/fightlang/fightlang')
  let Fightscript = require('../server/fightlang/fightscript')
  let Fightrune = require('../server/fightlang/fightrune')

  this.timeline = new Timeline()

  this.el = document.createElement('div')
  this.el.id = 'navigator'

  this._label = document.createElement('div')
  this._label.className = 'label'
  this.run_button = document.createElement('button')
  this.run_button.className = 'run'
  this.run_button.onclick = () => { this.toggle() }

  this.is_paused = false
  this.is_running = false
  this.history = null
  this.index = 0
  this.timer = null

  this.install = function (host) {
    this.el.appendChild(this.run_button)
    this.el.appendChild(this._label)

    this.timeline.install(this.el)

    host.appendChild(this.el)

    this.start()
    this.update()
  }

  this.start = function () {
    this.timeline.start()
    this.update()
  }

  this.update = function () {
    if(!this[`${markl.flow.active}_update`]){ this.default_update(); return; }

    this[`${markl.flow.active}_update`]()
    this.toggle(markl.scenario && markl.scenario.script)
  }

  this.default_update = function()
  {
    this._label.textContent = markl.flow.active
  }

  this.splash_update = function()
  {
   
  }

  this.fighter_update = function()
  {
    // TODO: Display line ID for trigger
    if(markl.scenario.fighter){
      this._label.textContent = `${markl.flow.active} > ${new markl.scenario.fighter().name}`  
    }
    else{
      this._label.textContent = `${markl.flow.active}`  
    }
  }

  this.stage_update = function()
  {
    this._label.textContent = `${markl.flow.active}`  
  }

  this.run = function () {
    console.info('Navigator', 'Run')

    this.update()

    // markl.scenario.reload()
    // markl.scenario.inject_style(this.fightscript.render());
    // markl.navigator.history = markl.scenario.run();

    // this.index = 0;
    // this.is_paused = false;
    // this.is_running = true;

    // markl.renderer.update(this.history[this.index].state,this.history[this.index].reaction);
  }

  this.play = function (delay = 0) {
    console.info('Playing..')

    setTimeout(() => {
      this.run()
    }, TIMING.delayed_start / 2)

    setTimeout(() => {
      this.timer = setInterval(() => { this.next() }, TIMING.turn)
    }, TIMING.delayed_start)
  }

  this.pause = function () {
    console.info('trying to pause')

    if (!this.is_running) { this.run() }
    if (!this.history) { return }
    if (this.is_paused) { return }

    console.info('paused')

    this.is_paused = true
    clearInterval(this.timer)

    markl.renderer.update(this.history[this.index].state)
  }

  this.resume = function () {
    console.info('resume')

    this.is_paused = false
    this.timer = setInterval(() => { this.next() }, TIMING.turn)

    markl.renderer.update(this.history[this.index].state)
  }

  this.stop = function () {
    console.info('stop')

    this.is_paused = false
    this.is_running = false
    this.index = 0
    clearInterval(this.timer)

    if (this.history) {
      markl.renderer.update(this.history[this.index].state)
    }
  }

  this.next = function () {
    if (!this.history || !this.history[this.index]) { console.warn('No history'); this.pause(); return }
    if (this.index >= this.history.length - 1) { console.warn('Reached the End'); this.pause(); return }
    if (this.history[this.index].state.players[0].hp < 0) { console.warn('Player is dead'); this.pause(); return }

    this.index += 1

    // Skip Wait turns
    while (this.should_skip() == true && this.index < this.history.length - 1) {
      this.index += 1
    }

    markl.renderer.update(this.history[this.index].state)
  }

  this.prev = function () {
    if (!this.history || !this.history[this.index]) { console.warn('No history'); this.pause(); return }
    if (this.index < 1) { console.warn('Reached the beginning'); this.pause(); return }
    if (this.history[this.index].state.players[0].hp < 0) { console.warn('Player is dead'); this.pause(); return }

    this.index -= 1

    // Skip Wait turns
    while (this.should_skip() == true && this.index > 0) {
      this.index -= 1
    }

    markl.renderer.update(this.history[this.index].state)
  }

  this.first = function () {
    if (!this.history || !this.history[this.index]) { console.warn('No history'); this.pause(); return }

    this.index = 0
    markl.renderer.update(this.history[this.index].state)
  }

  this.last = function () {
    if (!this.history || !this.history[this.index]) { console.warn('No history'); this.pause(); return }

    this.index = this.history.length - 1
    markl.renderer.update(this.history[this.index].state)
  }

  this.should_skip = function () {
    return !!(this.history[this.index] && this.history[this.index - 1] && this.history[this.index].action == 'WAIT' && this.history[this.index - 1].action == 'WAIT')
  }

  // Display

  this.show = function () {
    if (this.el.className == 'shown') { return }
    this.el.className = 'shown'
  }

  this.hide = function () {
    if (this.el.className == 'hidden') { return }
    this.el.className = 'hidden'
  }

  this.toggle = function (show) {
    if (show) {
      this.show()
    } else {
      this.hide()
    }
  }
}
