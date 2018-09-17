<template>
	<div class="noConcerShop">
		<div class="noConcerFactory">
			<div class="noConcerImg">
				<span></span>
			</div>
			<div class="noConcerText">
				<span>您还没有关注任何厂商</span>
			</div>
			<div class="noConcerGoUrl">
				<span>可通过电脑访问网站：www.51cjml.com查看厂商并登录注册</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	export default{
		name:"noConcerShop",
		beforeCreate(){	
			Indicator.open();
			setTimeout(function(){
				Indicator.close();
			},1000)
		},
	}
</script>

<style>
	@import url("../assets/css/reset.css");
	@import url("../assets/css/noConcerShop/noConcerShop.css");
</style>