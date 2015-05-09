//---------------------------------------------------------
//This extension will draw a canvas over the scratch player
//which can then be used for custom drawing
//---------------------------------------------------------
(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    function generateCanvas()
    {
	var c = document.createElement("canvas");
	c.setAttribute("style", "position: absolute; top: 72px; left: 6px; width: 480px; height: 360px; z-index: 1000; background-color: #ff0000;");
	c.setAttribute("width", "480");
	c.setAttribute("height", "360");
	document.body.appendChild(c);
    }

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
        ]
    };

    // Register the extension
    ScratchExtensions.register('Sample extension', descriptor, ext);
    generateCanvas();
})({});
