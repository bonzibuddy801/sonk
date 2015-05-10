//MFD Complete: TheMonsterFromTheDeep Complete
//Uses hax in order to organize multiple extensions under multiple categories

var MFD = 
{
	loadedExtensions: [],
	message: "No loaded extensions",
	updateMessage: function() { 
		var newMsg = "No loaded extensions";
		var empty = true; 
		for (var i = 0; i < this.loadedExtensions.length; i++) { 
			if(this.loadedExtensions[i] != "unloaded")
			{
				if(empty)
				{
					empty = false;
					newMsg = "Loaded extensions: " + this.loadedExtensions[i];
				}
				else
				{
					newMsg += ", " + this.loadedExtensions[i];
				}
			}
		}
		this.message = newMsg;
	},
	loadExtension: function(name) { this.loadedExtensions[this.loadedExtensions.length] = name; this.updateMessage(); },
	unloadExtension: function(name) { for(var i = 0; i < this.loadedExtensions.length; i++) { if(this.loadedExtensions[i] == name) { this.loadedExtensions[i] = "unloaded"; } } this.updateMessage(); }
};

(function(ext) { ext._shutdown = function() {};
ext._getStatus = function() { return {status: 1, msg: MFD.message }; }; //This extension is essentially a blank extension built in order to provide the text seperator
var descriptor = {blocks: []}; ScratchExtensions.register('MFD Complete Extension', descriptor, ext); })({});



//MFD: Internetting
//Includes functions for HTTP requests & linking to other projects
(function(ext) { 
	var extName = 'MFD: Internetting';
	ext._shutdown = function() { MFD.unloadExtension(extName); };
	ext._getStatus = function() { return {status: 2, msg: 'Ready'}; };
	
	ext.testBlock = function() { return 0; }

	var descriptor = {
		blocks: [
			['r', 'test', 'testBlock'],
		]
	}; 

	ScratchExtensions.register(extName, descriptor, ext); //All the titles begin with "MFD:" in case other extensions with similar names are also used
	MFD.loadExtension(extName);
})({});