asyncRequest_Notification_JGrowl = function (options) {

    this.options = options;

    //notifyTemplate: "<div><div class='notificationTemplate'><p></p><p class='notificationTemplateMsg'>${msg}</p></div></div>",
    //notifyTemplateErro: "<div><div class='notificationTemplate'><p></p><p class='notificationTemplateMsg'>${msg}</p><br/><ul class='msgStack'><li><a onclick=\"$(this).parent().parent().find('li:last').toggle();\">${fullErroText}</a></li><li>${msgStack}</li></ul></div></div>",

    function replaceTemplate(template, msg, fullErroText, stack) {
        template = template.replace("${fullErroText}", fullErroText);
        template = template.replace("${msg}", msg);
        template = template.replace("${msgStack}", stack);
        return template;
    }

    successNotify = function (msg, stack, sticky) {
        if (msg == null)
            msg = $('<div/>').text(options.notificationSuccessMsgDefault).html();
        var temp = replaceTemplate(options.notifyTemplate, msg, options.fullErroText, stack);
        //var temp = $.tmpl(options.notifyTemplate, { fullErroText: options.fullErroText, msg: msg, msgStack: stack });
        $.jGrowl($(temp).html(), { theme: 'success', sticky: sticky });
    }

    erroNotify = function (msg, stack, sticky, exception) {
        if (msg == null)
            msg = $('<div/>').text(options.notificationErrorMsgDefault).html();            
        if (stack == null && exception != null)
            stack = exception.stack;
        var temp = replaceTemplate(options.notifyTemplateErro, msg, options.fullErroText, stack);
        //var temp = $.tmpl(options.notifyTemplateErro, { fullErroText: options.fullErroText, msg: msg, msgStack: stack });
        $.jGrowl($(temp).html(), { theme: 'erro', sticky: sticky });
    }

    notifyInfo = function (msg, stack, sticky) {
        //var temp = $.tmpl(options.notifyTemplate, { fullErroText: options.fullErroText, msg: msg, msgStack: stack });
        var temp = replaceTemplate(options.notifyTemplate, msg, options.fullErroText, stack);
        $.jGrowl($(temp).html(), { theme: 'info', sticky: sticky });
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