var GamePlayScene = function(game, canv)
{
  var self = this;
  var drawer;
  var dragger;

  self.ready = function()
  {
    drawer = new Drawer(canv);
    dragger = new Dragger(canv);
  };

  self.tick = function()
  {

  };

  self.draw = function()
  {
    canv.context.beginPath();
    canv.context.arc(40, 40, 10, 0, 2 * Math.PI, false);
    canv.context.fillStyle = 'green';
    canv.context.fill();
    canv.context.lineWidth = 5;
    canv.context.strokeStyle = '#003300';
    canv.context.stroke();
  };

  self.cleanup = function()
  {
  };

};

