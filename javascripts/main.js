function mockAjax(timeRequest) {
    spyOn($, "ajax").andCallFake(function (params) {
        setTimeout(function () { params.success('Happy Face!!!') }
            , timeoutRequest);
        //    params.error("Sad Face");
        //    params.complete("Be Nice!!!");
    });
}

//$(document).ready(function () {

//    mockAjax();
//});


function laga(data) {
    alert('kadbjf');
}