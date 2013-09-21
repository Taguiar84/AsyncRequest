/// <reference path="../Scripts/jquery-2.0.3.min.js" />
/// <reference path="../Scripts/jquery.blockUI.min.js" />
/// <reference path="../Scripts/jQuery.tmpl.min.js" />

/// <reference path="../Scripts/AsyncRequest.Queue.js" />
/// <reference path="../Scripts/AsyncRequest.js" />


describe("Block Element", function () {
    var request;
    var objRequest;
    beforeEach(function () {
        request = Object.create($.asyncRequest);
        objRequest = request.getObjAsync();
        spyOn($, "ajax").andCallFake(function (params) {
            setTimeout(function () { params.success('opa') }, 5);
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

});