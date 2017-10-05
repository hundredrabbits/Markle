
var TILE_SIZE = new Size(80,80);
var ACT_SPEED = 100;

// Responses

var UP = new Vector(0,1);
var DOWN = new Vector(0,-1);
var LEFT = new Vector(-1,0);
var RIGHT = new Vector(1,0);

function Markl()
{
  this.el = document.createElement('yu');
  this.el.className = "screen";

  this.screen = null;

  this.arena = null;
  this.fighter = null;
  this.fighters = [];
  this.battle = null;

  this.designer = new Designer();
  this.keyboard = new Keyboard();

  this.install = function()
  {
    document.body.appendChild(this.el);
  }
  
  this.start = function()
  {
    console.log("start");

    this.keyboard.install();
    this.designer.install();

    this.designer.select_style(new Style("custom",menu_test));

    this.select_fighter(new Lancer("USER"));

    this.show(new Character_Screen());
  }

  this.show = function(screen)
  {
    this.screen = screen;
    this.el.innerHTML = "";
    this.el.appendChild(screen.el);
    screen.start();
  }

  this.select_arena = function(arena)
  {
    console.log("Selecting arena:",arena.name);
    this.arena = arena;
  }

  this.select_fighter = function(fighter)
  {
    console.log("Selecting fighter:",fighter.name);
    this.fighter = fighter;
    this.fighters.push(this.fighter);
    this.fighter.setup();
    this.designer.update();
  }

  this.select_opponents = function(opponents)
  {
    for(id in opponents){
      this.fighters.push(opponents[id]);
    }
  }
}

window.addEventListener('dragover',function(e)
{
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
});

window.addEventListener('drop', function(e)
{
  e.stopPropagation();
  e.preventDefault();
  // markl.battle.start();
});