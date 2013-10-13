/// <reference path="AsyncRequest.Object.js" />
/// <reference path="AsyncRequest.Queue.js" />
/// <reference path="AsyncRequest.Notification.js" />
/// <reference path="jquery.jgrowl.min.js" />
/// 
/*!
 * Copyright 2013 Poligono Software, Inc. and other contributors
 * Released under the MIT license
*/

(function ($) {
    "use strict";
    $.fn.asyncRequest = new function () {
        var self = this;

        self.init =
            function (config) {
                var defaults = {};
                $.extend(true, defaults, $.asyncRequest.defaults);
                $.extend(true, defaults, config);
                if (defaults.notification.notifyFunction === null) {
                    defaults.notification.notifyFunction = self.NotifyDefault;
                }
                return defaults;
            };

        self.Unblock =
            function (containner, funcBefore) {//moment is "before" / "after"
                if (containner !== false) {
                    if (containner === null) { //BlockPage
                        $.unblockUI({ onUnblock: funcBefore });
                    } else {
                        $(containner).unblock({ onUnblock: funcBefore });
                    }
                }
            };

        self.ConfigurarAntesRequest =
            function (options, asyncObject, requestType) {

                if (asyncObject.Msg === null || asyncObject.Msg === undefined) {
                    asyncObject.Msg = options.loadTextTemplate.replace("${msg}", options.loadText);
                }
                if (asyncObject.Containner !== false) {
                    if (asyncObject.Containner === null) {//BlockPage
                        $.blockUI({ message: asyncObject.Msg });
                    } else {
                        $(asyncObject.Containner).block({ message: asyncObject.Msg });
                    }
                }

                if (asyncObject.Data === null) {
                    asyncObject.DataRequest = {};
                } else {
                    if (asyncObject.ContentType.indexOf("application/json") !== -1) {
                        asyncObject.DataRequest = JSON.stringify(asyncObject.Data);
                    } else {
                        asyncObject.DataRequest = asyncObject.Data;
                    }
                }
                if (asyncObject.SuccessFunction !== false) {
                    var func = asyncObject.SuccessFunction;
                    asyncObject.SuccessFunction = function (data) {

                        if (asyncObject.UnblockMoment === "before") {
                            var funcBefore = null;
                            if (func !== null) {
                                funcBefore = function () {
                                    func(data);
                                };
                            }
                            self.Unblock(asyncObject.Containner, funcBefore);

                        } else {
                            if (func !== null) {
                                func(data);
                            }
                            self.Unblock(asyncObject.Containner);
                        }
                        self.ExecuteNotify(data, options, requestType, 'success');
                    };
                }

                if (asyncObject.ErrorFunction !== false) {
                    var funcErro = asyncObject.ErrorFunction;
                    asyncObject.ErrorFunction = function (data) {

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
                        //        asyncObject.ErrorFunction(data);
                        //        ExecuteDynamicCommand();
                        //        break
                        //}
                        if (asyncObject.UnblockMoment === "before") {
                            var funcBefore = null;
                            if (funcErro !== null) {
                                funcBefore = function () {
                                    funcErro(data);
                                };
                            }
                            self.Unblock(asyncObject.Containner, funcBefore);

                        } else {
                            if (funcErro !== null) {
                                funcErro(data);
                            }
                            self.Unblock(asyncObject.Containner);
                        }
                        self.ExecuteNotify(data, options, requestType, 'erro');
                    };
                }

                //Sem utilidade ainda
                if (asyncObject.CompleteFunction !== false) {
                    var funcComplete = asyncObject.CompleteFunction;
                    asyncObject.CompleteFunction = function (data) {
                        if (funcComplete !== null) {
                            funcComplete(data);
                        }
                    };
                }
            };

        self.ConfigRequest =
            function (type, asyncObject) {
                $.ajax({
                    type: type,
                    url: asyncObject.Url,
                    data: asyncObject.DataRequest,
                    contentType: asyncObject.ContentType,
                    success: asyncObject.SuccessFunction,
                    error: asyncObject.ErrorFunction,
                    complete: asyncObject.CompleteFunction,
                    dataType: asyncObject.DataType
                });
            };

        self.ExecuteNotify =
            function (data, options, requestType, eventType) {
                if (options.notification.notifyFunction !== null) {
                    options.notification.notifyCommandType.forEach(function (elem) {
                        if (elem === requestType && options.notification.notifyFunction !== false) {
                            options.notification.notifyFunction(eventType, data, options);
                        }
                    });
                }
            };

        self.NotifyDefault =
            function (type, data, config) {
                var notification = null,
                    msg, stack;
                if ($.jGrowl !== null) {
                    notification = new asyncRequest_Notification_JGrowl(config.notification);
                } else if ($.noty !== null) {
                    notification = new asyncRequest_Notification_Notfy(config.notification);
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
                        } catch (exception) {//Erro not JSON, but has value
                            if (data.responseText !== null && data.responseText !== "") {
                                msg = data.responseText;
                            } else {
                                msg = data.Message === null ? data.statusText : data.Message;
                            }
                        }
                        notification.erroNotify(msg, stack, true);
                        break;
                    case "info":
                        notification.notifyInfo();
                        break;
                }
            };


        self.getObjAsync =
            function (config) {
                var options = self.init(config);
                return Object.create(options.asyncObject);
            };

        self.getAsync =
            function (url, data, containner, successFunction, ErrorFunction, msg, queue) {
                var object = self.getObjAsync();
                object.Url = url;
                object.Data = data;
                object.SuccessFunction = successFunction;
                object.ErrorFunction = ErrorFunction;
                object.Msg = msg;
                object.Queue = queue;
                object.Containner = containner;
                self.get(object);
            };

        self.get =
            function (asyncObject, config) {
                var options = self.init(config);
                asyncObject = $.extend(true, options.asyncObject, asyncObject); //asyncObj replace all
                var func = function () {//group function to use queueKey
                    self.ConfigurarAntesRequest(options, asyncObject, "GET");
                    self.ConfigRequest("GET", asyncObject);
                };
                self.ExecuteFunction(asyncObject, func);
            };

        self.post =
            function (asyncObject, config) {
                var options = self.init(config);
                asyncObject = $.extend(true, options.asyncObject, asyncObject); //asyncObj replace all
                var func = function () {//group function to use queueKey
                    self.ConfigurarAntesRequest(options, asyncObject, "POST");
                    self.ConfigRequest("POST", asyncObject);
                };
                self.ExecuteFunction(asyncObject, func);
            };

        self.put =
            function (asyncObject, config) {
                var options = self.init(config);
                asyncObject = $.extend(true, options.asyncObject, asyncObject); //asyncObj replace all
                var func = function () {//group function to use queueKey
                    self.ConfigurarAntesRequest(options, asyncObject, "UPDATE");
                    self.ConfigRequest("UPDATE", asyncObject);
                };
                self.ExecuteFunction(asyncObject, func);
            };

        self.delete =
        function (asyncObject, config) {
            var options = self.init(config);
            asyncObject = $.extend(true, options.asyncObject, asyncObject); //asyncObj replace all
            var func = function () {//group function to use queueKey
                self.ConfigurarAntesRequest(options, asyncObject);
                self.ConfigRequest("DELETE", asyncObject);
            };
            self.ExecuteFunction(asyncObject, func);
        };

        self.getAjax =
        function () {
            //self.init();
            return $.asyncRequest.defaults.ajax;
        };

        self.ExecuteFunction =
            function (asyncObject, func) {

                var queueUtil = $.asyncRequest.defaults.queueUtil,
                key = queueUtil.configQueue(asyncObject);//key in queue to execute;

                if (key !== null) {//Put in Queue
                    var Objqueue = queueUtil.getQueue(key);
                    Objqueue.queue.push(function () {
                        func();
                    });
                    if (!Objqueue.Executing) {
                        Objqueue.Executing = true;
                        Objqueue.queue.execute();
                    }
                } else { //No Queue, execute!!
                    func();
                }
            };

        return {
            getAsync: self.getAsync,
            get: self.get,
            post: self.post,
            put: self.put,
            'delete': self.delete,
            getObjAsync: self.getObjAsync,
            getAjax: self.getAjax
        };
    };
    //$.fn.asyncRequest = new asyncRequest();

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
            notifyTemplate: "<div><div class='notificationTemplate'><p></p><p class='notificationTemplateMsg'>${msg}</p></div></div>",
            notifyTemplateErro: "<div><div class='notificationTemplate'><p></p><p class='notificationTemplateMsg'>${msg}</p><br/><ul class='msgStack'><li><a onclick=\"$(this).parent().parent().find('li:last').toggle();\">${fullErroText}</a></li><li>${msgStack}</li></ul></div></div>",
            notificationSuccessMsgDefault: 'Operação realizada com sucesso',
            notificationErrorMsgDefault: 'Ocorreu um erro ao realizar a operação',
            fullErroText: 'Erro Completo'
        }
    };

})(jQuery);