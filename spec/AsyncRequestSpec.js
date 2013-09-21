/// <reference path="../Scripts/jquery-2.0.3.min.js" />
/// <reference path="../Scripts/jquery.blockUI.min.js" />
/// <reference path="../Scripts/jQuery.tmpl.min.js" />

/// <reference path="../Scripts/AsyncRequest.Queue.js" />
/// <reference path="../Scripts/AsyncRequest.js" />

describe("AsyncRequest Object Teste", function () {
    var obj = Object.create($.asyncRequest);
    var anotherObj = Object.create($.asyncRequest);

    it("Verifica se o Init não foi chamado na instancia", function () {

        expect(obj.getAjax()).toBe($.ajax);

        obj = Object.create($.asyncRequest);//Novo, Testa getObjAsync;
        obj.getObjAsync();
        expect(obj.getAjax()).toBe($.ajax);

        //Não pode ter chamado o objeto padrão tbm
        expect($.asyncRequest.options).toBe(undefined);
        //expect($.asyncRequest.getAjax()).toBe($.ajax);

    });

    it("Verifica a troca de valor pelo init", function () {

        obj.init({ ajax: 'laga', notification: { notifyFunction: false } })
        expect(obj.getAjax()).toBe('laga');
        expect(obj.options.ajax).toBe('laga');

        anotherObj.init({ ajax: 'another', notification: { notifyFunction: false } })
        expect(anotherObj.getAjax()).toBe('another');
        expect(anotherObj.options.ajax).toBe('another');

        //Não alterar com +1 objeto
        expect(obj.getAjax()).toBe('laga');

        //Ainda tem o objeto padrão
        expect($.asyncRequest.getAjax()).toBe($.ajax);

    });

});
describe("AsyncRequest Request", function () {
    var request;
    var objRequest;
    beforeEach(function () {
        request = Object.create($.asyncRequest);
        objRequest = request.getObjAsync();
        spyOn($, "ajax").andCallFake(function (params) {
            params.success("Happy Face");
            params.error("Sad Face");
            params.complete("Be Nice!!!");
        });
    });

    it("Fazendo um request com sucesso", function () {
        var callback = jasmine.createSpy();
        //objRequest.SuccessFunction = function (data) {
        //    expect(data).toBe("Happy Face");
        //}        
        objRequest.SuccessFunction = callback;
        request.get(objRequest);
        expect(callback).toHaveBeenCalledWith("Happy Face");

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


/*
var ToDontList = function (initialItems) {
    var self = this;

    if (!(initialItems instanceof Array))
        initialItems = [];
    self.items = ko.observableArray(initialItems);

    self.add_item = function (item) {
        self.items.push(item);
    };
};

describe("ToDontList View Model", function () {
    it("Has a working test harness", function () {
        expect(true).not.toBe(false);
    });
    var test_item1 = { "title": "Test title", "description": "Test description", "complete": false };
    var test_item2 = { "title": "Another test title", "description": "Another test description", "complete": false };
    var test_items = [test_item1, test_item2];

    it("Should be able to add items", function () {
        var target = new ToDontList();
        target.add_item(test_item1);
        expect(target.items()[0].title).toBe(test_item1.title);
    });

    it("Should be able to view existing items", function () {
        var target = new ToDontList(test_items);
        expect(target.items().length).toBe(2);
        expect(target.items()[0].title).toBe(test_item1.title);
        expect(target.items()[1].title).toBe(test_item2.title);
    });



});
*/