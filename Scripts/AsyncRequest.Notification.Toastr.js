$.fn.asyncRequest.Notification_Toastr = function (options) {

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
        //var temp = replaceTemplate(options.notifyTemplate, msg, options.fullErroText, stack);
        toastr.options.timeOut = 60000000;
        toastr.success(msg);
    }

    erroNotify = function (msg, stack, sticky, exception) {
        if (msg == null)
            msg = options.notificationErrorMsgDefault;
        if (stack == null && exception != null)
            stack = exception.stack;
        //var temp = replaceTemplate(options.notifyTemplateErro, msg, options.fullErroText, stack);
        toastr.error(msg);
        //$.jGrowl($(temp).html(), { theme: 'erro', sticky: sticky });
    }

    notifyInfo = function (msg, stack, sticky) {
        toastr.info(msg);
    }

    return {
        successNotify: successNotify,
        erroNotify: erroNotify,
        notifyInfo: notifyInfo
    }

}