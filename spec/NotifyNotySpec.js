/// <reference path="../Scripts/jquery-2.0.3.min.js" />
/// <reference path="../Scripts/jquery.blockUI.min.js" />
/// <reference path="../Scripts/jQuery.tmpl.min.js" />
/// <reference path="../Scripts/jquery.jgrowl.min.js" />

/// <reference path="../Scripts/AsyncRequest.Notification.js" />
/// <reference path="../Scripts/AsyncRequest.Queue.js" />
/// <reference path="../Scripts/AsyncRequest.js" />


describe("Verifica notify - Noty", function () {
    var request;
    var objRequest;
    beforeEach(function () {
        //Disable Jgrowl
        $.jGrowl = null;
        request = Object.create($.asyncRequest);
        objRequest = request.getObjAsync();
        spyOn($, "ajax").andCallFake(function (params) {
            setTimeout(function () {
                params.success('Happy Face');
                params.error('Sad Face');
            }, 5);
        });
    });

    afterEach(function () {
        $('.jGrowl-notification').trigger('jGrowl.close');//Remove ALL, now CALL erroFunction too
        //$('.jGrowl-notification:last').trigger('jGrowl.close');//Remove last
    });

    it("chamada basica", function () {
        runs(function () {
            request.post(objRequest);
        });
        waits(1000);

        runs(function () {
            var valor = $(".notificationTemplateMsg:first").text();
            expect(valor).toBe("");
        });

    });

    //it("chamada com POST", function () {
    //    runs(function () {
    //        request.post(objRequest);

    //    });
    //    waits(1000);
    //    runs(function () {
    //        var valor = $(".notificationTemplateMsg:first").text();
    //        //enconde html 
    //        var expected = $('<div/>').text(request.options.notification.notificationSuccessMsgDefault).html();
    //        expect(valor).toBe(expected);
            
    //    });
    //});

    //it("chamada com GET, precisa habilitar isso", function () {
    //    runs(function () {
    //        request.init({ notification: { notifyCommandType: ["GET"] } });
    //        request.get(objRequest);

    //    });
    //    waits(1000);
    //    runs(function () {
    //        var valor = $(".notificationTemplateMsg:first").text();
    //        expect(valor).toBe(request.options.notification.notificationSuccessMsgDefault);
    //    });
    //});

    //it("personalizando MSG de sucesso e erro", function () {
    //    var msg = "Custom Mensage";
    //    var msgErro = msg + " erro";
    //    runs(function () {
    //        request.init({ notification: { notificationSuccessMsgDefault: msg, notificationErrorMsgDefault: msgErro } });
    //        request.post(objRequest);

    //    });
    //    waits(1000);
    //    runs(function () {
    //        var valor = $(".notificationTemplateMsg:first").text();
    //        expect(valor).toBe(msg);

    //        var valor = $(".notificationTemplateMsg:last").text();
    //        expect(valor).toBe(msgErro);
    //    });
    //});


    //it("personalizando Notification", function () {

    //    var func = jasmine.createSpy("notify");
    //    runs(function () {
    //        request.init({ notification: { notifyFunction: func, notificationSuccessMsgDefault: "Funcção Personalizada", notificationErrorMsgDefault: "Funcção Personalizada erro" } });
    //        request.post(objRequest);
    //    });
    //    waits(1000);
    //    runs(function () {
    //        expect(func).toHaveBeenCalled();
    //    });
    //});


});
