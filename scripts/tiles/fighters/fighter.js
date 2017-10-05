function Fighter(name,style = null)
{
  Event.call(this, new Pos(0,0));

  this.name = name;
  this.is_collider = true;
  this.status = "idle";
  this.type = "fighter";
  this.character = "unknown"

  this.style = style;

  this.interface = new Fighter_Interface(this);

  this.hp = 3;
  this.stamina = 200;

  this.sprite = document.createElement("sprite");
  this.el.appendChild(this.sprite);

  this.start = function()
  {
    console.log("!!!!!")
    this.el.className = "fighter "+this.character;
  }

  this.setup = function()
  {

  }

  this.spawn_at = function(spawn)
  {
    console.log(this.name+" spawn",spawn.pos.toString())

    markl.arena.el.appendChild(this.el);
    
    spawn.fighter = this;
    this.pos = spawn.pos;

    this.el.setAttribute("style","left:"+this.pos.html().x+"px;top:"+this.pos.html().y+"px");  
    this.update();
  }

  this.update = function(new_class = "")
  {
    if(this.hp < 1 || this.stamina < 1){ 
      this.kill();
    }
    this.interface.update();
  }

  this.act = function()
  {
    this.style.act();
  }

  this.damage = function(val)
  {
    this.hp -= val;
    this.update();
  }

  this.kill = function()
  {
    this.el.className = "fighter dead";
    this.is_collider = false;
    this.is_visible = false;
  }

  this.knockback = function(vector)
  {
    var destination = this.pos.add(vector);
    console.log(this.name+" knockbacked to:"+destination);
    
    if(this.can_move_to(destination)){
      this.pos = destination;
      $(this.el).animate({ top:destination.html().y, left:destination.html().x }, ACT_SPEED/4);
    }
    this.stun();
    this.update();
  }

  this.stun = function()
  {
    this.stamina -= 10;
    this.el.className = "fighter knocked";
  }

  this.can_move_to = function(pos)
  {
    if(!markl.arena.is_within_limits(pos)){ return false; }
    if(markl.arena.colliders_at(pos).length > 0){ return false; }

    return true;
  }

  this.is_alive = function()
  {
    return this.hp > 0 && this.stamina > 0 ? true : false;
  }

  this.find_sights = function()
  {
    return markl.arena.event_visible_from(this.pos);
  }

  this.find_target = function(sights)
  {
    var candidates = sights;

    for(id in candidates){
      var sighted_fighter = candidates[id];
      var offset = sighted_fighter.pos.offset(this.pos);
      if(Math.abs(offset.x) == 1){ return sighted_fighter; }
      if(Math.abs(offset.y) == 1){ return sighted_fighter; }
    }
    return null;
  }

  this.end_turn = function()
  {
    console.log("End turn");
    return;
  }
}