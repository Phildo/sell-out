var Hoverer = function()
{
  var self = this;

  var hoverables = [];
  var callbackQueue = [];
  var evtQueue = [];
  self.register = function(hoverable) { hoverables.push(hoverable); }
  self.unregister = function(hoverable) { hoverables.splice(hoverables.indexOf(hoverable),1); }
  self.clear = function() { hoverables = []; }

  function hover(evt)
  {
    addOffsetToEvt(evt);
    for(var i = 0; i < hoverables.length; i++)
    {
      if(
        evt.philX >= hoverables[i].x &&
        evt.philX <= hoverables[i].x+hoverables[i].w &&
        evt.philY >= hoverables[i].y &&
        evt.philY <= hoverables[i].y+hoverables[i].h
      )
      {
        callbackQueue.push(hoverables[i].hover);
        evtQueue.push(evt);
      }
    }
  }
  self.flush = function()
  {
    for(var i = 0; i < callbackQueue.length; i++)
      callbackQueue[i](evtQueue[i]);
    callbackQueue = [];
    evtQueue = [];
  }

  if(platform == "PC")
    document.getElementById("stage_container").addEventListener('mousemove', hover, false);
  else if(platform == "MOBILE")
    ; //no hover on mobile, dummy
}

//example hoverable- just needs x,y,w,h and hover callback
var Hoverable = function(args)
{
  var self = this;

  self.x = args.x ? args.x : 0;
  self.y = args.y ? args.y : 0;
  self.w = args.w ? args.w : 0;
  self.h = args.h ? args.h : 0;
  self.hover = args.hover ? args.hover : function(){};

  //nice for debugging purposes
  self.draw = function(canv)
  {
    canv.context.strokeStyle = "#00FF00";
    canv.context.strokeRect(self.x,self.y,self.w,self.h);
  }
}

