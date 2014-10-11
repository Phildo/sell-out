var IntroScene = function(game, canv)
{
  var self = this;
  var drawer;
  var dragger;
  var hoverer;
  var clicker;
  var assetter;

  var logo;
  var slap;

  self.ready = function()
  {
    drawer = new Drawer(canv);
    dragger = new Dragger(canv);
    hoverer = new Hoverer(canv);
    clicker = new Clicker(canv);
    assetter = new Assetter(canv);

    logo = new LenoLogo({"x":15,"y":5,"w":50,"h":10});
    drawer.register(logo);

    slap = new Slap({"x":25,"y":20,"w":30,"h":14});
    drawer.register(slap);
    hoverer.register(slap);
    clicker.register(slap);
  };

  self.tick = function()
  {
    dragger.flush();
    hoverer.flush();
    clicker.flush();
  };

  self.draw = function()
  {
    drawer.flush();
  };

  self.cleanup = function()
  {
    drawer = null;
    dragger = null;
    hoverer = null;
    clicker = null;
    assetter = null;
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
      canv.context.drawImage(assetter.asset("logo.png"),self.x,self.y,self.w,self.h);
    }
  }

  var Slap = function(args)
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
      hovering ? (canv.context.fillStyle = "#E12218") : (canv.context.fillStyle = "#F13228");
      canv.context.fillRect(self.x,self.y,self.w,self.h);

      canv.context.strokeStyle = "#000000";
      canv.context.rect(self.x,self.y,self.w,self.h);
      canv.context.stroke();

      canv.context.drawImage(assetter.asset("slap.png"),self.x+2,self.y+2,self.w-4,self.h-4);
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
      game.nextScene();
    }
  }

};

