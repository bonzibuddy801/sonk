//---------------------------------------------------------//
//This extension will draw a canvas over the scratch player//
//which can then be used for custom drawing                //
//---------------------------------------------------------//

//Thanks to Paul Irish for this requestAnimationFrame polyfill
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

(function(ext) {
    var canvas;
    var ctx;
    var pane = 
    {
	events: [],
	QueuedEvent: function(type, data)
	{
	    return { type: type, data: data };
	},
	clear: function() { this.events = []; },
	drawRect: function(x, y, width, height) { var args = [parseInt(x) + 240, parseInt(y) + 180, parseInt(width), parseInt(height)]; this.events[this.events.length] = this.QueuedEvent("drawRect",args); },
	fillRect: function(x, y, width, height) { var args = [parseInt(x) + 240, parseInt(y) + 180, parseInt(width), parseInt(height)]; this.events[this.events.length] = this.QueuedEvent("fillRect", args); }
    };
    console.log(pane);

    function generateCanvas()
    {
	var c = document.createElement("canvas");
	c.setAttribute("style", "position: absolute; top: 72px; left: 6px; width: 480px; height: 360px; z-index: 1000; background-color: #440000;");
	c.setAttribute("width", "480");
	c.setAttribute("height", "360");
	document.body.appendChild(c);
	canvas = c;
	ctx = canvas.getContext("2d");
    }

    function callEvent(e)
    {
	var args = e.data;
	console.log(args);
	if(e.type == "drawRect") { ctx.rect(args[0], args[1], args[2], args[3]); }
	if(e.type == "fillRect") { ctx.fillRect(args[0], args[1], args[2], args[3]); }  
    }

    function renderCanvas()
    {
	for(var i = 0; i < pane.events.length; i++)
	{
	    callEvent(pane.events[i]);
	}
	requestAnimFrame(renderCanvas);
    }

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.fillRect = function(x, y, width, height) { pane.fillRect(x, y, width, height); }

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
	    [' ', 'fill rectangle at %n, %n with %n, %n', 'fillRect', '-10', '-10', '20', '20'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('canvas base', descriptor, ext);
    generateCanvas();
    requestAnimFrame(renderCanvas);
})({});
