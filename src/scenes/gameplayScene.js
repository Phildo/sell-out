var GamePlayScene = function(game, canv)
{
  var self = this;
  var ticker;
  var drawer;
  var hoverer;
  var clicker;
  var assetter;

  var camera;

  var scoreD;
  var countD;
  var brad;
  var hand;
  var laptop;
  var footballs;
  var podium;
  var grass;
  var ground;
  var clouds;
  var bg;

  var st_aim = 0;
  var st_power = 1;
  var st_slap = 2;
  var st_pause = 3;
  var st_fly = 4;
  var st_done = 5;
  var state = st_aim;

  var score = 0;

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

    clouds = new Clouds({}, camera);
    drawer.register(clouds);

    ground = new Ground({}, camera);
    drawer.register(ground);

    grass = new Grass({}, camera);
    drawer.register(grass);

    podium = new Podium({"x":40,"y":canv.height-36,"w":3,"h":26}, camera);
    drawer.register(podium);

    footballs = new Footballs({}, camera);
    ticker.register(footballs);
    drawer.register(footballs);

    laptop = new Laptop({"x":30,"y":canv.height-50,"w":25,"h":14}, camera);
    ticker.register(laptop);
    drawer.register(laptop);
    hoverer.register(laptop);
    clicker.register(laptop);

    brad = new Brad({"x":25,"y":0,"w":30,"h":30});
    drawer.register(brad);

    hand = new Hand({"x":20,"y":canv.height-60,"w":45,"h":34}, camera);
    ticker.register(hand);
    drawer.register(hand);

    countD = new CountDown(camera);
    ticker.register(countD);
    drawer.register(countD);

    scoreD = new Score();
    drawer.register(scoreD);

    document.getElementById('slapit').play();
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

  var CountDown = function(cam)
  {
    var self = this;
    var tleft = 300;
    self.draw = function(canv)
    {
      if(state == st_slap)
      {
        canv.context.fillStyle = "#000000";
        if(tleft > 200) canv.context.fillText("3...",105,40);
        else if(tleft > 100) canv.context.fillText("2...",105,40);
        else if(tleft > 0) canv.context.fillText("1...",105,40);
        if(tleft > 200) canv.context.fillText("3...",105,40);
        else if(tleft > 100) canv.context.fillText("2...",105,40);
        else if(tleft > 0) canv.context.fillText("1...",105,40);
        if(tleft > 200) canv.context.fillText("3...",105,40);
        else if(tleft > 100) canv.context.fillText("2...",105,40);
        else if(tleft > 0) canv.context.fillText("1...",105,40);
        if(tleft > 200) canv.context.fillText("3...",105,40);
        else if(tleft > 100) canv.context.fillText("2...",105,40);
        else if(tleft > 0) canv.context.fillText("1...",105,40);
      }
    }
    self.tick = function(canv)
    {
      if(state == st_slap)
      {
        tleft-=3;
        if(tleft < 0)
        {
          cam.shake(1);
          state = st_pause;
        }
      }
      else tleft = 300;
    }
  }

  var Score = function()
  {
    var self = this;
    self.draw = function(canv)
    {
      if(state == st_fly || state == st_done)
      {
        canv.context.fillStyle = "#000000";
        canv.context.fillText(Math.round(score/10)/10+"m",canv.width-50,10);
        canv.context.fillText(Math.round(score/10)/10+"m",canv.width-50,10);
        canv.context.fillText(Math.round(score/10)/10+"m",canv.width-50,10);
        canv.context.fillText(Math.round(score/10)/10+"m",canv.width-50,10);
      }
    }
  }

  var Brad = function(args)
  {
    var self = this;

    self.x = args.x ? args.x : 0;
    self.y = args.y ? args.y : 0;
    self.w = args.w ? args.w : 100;
    self.h = args.h ? args.h : 20;

    self.draw = function()
    {
      if(state == st_aim || state == st_power || state == st_slap)
        canv.context.drawImage(assetter.asset("brad.png"),self.x,self.y,self.w,self.h);
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
    self.power = 1;
    self.blink = 0;

    var s;
    var c;
    function calctrig()
    {
      s = Math.sin((self.rotation*3.1415)/180);
      c = Math.cos((self.rotation*3.1415)/180);
    }

    function x(inx,iny)
    {
      return (self.x+(((((inx*2-1)*c - (iny*2-1)*s)*self.power)+1)/2)*self.w)-cam.x;
    }
    function y(inx,iny)
    {
      return (self.y+(((((inx*2-1)*s + (iny*2-1)*c)*self.power)+1)/2)*self.h)-cam.y;
    }

    function dumbx(inx,iny)
    {
      return (self.x+inx*self.w)-cam.x;
    }
    function dumby(inx,iny)
    {
      return (self.y+iny*self.h)-cam.y;
    }

    var t = 0;
    var pausetime = 20;
    self.tick = function()
    {
      if(state == st_aim)
      {
        self.rotation += 2*self.rotating;
        if(self.rotation >=  70 && self.rotating ==  1) self.rotating = -1;
        if(self.rotation <= -70 && self.rotating == -1) self.rotating =  1;
        t = 0;
      }
      else if(state == st_power)
      {
        self.power = (Math.sin(t)+1)/2+0.5; t+=0.05;
      }
      else if(state == st_slap)
      {
        self.blink = Math.sin(t); t+=0.2;
        pausetime = 20;
      }
      else if(state == st_pause)
      {
        pausetime--;
        if(pausetime == 0)
        {
          pausetime = 20;
          state = st_fly;
          laptop.f_x = Math.cos((self.rotation*3.1415)/180)*self.power * 10;
          if(laptop.sup) laptop.f_x *= 2;
          laptop.f_y = -1*Math.sin((self.rotation*3.1415)/180)*self.power * 10;
          if(laptop.sup) laptop.f_y *= 2;
          if(laptop.sup) document.getElementById('nice').play();
          laptop.sup = false;
          cam.shake(10);
          self.power = 1;
        }
      }
      calctrig();
    }
    self.draw = function(canv)
    {
      if(state == st_aim || state == st_power || state == st_slap)
      {
        if(state == st_slap) self.blink > 0 ? canv.context.strokeStyle = "#EEC9C1" : canv.context.strokeStyle = "#FF8981";
        else                 canv.context.strokeStyle = "#EEC9C1";
        canv.context.beginPath();
        canv.context.moveTo(x(0.0,0.3),y(0.0,0.3));
        canv.context.lineTo(x(0.0,0.7),y(0.0,0.7));
        canv.context.stroke();
        canv.context.beginPath();
        canv.context.moveTo(x(0.0,0.3),y(0.0,0.3));
        canv.context.lineTo(x(0.0,0.7),y(0.0,0.7));
        canv.context.stroke();
        canv.context.beginPath();
        canv.context.moveTo(x(0.0,0.3),y(0.0,0.3));
        canv.context.lineTo(x(0.0,0.7),y(0.0,0.7));
        canv.context.stroke();
      }
      if(state == st_pause)
      {
        /*
        canv.context.strokeStyle = "#FF8981";
        canv.context.beginPath();
        canv.context.moveTo(dumbx(0.5,0.3),dumby(0.5,0.3));
        canv.context.lineTo(dumbx(0.5,0.7),dumby(0.5,0.7));
        canv.context.stroke();
        */
      }
    }
  }

  var Laptop = function(args, cam)
  {
    var self = this;
    var hovering = false;

    self.f_x = 0;
    self.f_y = 0;

    self.x = args.x ? args.x : 0;
    self.y = args.y ? args.y : 0;
    self.w = args.w ? args.w : 100;
    self.h = args.h ? args.h : 20;

    self.rotation = 0;
    self.sup = false;

    //homo coords
    var s;
    var c;
    function calctrig()
    {
      s = Math.sin((self.rotation*3.1415)/180);
      c = Math.cos((self.rotation*3.1415)/180);
    }

    function x(inx,iny)
    {
      return (self.x+(((((inx*2-1)*c - (iny*2-1)*s))+1)/2)*self.w)-cam.x;
    }
    function y(inx,iny)
    {
      return (self.y+(((((inx*2-1)*s + (iny*2-1)*c))+1)/2)*self.h)-cam.y;
    }

    //function x(inx) { return (self.x+(inx*self.w))-cam.x; }
    //function y(iny) { return (self.y+(iny*self.h))-cam.y; }

    calctrig();
    self.tick = function()
    {
      if(state == st_fly)
      {
        calctrig();
        score += self.f_x;
        self.y -= self.f_y;
        self.f_y -= .12;
        self.rotation += self.f_x;
        if(self.y > 50)
        {
          self.f_y *= -1;
          self.f_y *= 0.7;
          if(self.f_y < 1)
          {
            self.f_y = 0;
            state = st_done;
            document.getElementById('tough').play();
          }
          if(self.f_y > 3) document.getElementById('thud').play();
          self.y = 50;
          self.f_x *= 0.7;
          cam.shake(self.f_x/2);
        }
      }
    }
    self.draw = function(canv)
    {
      if(state == st_aim)
      {
        canv.context.fillStyle = "#000000";
        canv.context.fillText("< Aim!",68,40);
        canv.context.fillText("< Aim!",68,40);
        canv.context.fillText("< Aim!",68,40);
        canv.context.fillText("< Aim!",68,40);
      }
      if(state == st_power)
      {
        canv.context.fillStyle = "#000000";
        canv.context.fillText("< Power!",68,40);
        canv.context.fillText("< Power!",68,40);
        canv.context.fillText("< Power!",68,40);
        canv.context.fillText("< Power!",68,40);
      }
      if(state == st_slap)
      {
        canv.context.fillStyle = "#000000";
        canv.context.fillText("< Slap!",68,40);
        canv.context.fillText("< Slap!",68,40);
        canv.context.fillText("< Slap!",68,40);
        canv.context.fillText("< Slap!",68,40);
      }
      if(state == st_pause)
      {
        canv.context.fillStyle = "#FF0000";
        canv.context.fillText("< NOW!",68,40);
        canv.context.fillText("< NOW!",68,40);
        canv.context.fillText("< NOW!",68,40);
        canv.context.fillText("< NOW!",68,40);
      }

      if(state == st_done)
      {
        canv.context.fillStyle = "#000000";
        canv.context.fillText("< Retry?",68,58);
        canv.context.fillText("< Retry?",68,58);
        canv.context.fillText("< Retry?",68,58);
        canv.context.fillText("< Retry?",68,58);
      }

      canv.context.strokeStyle = "#C10208";
      if(hovering) canv.context.fillStyle = "#F6372D";
      else         canv.context.fillStyle = "#E6271D";
      if(state == st_pause)
      {
        canv.context.strokeStyle = "#FF0000";
        canv.context.fillStyle = "#FF0000";
      }
      if(self.sup) canv.context.fillStyle = "#FFFFFF";
      canv.context.beginPath();
      canv.context.moveTo(x(0.1,0.0),y(0.1,0.0));
      canv.context.lineTo(x(0.0,1.0),y(0.0,1.0));
      canv.context.lineTo(x(0.9,1.0),y(0.9,1.0));
      canv.context.lineTo(x(1.0,0.0),y(1.0,0.0));
      canv.context.lineTo(x(0.1,0.0),y(0.1,0.0));
      canv.context.moveTo(x(0.0,1.0),y(0.0,1.0));
      canv.context.lineTo(x(-0.2,0.8),y(-0.2,0.8));
      canv.context.lineTo(x(0.0,0.8),y(0.0,0.8));
      canv.context.stroke();
      canv.context.fill();
      if(self.sup) canv.context.strokeStyle = "#FFFFFF";
      else         canv.context.strokeStyle = "#000000";
      canv.context.beginPath();
      canv.context.moveTo(x(0.55,0.15),y(0.55,0.15));
      canv.context.lineTo(x(0.45,0.85),y(0.45,0.85));
      canv.context.lineTo(x(0.55,0.85),y(0.55,0.85));
      canv.context.stroke();

      if(self.y < -20)
      {
        canv.context.fillStyle = "#000000";

        canv.context.beginPath();
        canv.context.moveTo(self.x+10-2,5);
        canv.context.lineTo(self.x+10,  1);
        canv.context.lineTo(self.x+10+2,5);
        canv.context.stroke();

        canv.context.fillText(Math.round(self.y/-10)/10+"m",self.x,15);
        canv.context.fillText(Math.round(self.y/-10)/10+"m",self.x,15);
        canv.context.fillText(Math.round(self.y/-10)/10+"m",self.x,15);
        canv.context.fillText(Math.round(self.y/-10)/10+"m",self.x,15);
      }
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
      if(state == st_aim) state = st_power;
      else if(state == st_power)
      {
        setTimeout(function(){document.getElementById('slap').play();},800);
        state = st_slap;
      }
      else if(state == st_pause) { self.sup = true; }
      else if(state == st_done)
      {
        score = 0;
        self.rotation = 0;
        calctrig();
        self.f_x = 0;
        self.f_y = 0;
        self.y = canv.height-50;
        state = st_aim;
        document.getElementById('slapit').play();
      }
    }
  }

  var Footballs = function(args, cam)
  {
    var self = this;

    var x = -5;
    var y = 15;

    var mod = 500;
    var invisibletil = 0;
    self.draw = function(canv)
    {
      if(score > invisibletil)
      {
        invisibletil = 0;
        canv.context.strokeStyle = "#8B1B05";
        canv.context.fillStyle = "#AB3B25";
        canv.context.beginPath();
        canv.context.arc(mod-(score/2+x)%mod-20-cam.x,canv.height-y-cam.y-6,10,3.1415/4,3*3.1415/4, false);
        canv.context.arc(mod-(score/2+x)%mod-20-cam.x,canv.height-y-cam.y+6,10,5*3.1415/4,7*3.1415/4, false);
        canv.context.closePath();
        canv.context.stroke();
        canv.context.fill();
      }
    }
    self.tick = function()
    {
      var truex = mod-(score/2+x)%mod-20-cam.x;
      var truey = canv.height-y-cam.y;
      if(laptop.x+10 > truex - 15 && laptop.x+10 < truex + 15 &&
         laptop.y+10 > truey - 15 && laptop.y+10 < truey + 15)
      {
        laptop.f_y+=10;
        laptop.f_x*=2;
        cam.shake(30);
        document.getElementById('footbomb').play();
        document.getElementById('boom').play();
        invisibletil = score+400;
      }
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
    function x(inx) { return (self.x+(inx*self.w))-cam.x-score; }
    function y(iny) { return (self.y+(iny*self.h))-cam.y; }

    self.draw = function(canv)
    {
      canv.context.strokeStyle = "#777777";
      canv.context.fillStyle = "#999999";
      canv.context.rect(x(0),y(0),self.w,self.h);
      canv.context.stroke();
      canv.context.fill();
    }
  }

  var BG = function(args, cam)
  {
    var self = this;

    self.draw = function(canv)
    {
      canv.context.fillStyle = "#DBF4FF";
      canv.context.fillRect(0,0,canv.width,canv.height);
    }
  }

  var Clouds = function(args, cam)
  {
    var self = this;

    var offx1 = 0;
    var offx2 = 100;
    var offx3 = 135;
    var offy1 = 20;
    var offy2 = 5;
    var offy3 = 25;

    var mod = 200;
    self.draw = function(canv)
    {
      canv.context.fillStyle = "#FFFFFF";

      //1
      canv.context.beginPath();
      canv.context.arc(mod-(score/10+offx1)%mod-20-4, offy1-1,7,0,2*3.1415, false);
      canv.context.fill();
      canv.context.closePath();

      canv.context.beginPath();
      canv.context.arc(mod-(score/10+offx1)%mod-20+4, offy1-4,9,0,2*3.1415, false);
      canv.context.fill();
      canv.context.closePath();

      canv.context.beginPath();
      canv.context.arc(mod-(score/10+offx1)%mod-20+14,offy1,8,0,2*3.1415, false);
      canv.context.fill();
      canv.context.closePath();

      //2
      canv.context.beginPath();
      canv.context.arc(mod-(score/10+offx2)%mod-20-4, offy2-1,7,0,2*3.1415, false);
      canv.context.fill();
      canv.context.closePath();

      canv.context.beginPath();
      canv.context.arc(mod-(score/10+offx2)%mod-20+4, offy2-4,9,0,2*3.1415, false);
      canv.context.fill();
      canv.context.closePath();

      canv.context.beginPath();
      canv.context.arc(mod-(score/10+offx2)%mod-20+14,offy2,8,0,2*3.1415, false);
      canv.context.fill();
      canv.context.closePath();


      //1
      canv.context.beginPath();
      canv.context.arc(mod-(score/10+offx3)%mod-20-4, offy3-1,7,0,2*3.1415, false);
      canv.context.fill();
      canv.context.closePath();

      canv.context.beginPath();
      canv.context.arc(mod-(score/10+offx3)%mod-20+4, offy3-4,9,0,2*3.1415, false);
      canv.context.fill();
      canv.context.closePath();

      canv.context.beginPath();
      canv.context.arc(mod-(score/10+offx3)%mod-20+14,offy3,8,0,2*3.1415, false);
      canv.context.fill();
      canv.context.closePath();

      //for weird gray bug
      canv.context.beginPath();
      canv.context.arc(-5,-5,2,0,2*3.1415, false);
      canv.context.fill();
      canv.context.closePath();
    }
  }


  var Ground = function(args, cam)
  {
    var self = this;

    self.draw = function()
    {
      canv.context.fillStyle = "#5DCF15";
      canv.context.strokeStyle = "#5DCF15";
      canv.context.fillRect(-20,canv.height-20-cam.y,canv.width+40,40);
    }
  }

  var Grass = function(args, cam)
  {
    var self = this;

    var offx1 = 0;
    var offx2 = 100;
    var offx3 = 135;
    var offy1 = 10;
    var offy2 = -5;
    var offy3 = 15;

    var mod = 200;
    self.draw = function(canv)
    {
      canv.context.fillStyle = "#009900";
      canv.context.fillRect(mod-(score/2+offx1)%mod-20-cam.x,canv.height-offy1-cam.y,10,5);
      canv.context.fillRect(mod-(score/2+offx2)%mod-20-cam.x,canv.height-offy2-cam.y,10,5);
      canv.context.fillRect(mod-(score/2+offx3)%mod-20-cam.x,canv.height-offy3-cam.y,10,5);
    }
  }
};

