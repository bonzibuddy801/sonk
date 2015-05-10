//MFD Complete: TheMonsterFromTheDeep Complete
//Uses hax in order to organize multiple extensions under multiple categories
var loadedMFD = [];
(function(ext) { ext._shutdown = function() {};
function getLoadedExtensions()
{
	var msgString = "";
	for(var i = 0; i < loadedMFD.length; i++)
	{
		if(loadedMFD[i] != "unloaded") { msgString += loadedMFD[i] + ", "; }
	}
	return msgString;
}
ext._getStatus = function() { return {status: 1, msg: 'Loaded extensions: ' + getLoadedExtensions()}; }; //This extension is essentially a blank extension built in order to provide the text seperator
var descriptor = {blocks: []}; ScratchExtensions.register('MFD Complete Extension', descriptor, ext); })({});
//MFD: Internetting
//Includes functions for HTTP requests & linking to other projects
(function(ext) { 
	var extName = 'MFD: Internetting';
	ext._shutdown = function() { for(var i = 0; i < loadedMFD.length; i++) { if(loadedMFD[i] == extName) { loadedMFD[i] = "unloaded"; } }};
	ext._getStatus = function() { return {status: 2, msg: 'Ready'}; };
	
	ext.testBlock = function() { return 0; }

	var descriptor = {
		blocks: [
			['r', 'test', 'testBlock'],
		]
	}; 

	ScratchExtensions.register(extName, descriptor, ext); //All the titles begin with "MFD:" in case other extensions with similar names are also used
	loadedMFD[loadedMFD.length] = extName; 
})({});