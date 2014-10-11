var IntroScene = function(game, canv)
{
  var self = this;
  var drawer;
  var dragger;
  var assetter;

  var logo;
  self.ready = function()
  {
    drawer = new Drawer(canv);
    dragger = new Dragger(canv);
    assetter = new Assetter(canv);

    logo = new LenoLogo({"x":10,"y":10,"w":50,"h":10});
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

};

