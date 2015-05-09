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

    function conv(val) { return (val == "true") || (val == "1"); }

    ext.t = function() { return true; }
    ext.f = function() { return false; }
    ext.evaluate = function(val) { return conv(val); }
    ext.evalNot = function(val) { return !conv(val); }
    ext.evalAnd = function(val1, val2) { return conv(val1) && conv(val2); }
    ext.evalOr = function(val1, val2) { return conv(val1) || conv(val2); }

    ext.lteq = function(val1, val2) { return val1 <= val2; }
    ext.gteq = function(val1, val2) { return val1 >= val2; }

    ext.evalAsNum = function(val) { if(val == "true") { return 1; } else { return 0; } }

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
	    ['b', 'true', 't'],
	    ['b', 'false', 'f'],
	    ['b', '%s', 'evaluate', 'false'],
	    ['b', 'not %s', 'evalNot', 'false'],
	    ['b', '%s and %s', 'evalAnd', 'false', 'false'],
	    ['b', '%s or %s', 'evalOr', 'false', 'false'],
	    ['b', '%s ≤ %s', 'lteq'],
	    ['b', '%s ≥ %s', 'gteq'],
	    ['r', '%b', 'evalAsNum'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Extended Booleans', descriptor, ext);
})({});