function Sprite(type,id)
{
  this.el = document.createElement('sprite');

  var STAGE = {padding:{x:15,y:15},tile:80}

  this.setup = function(h)
  {
    this.el.style.width = `${STAGE.tile}px`;
    this.el.style.height = `${STAGE.tile}px`;
    this.to(h.pos);
  }

  this.to = function(pos)
  {
    this.el.style.left = `${pos.x * STAGE.tile}px`;
    this.el.style.top = `${pos.y * STAGE.tile}px`;
  }

  this.animate_to = function(pos)
  {
    this.to(pos);
  }
}