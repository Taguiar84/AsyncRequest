/// <reference path="AsyncRequest.Object.js" />
/// <reference path="AsyncRequest.Queue.js" />
/// <reference path="AsyncRequest.Notification.js" />
/// <reference path="jquery.jgrowl.min.js" />
/// 
/*!
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
*/

(function ($) {
    "use strict";

    function ExecuteNotify(data, options, requestType, eventType) {
        if (options.notification.notifyFunction !== null) {
            options.notification.notifyCommandType.forEach(function (elem) {
                if (elem == requestType) {
                    options.notification.notifyFunction(eventType, data);
                }
            });
        }
    }

    function ConfigurarAntesRequest(options, asyncObject, requestType) {

        if (asyncObject.Msg === null || asyncObject.Msg === undefined) {
            asyncObject.Msg = $.tmpl(options.loadTextTemplate, { msg: options.loadText });
        }
        if (asyncObject.Containner !== false) {
            if (asyncObject.Containner === null) {//BlockPage
                $.blockUI({ message: asyncObject.Msg });
            }
            else {
                $(asyncObject.Containner).block({ message: asyncObject.Msg });
            }
        }

        if (asyncObject.Data === null) {
            asyncObject.DataRequest = {};
        }
        else {
            if (asyncObject.contentType == "application/json") {
                asyncObject.DataRequest = JSON.stringify(asyncObject.Data);
            }
            asyncObject.DataRequest = asyncObject.Data;
        }


        if (asyncObject.SuccessFunction === null) {
            asyncObject.SuccessFunction = function (data) { };
        }
        if (asyncObject.ErroFunction === null) {
            asyncObject.ErroFunction = function (data) { };
        }
        if (asyncObject.CompleteFunction == null) {
            asyncObject.CompleteFunction = function (data) { };
        }
        if (asyncObject.SuccessFunction != false) {
            var func = asyncObject.SuccessFunction;
            asyncObject.SuccessFunction = function (data) {
                //ExecuteDynamicCommand();

                if (asyncObject.containner != false) {
                    if (asyncObject.Containner == null) { //BlockPage
                        $.unblockUI();
                    }
                    else {
                        $(asyncObject.Containner).unblock();
                    }
                }
                func(data);
                ExecuteNotify(data, options, requestType, 'success');

            }
        }

        if (asyncObject.ErroFunction != false) {
            var funcErro = asyncObject.ErroFunction;
            asyncObject.ErroFunction = function (data) {

                //if (asyncObject.ReturnType == "json") {
                //    if (data.responseText != null && data.responseText != "") {
                //        jsonRetorno = JSON.parse(data.responseText);
                //        jsonRetorno.Message = Core.Notification.ErrorMsgDefault;
                //        data.responseText = JSON.stringify(jsonRetorno);
                //    }
                //}

                //switch (request.statusCode().status) {
                //    //Core.HandlerErroInterno(data);
                //    //break;
                //    case 401: //Unauthorized
                //        Core.HandlerErroInterno(data);
                //        break;
                //    case 404: //Not found
                //        Core.HandlerErroInterno(data);
                //        break;
                //    case 500: //erro interno
                //        Core.HandlerErroInterno(data);
                //        break;
                //    case 400: //BadRequest
                //    default:
                //        asyncObject.ErroFunction(data);
                //        ExecuteDynamicCommand();
                //        break
                //}
                if (asyncObject.Containner != false) {
                    if (asyncObject.Containner == null) { //BlockPage
                        $.unblockUI();
                    }
                    else {
                        $(asyncObject.Containner).unblock();
                    }
                }
                funcErro(data);
                ExecuteNotify(data, options, requestType, 'erro');

            };
        }

        //Sem utilidade ainda
        if (asyncObject.CompleteFunction != false) {
            var funcComplete = asyncObject.CompleteFunction;
            asyncObject.CompleteFunction = function (data) {
                funcComplete(data);
            };
        }
    }

    function ConfigRequest(type, asyncObject) {
        $.ajax({
            type: type,
            url: asyncObject.Url,
            data: asyncObject.DataRequest,
            contentType: asyncObject.ContentType,
            success: asyncObject.SuccessFunction,
            error: asyncObject.ErroFunction,
            complete: asyncObject.CompleteFunction
        });
    }

    $.fn.asyncRequest = new function () {
        var Module = {

            init: function (options) {
                var defaults = {};
                $.extend(true, defaults, $.asyncRequest.defaults);
                this.options = $.extend(true, defaults, options);
                if (this.options.notification.notifyFunction === null) {
                    this.options.notification.notifyFunction = this.NotifyDefault;
                }
            },

            getObjAsync: function () {
                if (this.options === undefined) {
                    this.init();
                }
                return Object.create(this.options.asyncObject);
            },

            getAsync: function (url, data, containner, successFunction, erroFunction, msg, queue) {
                var object = this.getObjAsync();
                object.Url = url;
                object.Data = data;
                object.SuccessFunction = successFunction;
                object.ErroFunction = erroFunction;
                object.Msg = msg;
                object.Queue = queue;
                object.Containner = containner;
                this.get(object);
            },

            get: function (asyncObject) {
                if (this.options === undefined) {
                    this.init();
                }
                var options = this.options;
                //group function to use queueKey
                var func = function () {
                    ConfigurarAntesRequest(options, asyncObject, "GET");
                    ConfigRequest("GET", asyncObject);
                };
                this.ExecuteFunction(asyncObject, func);
            },

            post: function (asyncObject) {
                if (this.options === undefined) {
                    this.init();
                }
                var options = this.options;
                var func = function () {
                    ConfigurarAntesRequest(options, asyncObject, "POST");
                    ConfigRequest("POST", asyncObject);
                };
                this.ExecuteFunction(asyncObject, func);
            },

            update: function (asyncObject) {
                if (this.options === undefined) {
                    this.init();
                }
                var options = this.options;
                var func = function () {
                    ConfigurarAntesRequest(options, asyncObject, "UPDATE");
                    ConfigRequest("UPDATE", asyncObject);
                };
                this.ExecuteFunction(asyncObject, func);
            },

            delete: function (asyncObject) {
                if (this.options === undefined) {
                    this.init();
                }
                var options = this.options;
                var func = function () {
                    ConfigurarAntesRequest(options, asyncObject);
                    ConfigRequest("DELETE", asyncObject);
                };
                this.ExecuteFunction(asyncObject, func);
            },

            getAjax: function () {
                if (this.options === undefined) {
                    this.init();
                }
                return this.options.ajax;
            },

            ExecuteFunction: function (asyncObject, func) {

                var queueUtil = $.asyncRequest.defaults.queueUtil;
                var key = queueUtil.configQueue(asyncObject);//key in queue to execute;

                if (key != null) {//Put in Queue
                    var Objqueue = queueUtil.getQueue(key);
                    Objqueue.queue.push(function () {
                        func();
                    });
                    if (!Objqueue.Executing) {
                        Objqueue.Executing = true;
                        Objqueue.queue.execute();
                    }
                }//No Queue, execute!!
                else
                    func();
            },

            NotifyDefault: function (type, data) {
                var notification = null;
                var msg, stack, sticky;
                if ($.jGrowl != null) {
                    notification = new asyncRequest_Notification_JGrowl(this);
                }
                else if ($.noty != null) {
                    notification = new asyncRequest_Notification_Notfy(this);
                }

                switch (type) {
                    case "success":
                        notification.successNotify();
                        break;
                    case "erro":

                        try {
                            var jsonErro = JSON.parse(data.responseText);
                            msg = jsonErro.errorMessage;
                            stack = jsonErro.ExceptionMessage + "<br/>" + jsonErro.StackTrace;
                        }
                        catch (exception) {//Erro not JSON, but has value
                            if (data.responseText != null && data.responseText != "")
                                msg = data.responseText;
                            else {
                                msg = data.Message == null ? data.statusText : data.Message;
                            }
                        }
                        notification.erroNotify(msg, stack, true);
                        break;
                    case "info":
                        notification.notifyInfo();
                        break;
                }

            }

        }
        return Module
    }

    

    $.asyncRequest = $.fn.asyncRequest;

    $.asyncRequest.defaults = {
        ajax: $.ajax,
        loadText: "Carregando..",
        loadTextTemplate: "<div class='MenssagemLoad'><h4>${msg}</h4></div>",
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
            notifyTemplate: "<div><div class='notificationTemplate'><p></p><p class='notificationTemplateMsg'>${msg}</p></div></div>",
            notifyTemplateErro: "<div><div class='notificationTemplate'><p></p><p class='notificationTemplateMsg'>${msg}</p><br/><ul class='msgStack'><li><a onclick=\"$(this).parent().parent().find('li:last').toggle();\">${fullErroText}</a></li><li>${msgStack}</li></ul></div></div>",
            notificationSuccessMsgDefault: 'Operação realizada com sucesso',
            notificationErrorMsgDefault: 'Ocorreu um erro ao realizar a operação',
            fullErroText: 'Erro Completo'
        }
    }

})(jQuery);