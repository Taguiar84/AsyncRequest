asyncRequest_Notification_JGrowl = function (options) {

    this.options = options;

    successNotify = function (msg, stack, sticky) {
        if (msg == null)
            msg = options.notificationSuccessMsgDefault;
        var temp = $.tmpl(options.notifyTemplate, { fullErroText: options.fullErroText, msg: msg, msgStack: stack });
        $.jGrowl($(temp[0]).html(), { theme: 'success', sticky: sticky });
    }

    erroNotify = function (msg, stack, sticky, exception) {
        if (msg == null)
            msg = options.notificationErrorMsgDefault;
        if (stack == null && exception != null)
            stack = exception.stack;
        var temp = $.tmpl(options.notifyTemplateErro, { fullErroText: options.fullErroText, msg: msg, msgStack: stack });
        $.jGrowl($(temp[0]).html(), { theme: 'erro', sticky: sticky });
    }

    notifyInfo = function (msg, stack, sticky) {
        var temp = $.tmpl(options.notifyTemplate, { fullErroText: options.fullErroText, msg: msg, msgStack: stack });
        $.jGrowl($(temp[0]).html(), { theme: 'info', sticky: sticky });
    }

    return {
        successNotify: successNotify,
        erroNotify: erroNotify,
        notifyInfo: notifyInfo
    }

}

asyncRequest_Notification_Notfy = function () {

    successNotify = function (msg, stack, sticky) {
        if (msg == null)
            msg = _notificationSuccessMsgDefault;
        var temp = $.tmpl(notificationTemplate, { msg: msg, msgStack: stack });
        $.jGrowl($(temp[0]).html(), { theme: 'sucesso', sticky: sticky });
    }

    erroNotify = function (msg, stack, sticky, exception) {
        if (msg == null)
            msg = _notificationErrorMsgDefault;
        if (stack == null && exception != null)
            stack = exception.stack;
        var temp = $.tmpl(notificationTemplate, { msg: msg, msgStack: stack });
        $.jGrowl($(temp[0]).html(), { theme: 'erro', sticky: sticky });
    }

    notifyInfo = function (msg, stack, sticky) {
        var temp = $.tmpl(notificationTemplate, { msg: msg, msgStack: stack });
        $.jGrowl($(temp[0]).html(), { theme: 'aviso', sticky: sticky });
    }

    return {
        successNotify: successNotify,
        erroNotify: erroNotify,
        notifyInfo: notifyInfo
    }
}