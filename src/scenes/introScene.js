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

    logo = new LenoLogo({"x":0,"y":0,"w":50,"h":10});
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
      canv.context.drawImage(assetter.asset("logo.png"),10,10,50,10);
      /* example of what not to do
      canv.context.strokeStyle = "#000000";
      canv.context.lineWidth = 1;

      canv.context.beginPath();
      //L
      canv.context.moveTo(x(0.1),y(0));
      canv.context.lineTo(x(0),  y(0.9));
      canv.context.lineTo(x(0.1),  y(0.9));

      //e
      canv.context.moveTo(x(0.1),  y(0.6));
      canv.context.lineTo(x(0.2),  y(0.6));
      canv.context.arc(   x(0.15), y(0.6), x(0.05), 0, 0.2 * Math.PI, true);

      canv.context.moveTo(x(0.23),  y(0.4));
      canv.context.lineTo(x(0.22),  y(0.9));
      canv.context.arc(   x(0.28),  y(0.6), x(0.05), 1.0 * Math.PI, 0, false);

      canv.context.stroke();
      */
    }
  }

};

