var platform = "PC";
var scale = 1/8;
var debug = false;

function debugLog(txt)
{
  if(debug)
  document.getElementById('debug').innerHTML = txt+"<br />"+document.getElementById('debug').innerHTML;
}
function addOffsetToEvt(evt)
{
  if(evt.offsetX == undefined)
  {
    evt.philX = evt.layerX-evt.originalTarget.offsetLeft;
    evt.philY = evt.layerY-evt.originalTarget.offsetTop;
  }
  else
  {
    evt.philX = evt.offsetX;
    evt.philY = evt.offsetY;
  }

  evt.philX = evt.philX*scale;
  evt.philY = evt.philY*scale;
}

