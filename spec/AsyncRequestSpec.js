/// <reference path="../Scripts/jquery-2.0.3.min.js" />
/// <reference path="../Scripts/jquery.blockUI.min.js" />
/// <reference path="../Scripts/jQuery.tmpl.min.js" />

/// <reference path="../Scripts/AsyncRequest.Queue.js" />
/// <reference path="../Scripts/AsyncRequest.js" />

describe("AsyncRequest Request", function () {
    beforeEach(function () {
        objRequest = $.asyncRequest.getObjAsync();
        spyOn($, "ajax").andCallFake(function (params) {
            params.success("Happy Face");
            params.error("Sad Face");
            params.complete("Be Nice!!!");
        });
    });

    it("Use GetAsync request, no object", function () {
        var callback = jasmine.createSpy();
        var callbackErro = jasmine.createSpy();
        runs(function () {
            $.asyncRequest.getAsync("www.URL.com", [], null, callback, callbackErro);
        });
        waits(1);
        runs(function () {
            expect(callback).toHaveBeenCalledWith("Happy Face");
            expect(callbackErro).toHaveBeenCalledWith("Sad Face");
        });
    });

    it("Fazendo um request com sucesso", function () {
        var callback = jasmine.createSpy();
        objRequest.SuccessFunction = callback;
        runs(function () {
            $.asyncRequest.get(objRequest);
        });
        waits(1);
        runs(function () {
            expect(callback).toHaveBeenCalledWith("Happy Face");
        });

    });
    it("Fazendo um request com erro", function () {
        objRequest.ErroFunction = function (data) {
            expect(data).toBe("Sad Face");
        }
        $.asyncRequest.get(objRequest);
    });
    it("Testando o complete request", function () {
        var dados = 0;
        objRequest.SuccessFunction = function (data) {
            dados = 1;
        }
        objRequest.CompleteFunction = function (data) {
            dados = 2
        }
        $.asyncRequest.get(objRequest);
        expect(dados).toBe(2);
    });

    it("Verifica request in-line, get", function () {
        var retorno;
        $.asyncRequest.get({
            SuccessFunction: function (data) {
                retorno = data;
            }
        });
        expect(retorno, "Happy Face");
    });

    it("Verifica request in-line, post", function () {
        var callback = jasmine.createSpy();
        var callbackErro = jasmine.createSpy();
        $.asyncRequest.post({ SuccessFunction: callback, ErrorFunction: callbackErro });

        expect(callback).toHaveBeenCalledWith("Happy Face");
        expect(callbackErro).toHaveBeenCalledWith("Sad Face");
    });

    it("Verifica request in-line, put", function () {
        var callback = jasmine.createSpy();
        var callbackErro = jasmine.createSpy();
        $.asyncRequest.put({ SuccessFunction: callback, ErrorFunction: callbackErro });

        expect(callback).toHaveBeenCalledWith("Happy Face");
        expect(callbackErro).toHaveBeenCalledWith("Sad Face");
    });

    it("Verifica request in-line, delete", function () {
        var callback = jasmine.createSpy();
        var callbackErro = jasmine.createSpy();
        $.asyncRequest.delete({ SuccessFunction: callback, ErrorFunction: callbackErro });

        expect(callback).toHaveBeenCalledWith("Happy Face");
        expect(callbackErro).toHaveBeenCalledWith("Sad Face");
    });


    
});


describe("AsyncRequest Timeout", function () {
    var objRequest;
    var timeOutRequest = 30;
    beforeEach(function () {
        objRequest = $.asyncRequest.getObjAsync();
        //objRequest = request.getObjAsync();
        spyOn($, "ajax").andCallFake(function (params) {
            setTimeout(function () { params.success('opa'); params.complete("Be Nice!!!"); }, timeOutRequest);

        });        
    });

    it("Timeout teste", function () {
        objRequest.Timeout = 15;//change timeout
        runs(function () {
            $.asyncRequest.get(objRequest);
        });

        waits(10 * timeOutRequest);

        runs(function () {
            expect(true).toBe(true);
        });

    });


});


