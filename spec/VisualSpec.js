/// <reference path="../Scripts/jquery-2.0.3.min.js" />
/// <reference path="../Scripts/jquery.blockUI.min.js" />
/// <reference path="../Scripts/jQuery.tmpl.min.js" />

/// <reference path="../Scripts/AsyncRequest.Queue.js" />
/// <reference path="../Scripts/AsyncRequest.js" />


describe("Block Element", function () {
    var request;
    var objRequest;
    var timeoutRequest = 100;
    beforeEach(function () {
        request = Object.create($.asyncRequest);
        objRequest = request.getObjAsync();
        spyOn($, "ajax").andCallFake(function (params) {
            setTimeout(function () { params.success('opa') }
                , timeoutRequest);
            //    params.error("Sad Face");
            //    params.complete("Be Nice!!!");
        });
    });

    afterEach(function () {
        //
    });

    it("Com sucesso", function () {
        $("body").append("<div class='row' id='teste'><div class='col-md-3' id='area'>Laga</div></div>")
        objRequest.Containner = $("#area");
        objRequest.Msg = "LAGA LAGA LAGA";
        objRequest.SuccessFunction = function (data) {
            $("#teste").remove();
        }
        request.get(objRequest);
        var valor = $("#teste").find(".blockElement").text();
        expect(valor).toBe(objRequest.Msg);
    });

    it("testa a remoção do block apos executar o evento de sucesso", function () {

        var bloqueado = false;
        runs(function () {
            objRequest.SuccessFunction = function (data) {
                bloqueado = $.find(".blockUI").length > 0;
            }
            request.get(objRequest);
        });

        waits(timeoutRequest + 10);

        runs(function () {
            expect(bloqueado).toBe(true);
        });
    });

    it("testa a remoção do block antes executar o evento de sucesso", function () {
        objRequest.UnblockMoment = "before";
        var bloqueado = false;
        runs(function () {
            objRequest.SuccessFunction = function (data) {                
                bloqueado = $.find(".blockUI").length == 0;
            }
            request.get(objRequest);
        });
        waits(timeoutRequest + 550);

        runs(function () {
            expect(bloqueado).toBe(true);
        });
    });


});

describe("Block Element with error", function () {

    var request;
    var objRequest;
    beforeEach(function () {
        request = Object.create($.asyncRequest);
        objRequest = request.getObjAsync();
        spyOn($, "ajax").andCallFake(function (params) {
            setTimeout(function () { params.error('opa') }
                , 100);
        });
    });


    it("testa a remoção do block apos executar o evento de erro", function () {
        var bloqueado = false;
        
        runs(function () {
            objRequest.ErrorFunction = function (data) {
                bloqueado = $.find(".blockUI").length > 0;
            }
            request.get(objRequest);
        });

        waits(100);

        runs(function () {
            expect(bloqueado).toBe(true);
        });
    });


});