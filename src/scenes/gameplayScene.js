var GamePlayScene = function(game, canv)
{
  var self = this;
  var ticker;
  var drawer;
  var hoverer;
  var clicker;
  var assetter;

  var camera;

  var hand;
  var laptop;
  var podium;
  var ground;
  var bg;

  self.ready = function()
  {
    ticker = new Ticker(canv);
    drawer = new Drawer(canv);
    hoverer = new Hoverer(canv);
    clicker = new Clicker(canv);
    assetter = new Assetter(canv);

    camera = new Camera();
    ticker.register(camera);

    bg = new BG({}, camera);
    drawer.register(bg);

    ground = new Ground({}, camera);
    drawer.register(ground);

    podium = new Podium({"x":34,"y":canv.height-36,"w":15,"h":26}, camera);
    drawer.register(podium);

    laptop = new Laptop({"x":30,"y":canv.height-50,"w":25,"h":14}, camera);
    ticker.register(laptop);
    drawer.register(laptop);
    hoverer.register(laptop);
    clicker.register(laptop);

    hand = new Hand({"x":20,"y":canv.height-60,"w":45,"h":34}, camera);
    ticker.register(hand);
    drawer.register(hand);
  };

  self.tick = function()
  {
    ticker.flush();
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

  var Camera = function()
  {
    var self = this;

    self.x = 0;
    self.y = 0;

    self.trueX = 0;
    self.trueY = 0;

    var shakeamt = 0;
    self.shake = function(amt)
    {
       shakeamt = amt;
    }

    self.tick = function()
    {
      self.x = self.trueX+(((Math.random()*2)-1)*shakeamt);
      self.y = self.trueY+(((Math.random()*2)-1)*shakeamt);
      shakeamt *= 0.9;
    }
  }

  var Hand = function(args, cam)
  {
    var self = this;

    self.x = args.x ? args.x : 0;
    self.y = args.y ? args.y : 0;
    self.w = args.w ? args.w : 100;
    self.h = args.h ? args.h : 20;

    self.rotation = 0;
    self.rotating = 1;

    //homo coords
    //
    {
    }

    var s;
    var c;
    function calctrig()
    {
      s = Math.sin((self.rotation*3.1415)/180);
      c = Math.cos((self.rotation*3.1415)/180);
    }

    function x(inx,iny)
    {
      return (self.x+((((inx*2-1)*c - (iny*2-1)*s)+1)/2)*self.w)-cam.x;
    }
    function y(inx,iny)
    {
      return (self.y+((((inx*2-1)*s + (iny*2-1)*c)+1)/2)*self.h)-cam.y;
    }

    self.tick = function()
    {
      self.rotation += 2*self.rotating;
      if(self.rotation >=  70 && self.rotating ==  1) self.rotating = -1;
      if(self.rotation <= -70 && self.rotating == -1) self.rotating =  1;
      calctrig();
    }
    self.draw = function(canv)
    {
      canv.context.strokeStyle = "#EEC9C1";
      canv.context.beginPath();
      canv.context.moveTo(x(0.0,0.3),y(0.0,0.3));
      canv.context.lineTo(x(0.0,0.7),y(0.0,0.7));
      canv.context.stroke();
    }
  }

  var Laptop = function(args, cam)
  {
    var self = this;
    var hovering = false;

    self.x = args.x ? args.x : 0;
    self.y = args.y ? args.y : 0;
    self.w = args.w ? args.w : 100;
    self.h = args.h ? args.h : 20;

    //homo coords
    function x(inx) { return (self.x+(inx*self.w))-cam.x; }
    function y(iny) { return (self.y+(iny*self.h))-cam.y; }

    self.tick = function()
    {
    }
    self.draw = function(canv)
    {
      canv.context.strokeStyle = "#D11208";
      canv.context.beginPath();
      canv.context.moveTo(x(0.1),y(0.0));
      canv.context.lineTo(x(0.0),y(1.0));
      canv.context.lineTo(x(0.9),y(1.0));
      canv.context.lineTo(x(1.0),y(0.0));
      canv.context.lineTo(x(0.1),y(0.0));
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
      cam.shake(5);
    }
  }

  var Podium = function(args, cam)
  {
    var self = this;

    self.x = args.x ? args.x : 0;
    self.y = args.y ? args.y : 0;
    self.w = args.w ? args.w : 100;
    self.h = args.h ? args.h : 20;

    //homo coords
    function x(inx) { return (self.x+(inx*self.w))-cam.x; }
    function y(iny) { return (self.y+(iny*self.h))-cam.y; }

    self.draw = function(canv)
    {
      canv.context.strokeStyle = "#444444";
      canv.context.rect(x(0),y(0),self.w,self.h);
      canv.context.stroke();
    }
  }

  var BG = function(args, cam)
  {
    var self = this;

    self.draw = function()
    {

    }
  }

  var Ground = function(args, cam)
  {
    var self = this;

    self.draw = function()
    {

    }
  }
};

