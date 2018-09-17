<template>
	<div class="selectShop">
		<!--车型品牌信息-->
		<div class="carInfo">
			<div class="brandLogo">
				<img :src="autoBrandLogo" />
			</div>
			<div class="vehicleInfo">
				<p>车架号：{{vinCode}}</p>
				<b></b>
				<p>{{autoBrandName}}<span>{{autoModelName}}</span>{{autoModelSubName}}</p>
			</div>
		</div>
		<!--查看智能厂商目录-->
		<div class="directory" v-show="isShowBrandId">
			<span>查看厂商智能产品目录</span> 
		</div>
		<!--品牌展示-->
		<div class="brandDisplay" v-show="isShowBrandId">
			<li v-for="item in allBrandLogos" @click="selected(item.brandUrl,item.dataType,item.brandId)">
				<dl>
					<dt><img :src="item.brandLogo" alt="" /></dt>
					<dd>{{item.viewBrandName}}</dd>
				</dl>
			</li>
		</div>
		<!--无品牌时的展示-->
		<div class="noConcerFactory" v-show="showBrandId">
			<div class="noConcerImg">
				<span></span>
			</div>
			<div class="noConcerText">
				<span>您未关联任何一个品牌厂商智能目录<br />无法适配扫码结果</span>
			</div>
			<div class="noConcerGoUrl">
				<fieldset>
					<legend>如何关联品牌厂商智能目录？</legend>
					<div class="showProgess">
						<p>第一步：进入品牌厂商微信公众号 如："意奔玛"微信公众号</p>
						<p>第二步：点击底部菜单"产品目录/产品查询"进入智能目录页面  </p>
						<p>第三步：点击右上角<b></b>图标，用手机号进行注册</p>
						<p>第四步：返回扫码APP"智配Store"进行操作</p>
					</div>
				</fieldset>			
			</div>
				
		</div>
		<!--无数据时的展示-->
		<div class="isNodata" v-show="noDatashow">
			<div></div>
			<p class="tits">暂未解析出车型数据</p>
			<p>识别结果可能有误，请仔细核对识别结果与图片数据是否一致</p>
		</div>
	</div>
		
		
</template>

<script>
	import { Indicator } from 'mint-ui';
	var ajaxCommon=require("../config/base/common").ajaxCommon;
	var getData=new ajaxCommon();
	var resourceUrl=process.env.apiDomain;
	var Request = new ajaxCommon(); 
	Request =Request.GetRequest();
	export default{
		name: 'selectShop',
		data(){
			return{
				allBrandLogos:[],
				carInfos:[],
				brandId:"",
				vin:Request["v"],
				urls:window.location.href,
				showBrandId:false,
				isShowBrandId:true,
				noDatashow:false,
				autoBrandLogo:"",
				vinCode:"",
				autoBrandName:"",
				autoModelName:"",
				autoModelSubName:"",
				brandIdData:[],
			}
		},
		methods:{		
			selected(brandUrl,type,id){
				Indicator.open();
				this.brandId=id;
				var url="//"+brandUrl+"/h5/#!/vin?v="+this.vin+"&appType="+type;
				window.location.href=url;
				Indicator.close();
			},
			getDatas(postUrl,postData){
				var _this=this;
				getData.ajax({
					method:"POST",
					url:postUrl,
					dataType:"JSON",
					data:postData,
					async:false, 
					success:function(data){						
						if(data.Body==""&&_this.brandIdData!=null){
							_this.showBrandId=true;
							_this.isShowBrandId=false;
						}else{
							_this.allBrandLogos=data.Body;
						}											
					}
				});			
			},
			getVinData(postUrl,postData){
				var _this=this;
				getData.ajax({
					method:"POST",
					url:postUrl,
					dataType:"JSON",
					data:postData,
					async:false,  
					success:function(data){
						_this.brandIdData=data.Body
						if(data.Body==null&&_this.allBrandLogos==""){
							_this.vinCode=_this.vin;
							_this.noDatashow=true;
							_this.showBrandId=false;
							_this.isShowBrandId=false;
							setTimeout(function(){
								Indicator.close();
							},500)
						}else{
							_this.autoBrandLogo=data.Body.autoBrandLogo;
							_this.vinCode=data.Body.vinCode;
							_this.autoBrandName=data.Body.autoBrandName;
							_this.autoModelName=data.Body.autoModelName;
							_this.autoModelSubName=data.Body.autoModelSubName;
							setTimeout(function(){
								Indicator.close();
							},500)							
						}				
					}
				});					
			}
		},
		beforeCreate(){	
			var _this=this;
			Indicator.open();
			setTimeout(function(){
				Indicator.close();
			},500)
			getData.isInit();			
			getData.setupWebViewJavascriptBridge(function(bridge) {	
				bridge.callHandler('native_SetTitle', "选择智能产品目录", function(response) {
				});			
			});		
		},
		mounted(){
			var _this=this;	
			_this.getVinData(resourceUrl+"/auto/getautoinfobyvin",{"vinCode": _this.vin});
			_this.getDatas(resourceUrl+"/usercenter/getbrandsbyuid",{"dataType": 2});
			

		}
	}
	
	
</script>
<style>
	@import url("../assets/css/reset.css");
	@import url("../assets/css/selectShop/selectShop.css");
</style>