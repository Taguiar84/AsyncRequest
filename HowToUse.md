# AsyncRequest

## Basic usages

	// Sample 1		
	var successFunction = function(data){
		alert('success function!');
	};
	$.asyncRequest.getAsync("www.URL.com", null, false, successFunction);
	//OR
	$.asyncRequest.getAsync("www.URL.com", null, false, function(data){ });	
	//OR
	$.asyncRequest.getAsync({
		SuccessFunction: function(data){
			alert('success function!');
		}
	});
	// Sample 2
	var objRequest = $.asyncRequest.getObjAsync();
	objRequest.Url= "www.URL.com";
	objRequest.SuccessFunction = function(data){ };
	$.asyncRequest.get(objRequest);
	//OR
	$.asyncRequest.get({
		Url: "www.URL.com",
		SuccessFunction: function(data){ }
	});	
	// Sample 3
	var objRequest = $.asyncRequest.getObjAsync();
	objRequest.Url= "ww.URL.com";
	objRequest.SuccessFunction = function(data){ };
	objRequest.Data = myDataObj
	$.asyncRequest.post(objRequest);
	//OR
	$.asyncRequest.post({
		Url: "www.URL.com",
		SuccessFunction: function(data){ },
		Data: mydataObj
	});



## Advanced use

	### Diff request options

	//	
	var objRequest = $.asyncRequest.getObjAsync(); create object request //Objrequest use Cache and DataType is html
	objRequest.Cache = true;
	objRequest.DataType = 'html';

	var anotherObjRequest = $.asyncRequest.getObjAsync(); // Use dafault options no Cache and Datype is json
	$.asyncRequest.post(anotherObjRequest, 
		{notification: {notifyFunction: false} }); //Cache true, DataType html but Notification is disable
	//OR in-line
	$.asyncRequest.post({}, 
		{notification: {notifyFunction: false} }); //It use default object config, only change notification


	### Use Queue

	//
	var objRequest = $.asyncRequest.getObjAsync();
	objRequest.Url = "url to request";
	.
	.  Another configs to obj
	.
	objRequest.Queue = "myKey";
	$.asyncRequest.get(objRequest); //Long request
	
	objRequest.Data = {xyz}; //Config to new request
	objRequest.Queue = "myKey";//SAME KEY
	$.asyncRequest.[post,get,put,delete](objRequest);//This request only will do after first request finished


## Options to use

### Configuration Request [$.asyncRequest]
| Property          |  Default											|  Description														|
|------------------|--------------------------------------------------|------------------------------------------------------------------|
|loadText			|"Carregando.." (Loading in portugues)				|Display Mensage while request	is made								|
|loadTextTemplate	|[See in code, very big to write here]				|template used with blockUI											|
|cssBlockUI			|"asyncRequestBlockMsg"								|CssClass used in blockElement										|

### Configuration ObjRequest [$.getObjAsync]
| Property          |  Default                             |  Description														| Values		|
|------------------|--------------------------------------|------------------------------------------------------------------|---------------
|Url				|null									|Url to request														|				|
|Data				|null (optional)						|Object javascript sent to Async Request							|				|
|SuccessFunction	|null (optional)						|Function called after success response								|				|
|ErrorFunction		|null (optional)						|Function called after error response								|				|
|CompleteFunction	|null (optional)						|Function called when finished request with success or error		|				|
|Containner			|null (optional)						|Html element to block, null = Block of page, false = disable		|				|
|Msg				|null (optional)						|Mensagem used in Blocked element, see [Defaults loadText]			|				|
|Queue				|null (optiona)							|All request with same queue(Key) will executed one after another	|               |
|ContentType		|"application/json; charset=utf-8"		|Define type for send Data, see Data property						|				|
|DataType			|"json"									|Define type for return data										|				|
|UnblockMoment		|"after"								|when unblock container												|after/before	|
|Timeout			|0 (disable)							|Timeout event														|				|


## Anothers setups, used with Default Options Jquery 

	You can change this values with default options [$.asyncRequest.defaults]



### Notification Options

| Property          |  Default												|  Description														|
|------------------|------------------------------------------------------|-----------------------------------------------------------------		|
|notifyFunction					|null (optional)							|function of base to notify about request, null = use default values and templates, false = disable	|
|notifyCommandType				|['POST', 'PUT', 'DELETE']				|type of request with  notification, only [GET] don't show notification by default	|
|notifyTemplate					|[See in code, very big to write here]		|Template used in default notify, used with DEFAULT notifyFunction		|
|notifyTemplateErro				|[See in code, very big to write here]		|Template used in default notify, used with DEFAULT notifyFunction		|
|notificationSuccessMsgDefault	|'Operação realizada com sucesso'			|Text template used in default notify, used with DEFAULT notifyFunction			|
|notificationErrorMsgDefault	|'Ocorreu um erro ao realizar a operação'	|Text template used in default notify, used with DEFAULT notifyFunction	|
|fullErroText					|'Erro Completo'							|Text used to show Full error in notify, used with DEFAULT notification	|


### All defaults like sample


	// Sample
	$.asyncRequest.defaults = {
        ajax: $.ajax,
        loadText: "Carregando..",
        loadTextTemplate: [HTML TEMPLATE],
        queueUtil: new asyncRequest_Queue(),
        asyncObject: {
            Url: null,
            Data: null,
            //DataRequest: null, //Never use this field
            Cache: false,
            Containner: null,
            Msg: null,
            Queue: null,
            ContentType: "application/json; charset=utf-8",
            DataType: "json",
			UnblockMoment: "after",
			Timeout: 0,
            //function
            SuccessFunction: null,
            ErrorFunction: null,
            CompleteFunction: null
        },
        notification: {
            notifyFunction: null,
            notifyCommandType: ['POST', 'PUT', 'DELETE'],
            notifyTemplate: [HTML TEMPLATE],
            notifyTemplateErro: [HTML TEMPLATE],
            notificationSuccessMsgDefault: 'Operação realizada com sucesso',
            notificationErrorMsgDefault: 'Ocorreu um erro ao realizar a operação',
            fullErroText: 'Erro Completo'
        }