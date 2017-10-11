function Arena_Screen()
{
  Screen.call(this);
  
  this.name = "arena selection";
  this.index = 0;

  this.el.className = "arena_selection";

  this.start = function()
  {
    console.info("ARENA","start")

    if(markl.arena){
      this.leave();
      return;
    }

    var html = "";  

    for(id in campaign.stages){
      html += "<ln>"+campaign.stages[id]+"</ln>";
    }
    this.el.innerHTML = "<list>"+html+"</list>"

    this.move_to(0);
    this.next();
  }

  this.select_arena = function(name)
  {
    for(id in arenas){
      if(arenas[id].name.toUpperCase() == name.toUpperCase()){
        markl.select_arena(arenas[id]);
      }
    }
    markl.designer.update();
  }

  this.next = function()
  {
    var s = this;
    this.index += 1;
    this.index = this.index % Object.keys(arenas).length;

    this.move_to(this.index);

    var fighter = markl.fighter;
    var triggers = this.find_triggers(fighter);
    var reaction = fighter.style.react(triggers);

    if(reaction && reaction.actions[0].name == "SELECT" && markl.designer.is_running){
      this.select_arena(reaction.target);
    }

    if(markl.arena){
      this.leave();
      return;
    }

    setTimeout(function(){ s.next(); }, ACT_SPEED * 4);
  }

  this.find_triggers = function()
  {
    var names = [];

    for(id in arenas){
      names.push(arenas[id].name.toUpperCase());
    }

    var name_is = "NAME IS "+names[this.index];
    var triggers = {"MENU":{"ARENA":{}}};
    triggers["MENU"]["ARENA"][name_is] = names[this.index];

    return triggers;
  }

  this.move_to = function(index)
  {
  }

  this.leave = function()
  {
    console.log("LEAVE")
    // markl.show(new Battle_Screen());
  }
}