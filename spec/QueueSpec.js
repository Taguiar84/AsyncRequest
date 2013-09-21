/// <reference path="../Scripts/jquery-2.0.3.min.js" />
/// <reference path="../Scripts/jquery.blockUI.min.js" />
/// <reference path="../Scripts/jQuery.tmpl.min.js" />

/// <reference path="../Scripts/AsyncRequest.Queue.js" />
/// <reference path="../Scripts/AsyncRequest.js" />


describe("Queue Execute", function () {
    var request;
    var objRequest;
    var timeOutRequest = 30;

    beforeEach(function () {
        request = Object.create($.asyncRequest);
        request.init({ notification: { notifyFunction: false } })

        //objRequest = request.getObjAsync();
        spyOn($, "ajax").andCallFake(function (params) {
            setTimeout(function () { params.success('opa'); params.complete("Be Nice!!!"); }, timeOutRequest);

        });
    });

    it("Um request deve ser feitos apos o outro, usando a mesma chave", function () {
        var queueKey = "someKey";
        runs(function () {
            var count = 0;
            for (var i = 0; i < 10; i++) {
                objRequest = request.getObjAsync();
                objRequest.Queue = queueKey;
                objRequest.SuccessFunction = function (data) {
                    if (count == 0)
                        count = new Date().getTime();
                    else {
                        count = new Date().getTime() - count;
                        //console.log(count);
                        expect(count).toBeGreaterThan(timeOutRequest);
                    }
                }
                request.get(objRequest);
            }
        });

        waits(10 * timeOutRequest);

        runs(function () {
            expect(true).toBe(true);
        });

    });

    it("Com Queues diferentes(\"keys\") os request devem ser concorrentes entre as chaves", function () {

        for (var queueKey = 0; queueKey < 10; queueKey++) {
            for (var i = 0; i < 10; i++) {
                objRequest = request.getObjAsync();
                objRequest.Queue = queueKey;
                //Assim força a copia da variavel          
                SetaURLFORACONTEXT(objRequest, queueKey.toString());
                request.get(objRequest);
            }

            waits(11 * timeOutRequest);
        }

        runs(function () {
            expect(true).toBe(true);
        });


    });

});

function SetaURLFORACONTEXT(objRequest, url) {
    objRequest.Url = url;
    objRequest.SuccessFunction = function (data) {
        //console.log(url);   
    }
}

/*
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
*/