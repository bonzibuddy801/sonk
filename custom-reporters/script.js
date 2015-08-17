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
        createReporter([frag('label',name)]);
    }

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['r', 'add reporter %s', 'addRep']
        ]
    };

    function refreshExt()
    {
        ScratchExtensions.unregister('Custom Reporters');
        ScratchExtensions.register('Custom Reporters', descriptor, ext);
    }

    function addBlock(data)
    {
        descriptor.blocks[descriptor.blocks.length] = data;
    }

    function frag(type, text)
    {
        return {
            type: type,
            text: text
        };
    }

    function createParam(norm_name, name)
    {
    }

    function createReporterObject(n_name, f_name, param_count)
    {
        var reporter = {
            def: function()
            {
                if(this.status === true)
                {
                    this.status = false;
                    return true;
                }
                return false;
            },
            call: function()
            {
                console.log('--Begin call--');
                console.log(this.status);
                console.log(arguments[0]);
                this.callback = arguments[this.paramCount];
                this.ready = function()
                {
                    console.log('ready');
                    console.log(this.callback);
                    console.log(this.value);
                    this.callback(this.value);
                    this.ready = function() {};
                }
                this.status = true;
            },
            ret: function(val)
            {
                this.value = val;
                this.ready();
            }
        };
        reporter.name = n_name;
        reporter.blockString = f_name;
        reporter.paramCount = param_count;
        reporter.ready = function() {};
        reporter.callback = function() {};
        reporter.value = '';
        reporter.status = false;
        return reporter;
    }

    function createReporter(frags)
    {
        var norm_name = ''; //Stores the name used in all but the reporter block
        var func_name = ''; //Stores the name used in the reporter - includes inputs

        var param_count = 0;
        var params = [];
        for(var i = 0; i < frags.length; i++)
        {
            if(frags[i].type == 'label') { norm_name += frags[i].text; func_name += frags[i].text; }
            else
            {
                norm_name += ' () ';
                if(frags[i].type == 'string') { func_name += '%s'; }
                if(frags[i].type == 'number') { func_name += '%n'; }
                if(frags[i].type == 'bool') { func_name += '%b'; }
                param_count++;
                params[params.length] = frags[i];
            }
        }
        var reporter = {
            name: norm_name,
            blockString: func_name,
            paramCount: param_count,
            ready: function() {},
            callback: function() {},
            value: '',
            status: false,
            def: function()
            {
                if(this.status === true)
                {
                    this.status = false;
                    return true;
                }
                return false;
            },
            call: function(args)
            {
                this.callback = args[this.paramCount];
                this.ready = function()
                {
                    this.callback(this.value);
                    this.ready = function() {};
                }
                this.status = true;
            },
            ret: function(val)
            {
                this.value = val;
                this.ready();
            },
        };
        //var reporter = createReporterObject(norm_name,func_name,param_count);
        reporters[norm_name] = reporter;

        addBlock(['h','define ' + norm_name,'defr_' + norm_name]);
        addBlock(['R',func_name,'callr_' + norm_name]);
        addBlock([' ','return %s for '+norm_name,'retr_' + norm_name]);
        ext['defr_' + norm_name] = function() { return reporter.def(); };
        ext['callr_' + norm_name] = function() { reporter.call(arguments); };
        ext['retr_' + norm_name] = function(val) { reporter.ret(val); };

        refreshExt();
    }


    // Register the extension
    ScratchExtensions.register('Custom Reporters', descriptor, ext);
})({});
