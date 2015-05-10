//MFD Complete: TheMonsterFromTheDeep Complete
//Uses hax in order to organize multiple extensions under multiple categories
(function(ext) { ext._shutdown = function() {};
ext._getStatus = function() { return {status: 1, msg: 'Ready'}; }; //This extension is essentially a blank extension built in order to provide the text seperator
var descriptor = {blocks: []}; ScratchExtensions.register('MFD Complete Extension', descriptor, ext); })({});
//MFD: Internetting
//Includes functions for HTTP requests & linking to other projects
(function(ext) { 
	ext._shutdown = function() {};
	ext._getStatus = function() { return {status: 2, msg: 'Ready'}; };
	
	ext.testBlock = function() { return 0; }

	var descriptor = {
		blocks: [
			['r', 'test', 'testBlock'],
		]
	}; 

	ScratchExtensions.register('MFD: Internetting', descriptor, ext); //All the titles begin with "MFD:" in case other extensions with similar names are also used
})({});