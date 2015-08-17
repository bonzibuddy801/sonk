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
        createReporter([frag('label',name),frag('string','mystring'),frag('number','mynumber'),frag('bool','myboolean')]);
        //createParam('myblock','myparam');
        //refreshExt();
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

    function createParam(norm_name, use_name, name)
    {
        var param = {
            value: '',
            read: function()
            {
                return this.value;
            },
            write: function(val)
            {
                this.value = val;
            }
        };

        addBlock(['r',name + ' of ' + norm_name,'argr_' + use_name + '_' + name]);
        ext['argr_' + use_name + '_' + name] = function() { return param.read(); };

        return param;
    }

    function generateUseName(norm_name)
    {
        var dict = [' ','!','@','#','$','%','^','&','*','(',')','-','_','+','=','[',']','{','}',':',';','"',"'",'<','>',',','.','?','/','|','\\','~','`'];
        var final = '';
        for(var i = 0; i < norm_name.length; i++)
        {
            var c = true;
            for(var j = 0; j < dict.length; j++)
            {
                if(norm_name.charAt(i) == dict[j]) { final += '_' + j; c = false; }
            }
            if(c) { final += norm_name.charAt(i); }
        }
        return final;
    }

    function createReporter(frags)
    {
        var use_name = ''; //Stores the name used in things
        var title = ''; //Stores base name for use in return block
        var norm_name = ''; //Stores the name used in all but the reporter block
        var func_name = ''; //Stores the name used in the reporter - includes inputs

        var param_count = 0;
        var _params = [];
        for(var i = 0; i < frags.length; i++)
        {
            if(frags[i].type == 'label') { norm_name += frags[i].text; func_name += frags[i].text; title += frags[i].text; }
            else
            {
                if(frags[i].type == 'string') { func_name += '%s'; title += ' [' + frags[i].text + '] '; }
                if(frags[i].type == 'number') { func_name += '%n'; title += ' (' + frags[i].text + ') '; }
                if(frags[i].type == 'bool') { func_name += '%b'; title += ' <' + frags[i].text + '> '; }
                param_count++;
                _params[_params.length] = frags[i];
            }
        }
        use_name = generateUseName(title);
        for(var i = 0; i < _params.length; i++)
        {
            _params[i] = createParam(norm_name, use_name, _params[i].text);
        }
        var reporter = {
            name: norm_name,
            blockString: func_name,
            paramCount: param_count,
            params: _params,
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
                for(var i = 0; i < this.paramCount; i++)
                {
                    this.params[i].write(args[i]);
                }
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
        reporters[use_name] = reporter;

        addBlock(['h','define ' + title,'defr_' + use_name]);
        addBlock(['R',func_name,'callr_' + use_name]);
        addBlock([' ','return %s for '+norm_name,'retr_' + use_name]);
        ext['defr_' + use_name] = function() { return reporter.def(); };
        ext['callr_' + use_name] = function() { reporter.call(arguments); };
        ext['retr_' + use_name] = function(val) { reporter.ret(val); };

        refreshExt();
    }


    // Register the extension
    ScratchExtensions.register('Custom Reporters', descriptor, ext);
})({});
