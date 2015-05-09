//Authored by TheMonsterFromTheDeep
//Extension for Scratch 2.0 by LLK @ MIT
//Adds extended boolean functionality
(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.t = function() { return true; }
    ext.f = function() { return false; }
    ext.evaluate = function(val) { return (val == "true"); }

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
	    ['b', 'true', 't'],
	    ['b', 'false', 'f'],
	    ['b', '%s', 'evaluate', 'false'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Extended Booleans', descriptor, ext);
})({});