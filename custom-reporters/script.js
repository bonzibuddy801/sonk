//themonsterfromthedeep.github.io/scratch-extensions/custom-reporters/script.js

var reporters = {};
(function(ext) {

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

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['r', 'add reporter %s', 'addRep'],
        ]
    };

    function addBlock(data)
    {
        descriptor.blocks[descriptor.blocks.length] = data;
    }

    function addReporter(name)
    {
        reporters['r-' + name] = { status: false, callback: '', value:'' };
        addBlock(['h', 'define $' + name, 'defr_' + name]);
        addBlock(['R', '$' + name, 'runr_' + name]);
        addBlock([' ', '$' + name + ': return %s', 'retr_' + name]);
        ext['runr_' + name] = function(callback)
        {
            var rname = 'r-' + name;
            reporters[rname].callback = function()
            {
                callback(reporters[rname].value);
                reporters[rname].callback = '';
            };
            reporters[rname].status = true;
        }
        ext['defr_' + name] = function()
        {
            if(reporters['r-' + name].status === true)
            {
                return true;
                reporters['r-' + name].status = false;
            }
            return false;
        }
        ext['retr_' + name] = function(value)
        {
            reporters['r-' + name].status = false;
            reporters['r-' + name].value = value;
            reporters['r-' + name].callback();
        }
	ScratchExtensions.unregister('Custom Reporters');
	ScratchExtensions.register('Custom Reporters', descriptor, ext);
    }


    // Register the extension
    ScratchExtensions.register('Custom Reporters', descriptor, ext);
})({});
