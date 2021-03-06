﻿$.fn.asyncRequest.Notification_JGrowl = function (options) {

    this.options = options;

    function replaceTemplate(template, msg, fullErroText, stack) {
        template = template.replace("${fullErroText}", fullErroText);
        template = template.replace("${msg}", msg);
        template = template.replace("${msgStack}", stack);
        if (stack == null) {
            template = template.replace("class='msgStack'", "class='msgStack hidden'")
        }
        return template;
    }

    successNotify = function (msg, stack, sticky) {
        if (msg == null)
            msg = options.notificationSuccessMsgDefault;
        var temp = replaceTemplate(options.notifyTemplate, msg, options.fullErroText, stack);
        $.jGrowl($(temp).html(), {
            theme: 'success', sticky: sticky
        });
    }

    erroNotify = function (msg, stack, sticky, exception) {
        if (msg == null)
            msg = options.notificationErrorMsgDefault;
        if (stack == null && exception != null)
            stack = exception.stack;
        var temp = replaceTemplate(options.notifyTemplateErro, msg, options.fullErroText, stack);
        $.jGrowl($(temp).html(), { theme: 'erro', sticky: sticky });
    }

    notifyInfo = function (msg, stack, sticky) {
        var temp = replaceTemplate(options.notifyTemplate, msg, options.fullErroText, stack);
        $.jGrowl($(temp).html(), { theme: 'info', sticky: sticky });
    }

    return {
        successNotify: successNotify,
        erroNotify: erroNotify,
        notifyInfo: notifyInfo
    }

}