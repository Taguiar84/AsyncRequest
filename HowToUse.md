# AsyncRequest

## Basic usages

	// Sample 1
	var successFunction = function(data){
		alert('success function!');
	};
	$.asyncRequest.getAsync("www.URL.com", null, false, successFunction);
	//OR
	$.asyncRequest.getAsync("www.URL.com", null, false, function(data){ });	

	// Sample 2
	var objRequest = $.getObjAsync();
	objRequest.Url= "ww.URL.com";
	objRequest.SuccessFunction = function(data){ };
	$.asyncRequest.get(objRequest);
	
	// Sample 3
	var objRequest = $.getObjAsync();
	objRequest.Url= "ww.URL.com";
	objRequest.SuccessFunction = function(data){ };
	objRequest.Data = myDataObj
	$.asyncRequest.post(objRequest);


## Configuration ObjRequest [$.getObjAsync()]
| Property          |  Default                             |  Description														|
|------------------|--------------------------------------|------------------------------------------------------------------|
|Url				|null									| Url to request													|
|Data				|null (optional)						|Jvascript object send to request									|
|SuccesFunction		|null (optional)						|Function called after success response								|
|ErroFunction		|null (optional)						|Function called after erro reponse									|
|CompleteFunction	|null (optional)						|Function called when finseshed request, success or erro			|
|Containner			|null (optional)						|Html element to block, null = Block page, false = desable			|
|Msg				|null (optional)						|Mensagem used in Blocked element, Default see [Defaults loadText]	|