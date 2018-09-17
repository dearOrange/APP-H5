<template>
	<div class="concerShop">
		<!--查看智能厂商目录-->
		<div class="directory">
			<span>以下厂商您曾关注过，请选择您要关联的厂商，关联后可查看厂商智能目录</span>
		</div>
		<!--品牌展示-->
		<div class="brandDisplay">
			<li v-for="(item,index) in allBrandLogos" v-on:click="selected($event,item.brandUrl,item.dataType,item.brandId)">
				<a href="javascript:;">
					<img :src="item.brandLogo" alt="" />
				</a>
			</li>
		</div>
		<!--<div style="font-size:0.3rem">{{urls}}</div>-->
		<!--是否关联-->
		<div class="isNeedConcer">
			<div class="needConcer isNoAdd" :class="{isAdd:classAdd}" v-show="isview" @click="isConcered">
				确定关联
			</div>
			<div class="noNeedConcer" v-show="isviews">
				<div class="noNeedConcer_left" @click="noConcered">残忍拒绝</div>
				<div class="noNeedConcer_right" @click="isConcered">确定关联</div>
			</div>
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
		name: 'concerShop',
		data(){
			return{
				allBrandLogos:[],
				carInfos:[],
				brandId:"",
				vinData:{},
				vin:Request["v"],
				logId:Request["logId"],
				userTicket:Request["userTicket"],
				isview:false,
				isviews:false,
				isviewvalue:Request["isview"],
				type:"",
				classAdd:false,
				urls:window.location.href,
			}
		},
		methods:{
			selected(event,brandUrl,type,id){			
				if($(event.currentTarget).attr("class")==""||$(event.currentTarget).attr("class")==undefined){
					$(event.currentTarget).addClass("selected");
				}else{
					$(event.currentTarget).removeClass("selected");
				}
				this.brandId=id;
				this.type=type;
				this.classAdd=true;
			},
			isConcered(){
				var _this=this;
				if(_this.type==1){
					_this.isConcer(resourceUrl+"/usercenter/relationbrand",{"brandIds":_this.brandId,"type":_this.type});

				}else{	
	                _this.isConcer(resourceUrl+"/usercenter/relationbrand",{"brandIds":_this.brandId,"type":_this.type});							
         	
				}
				
				
				setTimeout(function(){
					getData.setupWebViewJavascriptBridge(function(bridge) {
							
			            bridge.callHandler('native_JumpAPP', {page:"Home"}, function(response) {

		                })
			        })
				},500)
			},
			noConcered(){
				var _this=this;
				if(_this.type==1){
					_this.isConcer(resourceUrl+"/usercenter/relationbrand",{"brandIds":_this.brandId,"type":_this.type});
				}else{
	                _this.isConcer(resourceUrl+"/usercenter/relationbrand",{"brandIds":_this.brandId,"type":_this.type});								            	
				}
				
				setTimeout(function(){
					getData.setupWebViewJavascriptBridge(function(bridge) {
		            	bridge.callHandler('native_JumpAPP', {page:"Home"}, function(response) {
	                })
		        })
				}, 500);			
				
			},
			getDatas(postUrl,postData){
				var _this=this;
				getData.ajax({
					method:"POST",
					url:postUrl,
					dataType:"JSON",
					data:postData,
					success:function(data){	
						_this.allBrandLogos=data.Body;
						if(data.Body.length==0){
							getData.setupWebViewJavascriptBridge(function(bridge) {
					            	bridge.callHandler('native_JumpAPP', {page:"Home"}, function(response) {
				                })
					        })
						}
					}
				});			
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
					},
					
				});	
			}
		},
		beforeCreate(){	
			Indicator.open();
			setTimeout(function(){
				Indicator.close();
			},1000)
			getData.setupWebViewJavascriptBridge(function(bridge) {
				bridge.callHandler('native_SetTitle', "关联厂商品牌", function(response) {
				});
			});
		},
		mounted(){
			var _this=this;	
			_this.getDatas(resourceUrl+"/usercenter/getbrandsbyuid",{"dataType": 1});
			if(_this.isviewvalue==0){
				_this.isview=true;
			}
			if(_this.isviewvalue==1){
				_this.isviews=true;
			}
			
		}
	}
</script>

<style>
	@import url("../assets/css/reset.css");
	@import url("../assets/css/concerShop/concerShop.css");
</style>