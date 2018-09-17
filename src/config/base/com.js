function ajaxCommon(){
	var _this=this;
	this.ajax=function(opt){
		console.log(opt)
		opt = opt || {};
	    opt.method = opt.type.toUpperCase() || 'POST';
	    opt.url = opt.url || '';
	    opt.async = opt.async || true;
	    opt.data = opt.data || null;
	    opt.success = opt.success || function () {};
		var _SourceType=1;
		var _UserTicket="7F29D1388E2971FFD8D54E53CFED78CD3CBB0A3CFB72823F305DD1003027E8AD3915F1DCE7ABA765";
		var _key="uJnudhJUkmGKFSuT";
		var arr=[];
		var newArr=[];
		var obj={a:"1",b:"2"}
		console.log(JSON.stringify(obj))
		for(var key in opt.data){
			var jsonstr="";
			arr.push(key); 
		}
		for(var i in arr){
			var jsonstr=opt.data[arr[i]];
//			console.log(JSON.stringify(opt.data[arr[i]]))
			console.log(opt.data[arr[i]]);
//			var data = JSON.stringify(jsonstr);
			
//			console.log(eval(jsonstr))
//			console.log(JSON.stringify(jsonstr));
		}
		
//		for(var key in _attachedData){
//			var jsonstr="";
//      	if(typeof _attachedData[key]=="object"){
//      		var _attached=JSON.stringify(objKeySort(_attachedData[key]));       		
//      		jsonstr=_attached;
//      	}else{
//      		jsonstr=_attachedData[key];          		
//      	}
//      	if(jsonstr!=null&&jsonstr!=""){
//      		var jsonstrdata=key+"="+jsonstr3;
//      		arr.push(jsonstrdata)
//      	}       	
//		}
//		var _attachedDatas=arr.join("&");
//		var new_attachedData=_attachedDatas+_key;
//		var __SignCode = _this.hexMd5(new_attachedData);
//		var xmlHttp = null;
//      if (XMLHttpRequest) {
//          xmlHttp = new XMLHttpRequest();
//      }
//      else {
//          xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
//      }
//      var dataOut={
//      		Header:{
//					SourceType: _SourceType,
//					UserTicket:_UserTicket,
//					SignCode:_signCode
//				},
//				Body:opt.data
//      };
//      var params = [];
//      var paras=[];
//      for (var key in dataOut.Header){
//          params.push(key + '=' + dataOut.Header[key]);
//      }
//      for (var key in dataOut.Body){
//          paras.push(key + '=' + dataOut.Body[key]);
//      }
//      var postData = params.join('&')+"&"+paras.join('&');
//      if (opt.method.toUpperCase() === 'POST') {
//           xmlHttp.open(opt.method, opt.url, opt.async);
//           xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
//           xmlHttp.send(postData);
//       }
//       else if (opt.method.toUpperCase() === 'GET') {
//           xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
//           xmlHttp.send(null);
//       } 
//       xmlHttp.onreadystatechange = function () {
//           if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
//               opt.success(xmlHttp.responseText);
//           }
//       };
//		
	};
//	this.objKeySort=function(arys){
//		//先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
//      var newkey = Object.keys(arys).sort();　　 
////      var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
////      for(var i = 0; i < newkey.length; i++) {
////          //遍历newkey数组
////          newObj[newkey[i]] = arys[newkey[i]]; 
////          //向新创建的对象中按照排好的顺序依次增加键值对
////      }
////      return newObj; 
//	};
	
	
//	var hexcase = 0;
//  var chrsz = 8;
//  this.hexMd5 = function (s) {
//      return binl2hex(core_md5(str2binl(s), s.length * chrsz));
//  };
//  function str2binl(str) {
//      var bin = Array();
//      var mask = (1 << chrsz) - 1;
//      for (var i = 0; i < str.length * chrsz; i += chrsz)
//          bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
//      return bin;
//  }
//  function binl2hex(binarray) {
//      var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
//      var str = "";
//      for (var i = 0; i < binarray.length * 4; i++) {
//          str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
//              hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
//      }
//      return str;
//  }
//  function md5_cmn(q, a, b, x, s, t) {
//      return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
//  }
//  function md5_ff(a, b, c, d, x, s, t) {
//      return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
//  }
//  function md5_gg(a, b, c, d, x, s, t) {
//      return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
//  }
//  function md5_hh(a, b, c, d, x, s, t) {
//      return md5_cmn(b ^ c ^ d, a, b, x, s, t);
//  }
//  function md5_ii(a, b, c, d, x, s, t) {
//      return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
//  }
//  function safe_add(x, y) {
//      var lsw = (x & 0xFFFF) + (y & 0xFFFF);
//      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
//      return (msw << 16) | (lsw & 0xFFFF);
//  }
//  function bit_rol(num, cnt) {
//      return (num << cnt) | (num >>> (32 - cnt));
//  }
//  function core_md5(x, len) {
//      /* append padding */
//      x[len >> 5] |= 0x80 << ((len) % 32);
//      x[(((len + 64) >>> 9) << 4) + 14] = len;
//
//      var a = 1732584193;
//      var b = -271733879;
//      var c = -1732584194;
//      var d = 271733878;
//
//      for (var i = 0; i < x.length; i += 16) {
//          var olda = a;
//          var oldb = b;
//          var oldc = c;
//          var oldd = d;
//
//          a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
//          d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
//          c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
//          b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
//          a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
//          d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
//          c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
//          b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
//          a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
//          d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
//          c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
//          b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
//          a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
//          d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
//          c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
//          b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
//
//          a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
//          d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
//          c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
//          b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
//          a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
//          d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
//          c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
//          b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
//          a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
//          d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
//          c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
//          b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
//          a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
//          d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
//          c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
//          b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
//
//          a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
//          d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
//          c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
//          b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
//          a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
//          d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
//          c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
//          b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
//          a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
//          d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
//          c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
//          b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
//          a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
//          d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
//          c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
//          b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
//
//          a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
//          d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
//          c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
//          b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
//          a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
//          d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
//          c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
//          b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
//          a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
//          d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
//          c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
//          b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
//          a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
//          d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
//          c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
//          b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
//
//          a = safe_add(a, olda);
//          b = safe_add(b, oldb);
//          c = safe_add(c, oldc);
//          d = safe_add(d, oldd);
//      }
//      return Array(a, b, c, d);
//  }
	
	
};
module.exports.ajaxCommon=ajaxCommon;
