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

    ext.addRep = function(data)
    {
        //createReporter([frag('label',name),frag('string','mystring'),frag('number','mynumber'),frag('bool','myboolean')]);
        var frags = [];
        var next = "";
        var i = 0;
        while(i < data.length)
        {
            if(data.charAt(i) == '_')
            {
                i++;
                next += data.charAt(i);
                i++;
            }
            else {
            if(data.charAt(i) == '(')
            {
                frags[frags.length] = frag('label',next);
                next = "";
                i++;
                while(data.charAt(i) != ')' && i < data.length)
                {
                    next += data.charAt(i);
                    i++;
                }
                frags[frags.length] = frag('number',next);
                next = "";
                i++;
            }
            if(data.charAt(i) == '<')
            {
                frags[frags.length] = frag('label',next);
                next = "";
                i++;
                while(data.charAt(i) != '>' && i < data.length)
                {
                    next += data.charAt(i);
                    i++;
                }
                frags[frags.length] = frag('bool',next);
                next = "";
                i++;
            }
            if(data.charAt(i) == '[')
            {
                frags[frags.length] = frag('label',next);
                next = "";
                i++;
                while(data.charAt(i) != ']' && i < data.length)
                {
                    next += data.charAt(i);
                    i++;
                }
                frags[frags.length] = frag('string',next);
                next = "";
                i++;
            }
            if(i < data.length)
            {
                next += data.charAt(i);
            }
            i++;
            }
        }
        if(next.length > 0)
        {
            frags[frags.length] = frag('label',next);
        }
        createReporter(frags);
    }

    var contains = function(s1, s2)
    {
        var i = 0;
        var j = 0;
        while(i < s1.length)
        {
            if(s1.charAt(i) == s2.charAt(j)) { j++; if(j == s2.length) { return true; } } else { j = 0; }
            i++;
        }
        if(j == s2.length) { return true; } else { return false; }
    }

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            [' ', 'reload reporter %s', 'addRep']
        ]
    };


    function newReporter()
    {
        alert('you are making a new reporter');
    }

    function generateButton()
    {
        var loc = 'scratchx.org';
        if(location.href) { loc = location.href; }
        var myStyle = document.createElement('style');
        var color = (contains(loc,'scratchx.org')) ? '30485f' : '9c9ea2';
        var highlight = (contains(loc,'scratchx.org')) ? '39536b' : 'aaacb0';
        myStyle.appendChild(document.createTextNode('#cr-ext-button { line-height: 1.5; text-shadow: none; height:28px; z-index:1; background-color: #' + color + '; position: absolute; top: 0px; left: 560px; padding: 0px 5px; font-family: sans-serif; font-size: 18px; color: #000; } #cr-ext-button:hover { background-color: #' + highlight + '; } #scratch { z-index: 0; !important }'));
        document.head.appendChild(myStyle);

        var myDiv = document.createElement('div');
        myDiv.appendChild(document.createTextNode('Create Custom Reporter'));
        myDiv.setAttribute('id','cr-ext-button');

        myDiv.addEventListener('click',function() { newReporter(); },false);

        document.body.appendChild(myDiv);        
    }

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

    function createParam(norm_name, use_name, name, type)
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

        if(type == 'bool') { addBlock(['b',name + ' of ' + norm_name,'argr_' + use_name + '_' + name]); } else { addBlock(['r',name + ' of ' + norm_name,'argr_' + use_name + '_' + name]); }
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
            _params[i] = createParam(norm_name, use_name, _params[i].text, _params[i].type);
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
    generateButton();
    ScratchExtensions.register('Custom Reporters', descriptor, ext);
})({});
