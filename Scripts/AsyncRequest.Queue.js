/// <reference path="AsyncRequest.Object.js" />

function asyncRequest_Queue() {

    var queueKeyDefault = "UmaChaveQualaquer";
    var self = this;
    self.queueList = new Array();

    function ConfigQueue(asyncObject) {
        var key = null;
        if (asyncObject.Queue != null && asyncObject.Queue != false) {
            key = asyncObject.Queue == true ? queueKeyDefault : asyncObject.Queue;
            asyncObject.CompleteFunction = function () {
                GetQueue(key).queue.execute();
            }
        }
        return key;
    }


    function GetQueue(key) {
        for (var i = 0; i < self.queueList.length; i++) {
            if (self.queueList[i].Name == key)
                return self.queueList[i];
        }
        self.queueList[self.queueList.length] = new queueObj(key);
        return self.queueList[self.queueList.length - 1];
    }
    function queueObj(key) {
        var self = this;
        self.Name = key;
        self.Executing = false;
        // fila de execução
        self.queue = {
            queueAttr: []
            , push: function (fn) {
                this.queueAttr.push(fn);
                if (!self.Executing) {
                    self.Executing = true;
                    this.execute();
                }
                return this;
            }
            , pop: function () {
                return this.queueAttr.splice(0, 1)[0];
            }
            , execute: function () {
                //while (this.queueAttr.length > 0) {
                var fn = this.pop();
                if (fn == null) {
                    self.Executing = false;
                    return;
                }
                fn();
            }
            //this.dispatch(fn);
            //}
            , dispatch: function (fn) {
                args = [params];
                fn = (typeof fn == "function") ? fn : window[fn];
                return fn.apply(this, args || []);
            }
        };
    }

    return {
        getQueue: GetQueue,
        configQueue: ConfigQueue
    };

}




