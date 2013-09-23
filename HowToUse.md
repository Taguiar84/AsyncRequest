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

## Options to use

### Configuration Request [$.asyncRequest]
| Property          |  Default											|  Description														|
|------------------|--------------------------------------------------|------------------------------------------------------------------|
|loadText			|"Carregando.." (Loading in portugues)				|Display Mensage while request										|
|loadTextTemplate	|[See in code, very big to write here]	|template used with blockUI									|

### Configuration ObjRequest [$.getObjAsync]
| Property          |  Default                             |  Description														|
|------------------|--------------------------------------|------------------------------------------------------------------|
|Url				|null									|Url to request														|
|Data				|null (optional)						|Javascript object send to request									|
|SuccesFunction		|null (optional)						|Function called after success response								|
|ErroFunction		|null (optional)						|Function called after erro reponse									|
|CompleteFunction	|null (optional)						|Function called when finseshed request, success or erro			|
|Containner			|null (optional)						|Html element to block, null = Block page, false = desable			|
|Msg				|null (optional)						|Mensagem used in Blocked element, Default see [Defaults loadText]	|
|Queue				|null (optiona)							|All request with same queue(Key) will executed one after another	|
|ContentType		|"application/json"						|Define data type of send Data, see Data property					|
|ReturnContentType	|"application/json"						|Define data type of return Data									|


## Anothers setups, used with Default Options Jquery 

	You can change this values with default options [$.asyncRequest.defaults]



### Notification Options

| Property          |  Default												|  Description														|
|------------------|------------------------------------------------------|-----------------------------------------------------------------		|
|notifyFunction					|null (optional)							|function base to notify about request, null= used defaut values and templates, false = desable	|
|notifyCommandType				|['POST', 'UPDATE', 'DELETE']				|Request type with notify, only get don't show notify by default	|
|notifyTemplate					|[See in code, very big to write here]		|Template used in default notify, with DEFAULT notifyFunction		|
|notifyTemplateErro				|[See in code, very big to write here]		|Template used in default notify, with DEFAULT notifyFunction		|
|notificationSuccessMsgDefault	|'Operação realizada com sucesso'			|Text template used in default notify, with DEFAULT notifyFunction			|
|notificationErrorMsgDefault	|'Ocorreu um erro ao realizar a operação'	|Text template used in default notify, with DEFAULT notifyFunction	|
|fullErroText					|'Erro Completo'							|Text used to show Full erro in notify, with DEFAULT notifucation	|


### All defaults to sample


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
            ContentType: "application/json",
            ReturnContentType: "application/json",
            //function
            SuccessFunction: null,
            ErroFunction: null,
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