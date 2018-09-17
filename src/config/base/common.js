function ajaxCommon(){
    var _this=this;

    this.androidOrios = function()
    {
        // 1表示IOS；2表示安卓
        var androidOrios = 1;
        var ua = navigator.userAgent;
        if(ua.indexOf('{')===0){
            var oua = JSON.parse(ua);
            if(oua.sourceType==="2"){
                // 安卓使用旧的JSBridge
                androidOrios = 2;
            }
            //如果是ios那么走新的
            //alert(JSON.parse(ua).version+':'+JSON.parse(ua).versioncode);
        }
        return androidOrios;
    }
    /**与APP交互的基础方法 **/
    this.setupWebViewJavascriptBridge = function(callback) {
        var androidOrios = _this.androidOrios();
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge)
        } else {
            if(androidOrios==2){
                document.addEventListener('WebViewJavascriptBridgeReady', function() {
                    callback(WebViewJavascriptBridge)
                }, false)
                return;
            }else{
                if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
                window.WVJBCallbacks = [callback];
                var WVJBIframe = document.createElement('iframe');
                WVJBIframe.style.display = 'none';
                WVJBIframe.src = 'https://__bridge_loaded__';
                document.documentElement.appendChild(WVJBIframe);
                setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0);
                return;
            }
        }
    }

    /**
     * ajax重写封装,加入验签操作(只对POST做验证),需要引入zepto或者jQuery
     * @name ajax
     * @function
     * @example
     * ajax({
         type: "POST",
          url: "http://192.168.60.213/Customer/Test/TestCheck",
          dataType: "JSON",
          data: {"aaa":"11"},
          success: function (data) {
          },
          error: function (e,b) {
          }
     * })
     * */
    this.isInit=function(){
    	this.setupWebViewJavascriptBridge(function(bridge) {
	    	if(_this.androidOrios()==2){
	            bridge.init(function(message, responseCallback) {
	                if (responseCallback) {
	                    responseCallback("Right back atcha") ;
	                }
	            });
	    	}
	    })
    }
	this.ajax=function(opt){
        // $("body").append("<div>用户信息："+_this.UserTicket+"</div>");
        // $("body").append("<div>机器码："+this.MachineKey+"</div>");
        // $("body").append("<div>当前版本："+this.Version+"</div>");

        this.setupWebViewJavascriptBridge(function(bridge) {           
            // 获取用户信息
            bridge.callHandler('native_GetBaseInfo', {}, function(response) {
                opt = opt || {};
                opt.method = opt.method.toUpperCase() || 'POST';
                opt.url = opt.url || '';
                opt.async = opt.async;
                opt.data = opt.data || null;
                opt.success = opt.success || function () {};
                var _SourceType=1;
                var _UserTicket=response.userticket;    //
                var _key=response.machinekey;   //"123456789";
                var _signCode="789649779a49df79sad7fa9sd87";
                var _time= Math.round(new Date().getTime()/1000).toString();
                var xmlHttp = null;
                var _dataOpts = {
                    "Header":{
                        "SourceType": _SourceType,
                        "UserTicket": _UserTicket,
                        "SignCode": _signCode,
                        "machineKey":_key,
                        "timeStamp":_time,
                        "version":response.version
                    },
                    "Body": opt.data
                };
                opt.data = _dataOpts;
                return $.ajax(opt);
            })
        })
	};
//	this.ajax=function(opt){      
//          opt = opt || {};
//          opt.method = opt.method.toUpperCase() || 'POST';
//          opt.url = opt.url || '';
//          opt.async = opt.async;
//          opt.data = opt.data || null;
//          opt.success = opt.success || function () {};
//          var _SourceType=1;              
//          var _UserTicket="61D79AA77D90B248B665DD57BE9F70C6C30E0959BAF0F751E669F10B3FD681DC63BBFD6F33153572";;
//          var _key="123456789";
//          var _signCode="789649779a49df79sad7fa9sd87";
//          var _time= Math.round(new Date().getTime()/1000).toString();
//          var xmlHttp = null;
//          var _dataOpts = {
//              "Header":{
//                  "SourceType": _SourceType,
//                  "UserTicket": _UserTicket,
//                  "SignCode": _signCode,
//                  "machineKey":_key,
//                  "timeStamp":_time,
//                  "version":4.0
//              },
//              "Body": opt.data
//          };
//          opt.data = _dataOpts;
//          return $.ajax(opt);
//      
//	};
	this.GetRequest=function(){
		var url = location.search; //获取url中"?"符后的字串 
		var theRequest = new Object(); 
		if (url.indexOf("?") != -1) { 
			var str = url.substr(1); 
			strs = str.split("&"); 
			for(var i = 0; i < strs.length; i ++) { 
				theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
			} 
		} 
		return theRequest; 
	};
	
};
module.exports.ajaxCommon=ajaxCommon;
