<template>
	<div class="aboutUs">
		<!--关于我们的logo-->
		<div class="brandLogoInfo">
			<div class="autoBrandLogo">
				<img src="../assets/images/aboutUs/storeLogo.png"/>
			</div>
			<div class="version" >
				<p>智配Store</p>
				<p>V{{version}}</p>
				<p>使用iphone 6 或安卓系统5.0、处理器四核，后置摄像头1200万像素以上设备，识别效果更佳。</p>
			</div>			
		</div>
		<div class="erCode">
			<img src="../assets/images/aboutUs/erweima.png" />
		</div>
		<div class="erCodeTit">
			<span>VIN码扫描APP是一款基于OCR技术的采集解析Vin码(车架号)的软件，轻轻一扫，就可获得车辆的相关信息，简单、便捷。</span>
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	var ajaxCommon=require("../config/base/common").ajaxCommon;
	var getData=new ajaxCommon();
	export default{
		name: 'aboutUs',
		data(){
			return{	
				version:"",
			}
		},	
		beforeCreate(){	
			var _this=this;
			Indicator.open();			
			getData.isInit();			
			getData.setupWebViewJavascriptBridge(function(bridge) {
				bridge.callHandler('native_SetTitle', "关于我们", function(response) {
				});
				bridge.callHandler('native_GetVersion', "", function(response) {					
					_this.version=response;					
					
				});
			});
		},
		mounted(){
			setTimeout(function(){
				Indicator.close();
			},500)
		},
		methods:{			
		}
	}
</script>

<style>
	@import url("../assets/css/reset.css");
	@import url("../assets/css/aboutUs/aboutUs.css");
</style>