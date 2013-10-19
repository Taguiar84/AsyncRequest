/// <reference path="../Scripts/jquery-2.0.3.min.js" />
/// <reference path="../Scripts/jquery.blockUI.min.js" />
/// <reference path="../Scripts/jQuery.tmpl.min.js" />
/// <reference path="../Scripts/jquery.jgrowl.min.js" />

/// <reference path="../Scripts/AsyncRequest.Notification.js" />
/// <reference path="../Scripts/AsyncRequest.Queue.js" />
/// <reference path="../Scripts/AsyncRequest.js" />


describe("Verifica notify - Jgrowl", function () {
    var request;
    var objRequest;
    //var timeOutRequest = 30;
    beforeEach(function () {
        request = $.asyncRequest;
        objRequest = request.getObjAsync();
        spyOn($, "ajax").andCallFake(function (params) {
            setTimeout(function () {
                params.success('Happy Face');
                params.error('Sad Face');
            }, 5);
        });
        $('.jGrowl-notification').trigger('jGrowl.close');//Remove ALL, now CALL erroFunction too
    });

    afterEach(function () {        
        $('.jGrowl-notification').trigger('jGrowl.close');//Remove ALL, now CALL erroFunction too
    });

    it("Não chama no padrão, chamada do GET", function () {
        runs(function () {
            request.get(objRequest);
        });
        waits(4000);
        runs(function () {
            var valor = $(".notificationTemplateMsg:first").text();
            expect(valor).toBe("");
        });

    });

    it("chamada com POST", function () {
        runs(function () {
            request.post(objRequest);
        });
        waits(1000);
        runs(function () {
            var valor = $(".notificationTemplateMsg:first").text();
            //enconde html 
            var expected = $('<div/>').text(request.defaults.notification.notificationSuccessMsgDefault).html();
            expect(valor).toBe(expected);
            
        });
    });

    it("chamada com GET, precisa habilitar isso", function () {
        runs(function () {            
            request.get(objRequest, { notification: { notifyCommandType: ["GET"] } });

        });
        waits(1000);
        runs(function () {
            var valor = $(".notificationTemplateMsg:first").text();
            expect(valor).toBe(request.defaults.notification.notificationSuccessMsgDefault);
        });
    });

    it("desabilita o notify", function () {
        runs(function () {            
            request.post(objRequest, { notification: { notifyFunction: false } });
        });
        waits(1000);
        runs(function () {
            var valor = $(".notificationTemplateMsg").length;
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
            var valor = $(".notificationTemplateMsg:first").text();
            expect(valor).toBe(msg);

            var valor = $(".notificationTemplateMsg:last").text();
            expect(valor).toBe(msgErro);
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


describe("Verifica notify Erro - Jgrowl", function () {
    var request;
    var objRequest;
    beforeEach(function () {
        request = $.asyncRequest;
        objRequest = request.getObjAsync();
        spyOn($, "ajax").andCallFake(function (params) {
            setTimeout(function () {
                params.success('Happy Face');
                params.error({ responseText: 'Sad Face' });
            }, 5);
        });
        $('.jGrowl-notification').trigger('jGrowl.close');//Remove ALL, now CALL erroFunction too
    });

    afterEach(function () {
        $('.jGrowl-notification').trigger('jGrowl.close');//Remove ALL, now CALL erroFunction too
    });

    it('Request com erro, deve ter leitura de response text como erro', function () {

        runs(function () {
            request.post(objRequest);
        });

        waits(1000);
        runs(function () {
            var valor = $(".notificationTemplateMsg:last").text();
            expect(valor).toBe('Sad Face');            
        });
    });
});

describe("Verifica notify Erro JSON - Jgrowl", function () {
    var request;
    var objRequest;
    beforeEach(function () {
        request = $.asyncRequest;
        objRequest = request.getObjAsync();
        spyOn($, "ajax").andCallFake(function (params) {
            setTimeout(function () {
                params.success('Happy Face');
                params.error({ responseText: "{\"errorMessage\":\"another\",\"StackTrace\":\"stack trace\", \"ExceptionMessage\": \"Exception Message\"}" });
            }, 5);
        });
        $('.jGrowl-notification').trigger('jGrowl.close');//Remove ALL, now CALL erroFunction too
    });

    afterEach(function () {
        $('.jGrowl-notification').trigger('jGrowl.close');//Remove ALL, now CALL erroFunction too
    });

    it('Request com erro, deve ter leitura de response text como erro', function () {

        runs(function () {
            request.post(objRequest);
        });
        waits(1000);
        runs(function () {            
            valor = $(".msgStack li:last").text(); //Stack
            expect(valor).toBe('Exception Messagestack trace');
        });
    });
});
