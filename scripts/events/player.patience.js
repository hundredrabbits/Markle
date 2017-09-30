function Patience(name,style)
{
  Player.call(this,name,style);

  // Sprite
  var e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  e.setAttribute("class","icon");

  var s = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  s.setAttribute("cx","25");
  s.setAttribute("cy","25");
  s.setAttribute("r","5");
  s.setAttribute("stroke","red");

  e.appendChild(s);

  this.el.appendChild(e);
}