; (function ($) {
    $.asyncRequest = $.asyncRequest || {};
    $.asyncRequest.defaults =
    $.extend(true, $.asyncRequest.defaults, {
        loadText: "Loading..",
        notification: {
            notificationSuccessMsgDefault: 'Operation successful',
            notificationErrorMsgDefault: 'An error occurred while performing the operation',
            fullErroText: 'Full error'
        }
    });
})(jQuery);