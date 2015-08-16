//themonsterfromthedeep.github.io/scratch-extensions/custom-reporters/script.js

(function(ext) {
    var reporters = [];

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.addRep = function(name)
    {
        reporters[name] = false;
    }

    ext.hatRep = function(name)
    {
        return reporters[name];
    }

    ext.runRep = function(name)
    {
        reporters[name] = true;
    }

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['r', 'add reporter %s', 'addRep'],
            ['h', 'reporter %s', 'hatRep'],
            ['r', 'run reporter %s', 'runRep'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Custom Reporters', descriptor, ext);
})({});
