//themonsterfromthedeep.github.io/scratch-extensions/custom-reporters/script.js

var reporters = {};
(function(ext) {
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
        if(reporters['r-' + name].status === true)
        {
            return true;
            reporters['r-' + name].status = false;
        }
        return false;
    }

    ext.runRep = function(name,callback)
    {
        var rname = 'r-' + name;
        reporters[rname].callback = function()
        {
            console.log('success');
            callback(reporters[rname].value);
            reporters[rname].callback = '';
        };
        reporters[rname].status = true;
    }

    ext.returnVal = function(value, name)
    {
        console.log('returning...');
        reporters['r-' + name].status = false;
        reporters['r-' + name].value = value;
        reporters['r-' + name].callback();
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
