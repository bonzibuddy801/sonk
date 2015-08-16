//themonsterfromthedeep.github.io/scratch-extensions/custom-reporters/script.js

(function(ext) {
    var reporters = [];

    function addReporter(name)
    {
        reporters['r-' + name] = { status: false, callback: '', value:'' };
    }

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.addRep = function(name)
    {
        addReporter(name);
    }

    ext.hatRep = function(name)
    {
        return reporters['r' + name].status;
    }

    ext.runRep = function(name,callback)
    {
        rname = 'r-' + name;
        reporters[rname].callback = function()
        {
            callback(reporters[rname].value);
            reporters[rname].callback = '';
        };
        reporters[rname].status = true;
    }

    ext.returnVal(name, value) = function
    {
        reporters['r-' + name].status = false;
        reporters['r-' + name].value = value;
    }

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['r', 'add reporter %s', 'addRep'],
            ['h', 'reporter %s', 'hatRep'],
            ['R', 'run reporter %s', 'runRep'],
            [' ', 'return %s for %s', 'returnVal'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Custom Reporters', descriptor, ext);
})({});
