<template>
	<div class="vendorsConcer">
		<!--关注的厂商信息-->
		<div class="vendorsDirtory" v-show="showHeader">
			以下厂商您曾经关注过，请选择您要关联的厂商，关联后可查看厂商智能产品目录
		</div>
		<!--关注的厂商-->
		<div class="vendorsName">
			<li v-for="item in brandIdInfo">
				<span @click="goBrandUrl(item.brandUrl)"><img v-bind:src="item.brandLogo"/></span>
				<span @click="goBrandUrl(item.brandUrl)">{{item.brandName}}</span>
				<span :class="{concerAfter:(item.dataType==2?true:false),concerBefore:(item.dataType==1?true:false)}" @click="cancel(item.brandId,item.dataType)">{{item.dataType==2?"已关联":""}}{{item.dataType==1?"未关联":""}}</span>
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
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	var ajaxCommon=require("../config/base/common").ajaxCommon;	
	var getData=new ajaxCommon();
	var resourceUrl=process.env.apiDomain;
	export default{
		name: 'vendorsConcer',
		data(){
			return{
				imgUrl:"icon_clickstar.png",
				brandIdInfo:[],
				concer:{},
				brandId:"",
				type:"",
				isUpdate:false,
				urls:window.location.href,
				showBrandId:false,
				showHeader:true,
			}
		},
		mounted(){
			var _this=this;	
			_this.getDatas(resourceUrl+"/usercenter/getbrandsbyuid",{"dataType":0});
		},
		beforeCreate(){	
			Indicator.open();
			getData.isInit();
			
			getData.setupWebViewJavascriptBridge(function(bridge) {
				bridge.callHandler('native_SetTitle', "关注的智能产品目录", function(response) {
				});
			});
		},
		updated(){
			var _this=this;
			if(_this.isUpdate){
				_this.getDatas(resourceUrl+"/usercenter/getbrandsbyuid",{"dataType":0});
				_this.isUpdate=false;
			}		
		},
		methods:{
			cancel(id,type){
				var _this=this;
				if(type==1){				
					_this.isConcer(resourceUrl+"/usercenter/relationbrand",{"brandIds":id,"type":type});					
					_this.getDatas(resourceUrl+"/usercenter/getbrandsbyuid",{"dataType":0});
					_this.isUpdate=true;
					
				}else{
					MessageBox.confirm('', {
		                message: '取消关联后,将不可查看厂商智能目录<br/>确定取消关联吗？',
		                confirmButtonText: '是',
		                cancelButtonText: '否'
		            }).then(action => {
		                if (action == 'confirm') {		                	
			                _this.isConcer(resourceUrl+"/usercenter/relationbrand",{"brandIds":id,"type":type});							
		                	_this.getDatas(resourceUrl+"/usercenter/getbrandsbyuid",{"dataType":0});
		                	_this.isUpdate=true;
		                }           
		            }).catch(err => {
		                if (err == 'cancel') {	                    
		                }
		            });			            
				}	
			},
			getDatas(postUrl,postData){
				var _this=this;
				var getData=new ajaxCommon();
				getData.ajax({
					method:"POST",
					url:postUrl,
					dataType:"JSON",
					data:postData,
					success:function(data){
						if(data.Body==""){
							_this.showBrandId=true;
							_this.showHeader=false;
							setTimeout(function(){
								Indicator.close();
							},500)
						}else{
							_this.brandIdInfo=data.Body;
							setTimeout(function(){
								Indicator.close();
							},500)
						}
					}
				},true);			
			},
			isConcer(postUrl,postData){
				var _this=this;
				var getData=new ajaxCommon();
				getData.ajax({
					method:"POST",
					url:postUrl,
					dataType:"JSON",
					data:postData,
					success:function(data){
						if(data.Header.ErrorCode==0&&postData.type==1){
							var instance=Toast('关联成功');
							setTimeout(() => {
							  instance.close();
							}, 500);
						}
					}
				});	
			},
			goBrandUrl(brandUrl){
				Indicator.open();
				var url="//"+brandUrl+"/h5/#!/?appType=2";
				window.location.href=url;
				Indicator.close();
			},
			
		}	
	}
</script>

<style>
@import url("../assets/css/reset.css");
@import url("../assets/css/vendorsConcer/vendorsConcer.css");
</style>