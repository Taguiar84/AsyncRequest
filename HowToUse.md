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

## Advanced use

	### Diff request options

	//
	request = Object.create($.asyncRequest); //Copy request functions    
	request.init({ asyncObject: {Cache: true, DataType: 'html'} }); // "request" will make cache and datatype is html
	var objRequest = request.getObjAsync(); create object request //Objrequest use Cache and DataType is html

	var anotherObjRequest = $.asyncRequest.getObjAsync(); // Use dafault options no Cache and Datype is json

	request.init( {notification: {notifyFunction: false} } ); //Now disable notifycation

	$.asyncRequest.post(objRequest); //Cache true, DataType html but Notification is enable

	request.init( {notification: {notifyFunction: function ( alert('OPS....'); )} } ); //Now is custom notification


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
|loadTextTemplate	|[See in code, very big to write here]	|template used with blockUI									|

### Configuration ObjRequest [$.getObjAsync]
| Property          |  Default                             |  Description														| Values		|
|------------------|--------------------------------------|------------------------------------------------------------------|---------------
|Url				|null									|Url to request														|				|
|Data				|null (optional)						|Object javascript sent to Async Request							|				|
|SuccesFunction		|null (optional)						|Function called after success response								|				|
|ErrorFunction		|null (optional)						|Function called after error response								|				|
|CompleteFunction	|null (optional)						|Function called when finished request with success or error		|				|
|Containner			|null (optional)						|Html element to block, null = Block of page, false = disable		|				|
|Msg				|null (optional)						|Mensagem used in Blocked element, see [Defaults loadText]			|				|
|Queue				|null (optiona)							|All request with same queue(Key) will executed one after another	|               |
|ContentType		|"application/json; charset=utf-8"		|Define type for send Data, see Data property						|				|
|DataType			|"json"									|Define type for return data										|				|
|UnblockMoment		|"after"								|when unblock container												|after/before	|


## Anothers setups, used with Default Options Jquery 

	You can change this values with default options [$.asyncRequest.defaults]



### Notification Options

| Property          |  Default												|  Description														|
|------------------|------------------------------------------------------|-----------------------------------------------------------------		|
|notifyFunction					|null (optional)							|function of base to notify about request, null = use default values and templates, false = disable	|
|notifyCommandType				|['POST', 'UPDATE', 'DELETE']				|type of request with  notification, only [GET] don't show notification by default	|
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
            //function
            SuccessFunction: null,
            ErrorFunction: null,
            CompleteFunction: null
        },
        notification: {
            notifyFunction: null,
            notifyCommandType: ['POST', 'UPDATE', 'DELETE'],
            notifyTemplate: [HTML TEMPLATE],
            notifyTemplateErro: [HTML TEMPLATE],
            notificationSuccessMsgDefault: 'Operação realizada com sucesso',
            notificationErrorMsgDefault: 'Ocorreu um erro ao realizar a operação',
            fullErroText: 'Erro Completo'
        }