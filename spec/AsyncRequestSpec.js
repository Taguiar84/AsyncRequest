﻿/// <reference path="../Scripts/jquery-2.0.3.min.js" />
/// <reference path="../Scripts/jquery.blockUI.min.js" />
/// <reference path="../Scripts/jQuery.tmpl.min.js" />

/// <reference path="../Scripts/AsyncRequest.Queue.js" />
/// <reference path="../Scripts/AsyncRequest.js" />

describe("AsyncRequest Object Teste", function () {
    var obj = $.asyncRequest;
    var anotherObj = $.asyncRequest;

    it("Verifica se o Init não foi chamado na instancia", function () {

        //expect(obj.getAjax()).toBe($.ajax);

        obj = Object.create($.asyncRequest);//Novo, Testa getObjAsync;
        obj.getObjAsync();
        //expect(obj.getAjax()).toBe($.ajax);

        //Não pode ter chamado o objeto padrão tbm
        expect($.asyncRequest.options).toBe(undefined);
        //expect($.asyncRequest.getAjax()).toBe($.ajax);

    });

    it("Verifica a troca de valor pelo init", function () {

        obj.init({ ajax: 'laga', notification: { notifyFunction: false } })
        //expect(obj.getAjax()).toBe('laga');
        //expect(obj.options.ajax).toBe('laga');

        anotherObj.init({ ajax: 'another', notification: { notifyFunction: false } })
        //expect(anotherObj.getAjax()).toBe('another');
        //expect(anotherObj.options.ajax).toBe('another');

        //Não alterar com +1 objeto
        //expect(obj.getAjax()).toBe('laga');

        //Ainda tem o objeto padrão
        //expect($.asyncRequest.getAjax()).toBe($.ajax);

    });

});
describe("AsyncRequest Request", function () {
    var request;
    var objRequest;
    beforeEach(function () {
        request = $.asyncRequest;
        objRequest = request.getObjAsync();
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
            request.getAsync("www.URL.com", [], null, callback, callbackErro);
        });
        waits(1);
        runs(function () {
            expect(callback).toHaveBeenCalledWith("Happy Face");
            expect(callbackErro).toHaveBeenCalledWith("Sad Face");
        });
    });

    it("Fazendo um request com sucesso", function () {
        var callback = jasmine.createSpy();
        //objRequest.SuccessFunction = function (data) {
        //    expect(data).toBe("Happy Face");
        //}        
        objRequest.SuccessFunction = callback;
        runs(function () {
            request.get(objRequest);
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
        request.get(objRequest);
    });
    it("Testando o complete request", function () {
        var dados = 0;
        objRequest.SuccessFunction = function (data) {
            dados = 1;
        }
        objRequest.CompleteFunction = function (data) {
            dados = 2
        }
        request.get(objRequest);
        expect(dados).toBe(2);
    });

});