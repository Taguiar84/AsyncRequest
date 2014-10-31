/// <reference path="../Scripts/jquery-2.0.3.min.js" />
/// <reference path="../Scripts/jquery.blockUI.min.js" />
/// <reference path="../Scripts/jQuery.tmpl.min.js" />
/// <reference path="../Scripts/jquery.jgrowl.min.js" />

/// <reference path="../Scripts/AsyncRequest.Notification.js" />
/// <reference path="../Scripts/AsyncRequest.Queue.js" />
/// <reference path="../Scripts/AsyncRequest.js" />


describe("Verifica notify - Toastr", function () {
    var request;
    var objRequest;
    //var timeOutRequest = 30;
    beforeEach(function () {
        //disabilitado o noty
        $.noty = null;
        $.jGrowl = null;
        request = $.asyncRequest;
        objRequest = request.getObjAsync();
        spyOn($, "ajax").andCallFake(function (params) {
            setTimeout(function () {
                params.success('Happy Face');
                params.error('Sad Face');
            }, 5);
        });
        toastr.clear();
    });

    afterEach(function () {        
       toastr.clear();
    });

    //toast toast-error
    //toast-container

    it("Não chama no padrão, chamada do GET", function () {
        runs(function () {
            request.get(objRequest);
        });
        waits(4000);
        runs(function () {
            var valor = $("#toast-container div div:first").text();
            expect(valor).toBe("");
        });

    });

    it("chamada com POST", function () {
        runs(function () {
            request.post(objRequest);
        });
        waits(1000);
        runs(function () {            
            var valor = $("#toast-container div:last").text();
            var expected = request.defaults.notification.notificationSuccessMsgDefault;
            expect(expected).toBe(valor);
            
        });
    });

    it("chamada com GET, precisa habilitar isso", function () {
        runs(function () {            
            request.get(objRequest, { notification: { notifyCommandType: ["GET"] } });

        });
        waits(1000);
        runs(function () {
            var valor = $("#toast-container div:last").text();
            expect(valor).toBe(request.defaults.notification.notificationSuccessMsgDefault);
        });
    });

    it("desabilita o notify", function () {
        runs(function () {            
            request.post(objRequest, { notification: { notifyFunction: false } });
        });
        waits(1000);
        runs(function () {
            var valor = $("#toast-container div").length;            
            expect(valor).toBe(0);
        });
    });


    it("personalizando MSG de sucesso e erro", function () {
        var msg = "Custom Mensage";
        var msgErro = msg + " erro";
        runs(function () {            
            request.post(objRequest, { notification: { notificationSuccessMsgDefault: msg, notificationErrorMsgDefault: msgErro } });

        });
        waits(1000);
        runs(function () {
            var valor = $("#toast-container div:first").text();
            expect(valor).toBe(msgErro);

            var valor = $("#toast-container div:last").text();
            expect(valor).toBe(msg);
            
        });
    });


    it("personalizando Notification", function () {

        var func = jasmine.createSpy("notify");
        runs(function () {
            request.post(objRequest, { notification: { notifyFunction: func, notificationSuccessMsgDefault: "Funcção Personalizada", notificationErrorMsgDefault: "Funcção Personalizada erro" } });
        });
        waits(1000);
        runs(function () {
            expect(func).toHaveBeenCalled();
        });
    });
});


describe("Verifica notify Erro - Toastr", function () {
    var request;
    var objRequest;
    beforeEach(function () {
        $.noty = null;
        $.jGrowl = null;
        request = $.asyncRequest;
        objRequest = request.getObjAsync();
        spyOn($, "ajax").andCallFake(function (params) {
            setTimeout(function () {
                params.success('Happy Face');
                params.error({ responseText: 'Sad Face' });
            }, 5);
        });
        toastr.clear();
    });

    afterEach(function () {
        toastr.clear();
    });

    it('Request com erro, deve ter leitura de response text como erro', function () {

        runs(function () {
            request.post(objRequest);
        });

        waits(1000);
        runs(function () {
            var valor = $("#toast-container div div:first").text();            
            expect(valor).toBe('Sad Face');            
        });
    });
});

describe("Verifica notify Erro JSON - Toastr", function () {
    var request;
    var objRequest;
    beforeEach(function () {
        $.noty = null;
        $.jGrowl = null;
        request = $.asyncRequest;
        objRequest = request.getObjAsync();
        spyOn($, "ajax").andCallFake(function (params) {
            setTimeout(function () {
                params.success('Happy Face');
                params.error({ responseText: "{\"errorMessage\":\"another\",\"StackTrace\":\"stack trace\", \"ExceptionMessage\": \"Exception Message\"}" });
            }, 5);
        });
        toastr.clear();
    });

    afterEach(function () {
        toastr.clear();
    });

    it('Request com erro, deve ter leitura de response text como erro', function () {

        runs(function () {
            request.post(objRequest);
        });
        waits(1000);
        runs(function () {
            var valor = $("#toast-container div div:first").text();
            //valor = $(".msgStack li:last").text(); //Stack
            expect(valor).toBe('another');
        });
    });
});


describe("Notify without Request", function () {


    beforeEach(function () {
        $.noty = null;
        $.jGrowl = null;
        toastr.clear();
    });
    afterEach(function () {
        toastr.clear();
    });

    it('Success test', function () {
        runs(function () {
            $.asyncRequest.notifySuccess('sucesso');
        });
        waits(1000);
        runs(function () {
            var feedBack = $("#toast-container div:first").hasClass('toast-success');
            expect(feedBack).toBe(true);            
        });     
    });

    it('Erro test', function () {
        runs(function () {
            $.asyncRequest.notifyErro('erro');
        });
        waits(1000);
        runs(function () {
            var feedBack = $("#toast-container div:first").hasClass('toast-error');
            expect(feedBack).toBe(true);
        });
    });

    it('Erro test with Stack', function () {
        runs(function () {
            $.asyncRequest.notifyErro('erro', 'stack');
        });
        waits(1000);
        runs(function () {
            var feedBack = $("#toast-container div:first").hasClass('toast-error');
            expect(feedBack).toBe(true);
        });
    });

    it('Info test', function () {
        runs(function () {
            $.asyncRequest.notifyInfo('info');
        });
        waits(1000);
        runs(function () {
            var feedBack = $("#toast-container div:first").hasClass('toast-info');
            expect(feedBack).toBe(true);
        });
    });

});