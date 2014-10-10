var IntroScene = function(game, canv)
{
  var self = this;
  var drawer;
  var dragger;

  var logo;
  self.ready = function()
  {
    drawer = new Drawer(canv);
    dragger = new Dragger(canv);

    logo = new LenoLogo({"x":0,"y":0,"w":100,"h":20});
    drawer.register(logo);
  };

  self.tick = function()
  {

  };

  self.draw = function()
  {
    drawer.flush();
  };

  self.cleanup = function()
  {
  };

};

var LenoLogo = function(args)
{
  var self = this;

  //example args
  self.x = args.x ? args.x : 0;
  self.y = args.y ? args.y : 0;
  self.w = args.w ? args.w : 100;
  self.h = args.h ? args.h : 20;

  //homo coords
  function x(inx) { return self.x+(inx*self.w) }
  function y(iny) { return self.y+(iny*self.h) }

  self.draw = function(canv)
  {
    canv.context.strokeStyle = "#00FF00";
    canv.context.beginPath();
    canv.context.moveTo(x(0.1),y(0));
    canv.context.lineTo(x(0),  y(0.9));
    canv.context.stroke();
  }
}


