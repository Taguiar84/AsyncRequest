; (function ($) {
    $.asyncRequest = $.asyncRequest || {};
    $.asyncRequest.defaults =
    $.extend(true, $.asyncRequest.defaults, {
        loadText: "Carregando..",
        notification: {
            notificationSuccessMsgDefault: 'Operação realizada com sucesso',
            notificationErrorMsgDefault: 'Ocorreu um erro ao realizar a operação',
            fullErroText: 'Erro Completo'
        }
    });
})(jQuery);