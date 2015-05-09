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

    ext.boolval = function(var) {
        if((var == "true") || (var == "1")) { return true; }
	else { return false; }
    }

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
	    ['b', 'convert %s to bool', 'boolval', 'false'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Extended Booleans', descriptor, ext);
})({});