var GamePlayScene = function(game, canv)
{
  var self = this;
  var drawer;
  var hoverer;
  var clicker;
  var assetter;

  var laptop;
  var bg;
  var ground;

  self.ready = function()
  {
    drawer = new Drawer(canv);
    hoverer = new Hoverer(canv);
    clicker = new Clicker(canv);
    assetter = new Assetter(canv);

    bg = new BG();
    drawer.register(bg);

    ground = new Ground();
    drawer.register(ground);

    laptop = new Laptop({"x":25,"y":20,"w":30,"h":14});
    drawer.register(laptop);
    hoverer.register(laptop);
    clicker.register(laptop);
  };

  self.tick = function()
  {
    hoverer.flush();
    clicker.flush();
  };

  self.draw = function()
  {
    drawer.flush();
  };

  self.cleanup = function()
  {
  };

  var Laptop = function(args)
  {
    var self = this;
    var hovering = false;

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

      canv.context.strokeStyle = "#D11208";
      canv.context.beginPath();
      canv.context.moveTo(x(0.1),y(0.0));
      canv.context.lineTo(x(0.0),y(1.0));
      canv.context.lineTo(x(0.9),y(1.0));
      canv.context.lineTo(x(1.0),y(0.0));
      canv.context.stroke();
    }
    self.hover = function()
    {
      hovering = true;
    }
    self.unhover = function()
    {
      hovering = false;
    }
    self.click = function()
    {
    }
  }

  var BG = function()
  {
    var self = this;

    self.draw = function()
    {

    }
  }

  var Ground = function()
  {
    var self = this;

    self.draw = function()
    {

    }
  }
};

