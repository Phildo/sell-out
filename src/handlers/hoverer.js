var Hoverer = function()
{
  var self = this;

  var hoverables = [];
  var hovering = [];
  var nothovering = [];
  var hoverCallbackQueue = [];
  var hoverEvtQueue = [];
  var unhoverCallbackQueue = [];
  var unhoverEvtQueue = [];
  self.register = function(hoverable) { hoverables.push(hoverable); nothovering.push(hoverable); }
  self.unregister = function(hoverable) 
  {
    hoverables.splice(hoverables.indexOf(hoverable),1);
    if(   hovering.indexOv(hoverable))    hovering.splice(   hovering.indexOf(hoverable),1);
    if(nothovering.indexOv(hoverable)) nothovering.splice(nothovering.indexOf(hoverable),1);
  }
  self.clear = function() { hoverables = []; hovering = []; nothovering = []; }

  function hover(evt)
  {
    addOffsetToEvt(evt);

    for(var i = 0; i < nothovering.length; i++)
    {
      if(
        evt.philX >= nothovering[i].x &&
        evt.philX <= nothovering[i].x+nothovering[i].w &&
        evt.philY >= nothovering[i].y &&
        evt.philY <= nothovering[i].y+nothovering[i].h
      )
      {
        hoverCallbackQueue.push(nothovering[i].hover);
        hoverEvtQueue.push(evt);

        hovering.push(nothovering[i]);
        nothovering.splice(i--,1);
      }
    }

    for(var i = 0; i < hovering.length; i++)
    {
      if(
        evt.philX < hovering[i].x ||
        evt.philX > hovering[i].x+hovering[i].w ||
        evt.philY < hovering[i].y ||
        evt.philY > hovering[i].y+hovering[i].h
      )
      {
        nothoverCallbackQueue.push(hovering[i].unhover);
        nothoverEvtQueue.push(evt);

        nothovering.push(hovering[i]);
        hovering.splice(i--,1);
      }
    }
  }
  self.flush = function()
  {
    for(var i = 0; i < hoverCallbackQueue.length; i++)
      hoverCallbackQueue[i](hoverEvtQueue[i]);
    hoverCallbackQueue = [];
    hoverEvtQueue = [];

    for(var i = 0; i < nothoverCallbackQueue.length; i++)
      nothoverCallbackQueue[i](nothoverEvtQueue[i]);
    nothoverCallbackQueue = [];
    nothoverEvtQueue = [];
  }

  if(platform == "PC")
    document.getElementById("stage_container").addEventListener('mousemove', hover, false);
  else if(platform == "MOBILE")
    ; //no hover on mobile, dummy
}

//example hoverable- just needs x,y,w,h, hover and unhover callback
var Hoverable = function(args)
{
  var self = this;

  self.x = args.x ? args.x : 0;
  self.y = args.y ? args.y : 0;
  self.w = args.w ? args.w : 0;
  self.h = args.h ? args.h : 0;
  self.hover = args.hover ? args.hover : function(){};
  self.unhover = args.unhover ? args.unhover : function(){};

  //nice for debugging purposes
  self.draw = function(canv)
  {
    canv.context.strokeStyle = "#00FF00";
    canv.context.strokeRect(self.x,self.y,self.w,self.h);
  }
}

