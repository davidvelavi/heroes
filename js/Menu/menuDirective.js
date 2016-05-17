(function(){

	var menuShow = function(){
		return{
			link:function(scope,ele,attrs){
				$(ele).on("click",function(){
					$(this).toggleClass("is-Active");
					$(".Navegacion").toggleClass("is-Active");
				});
			}
		}
	}


	var modulo = angular.module("heroes");
	modulo.directive("menuShow",menuShow);
}());


(function(){

	var menu = function(){
		return{
			link:function(scope,ele,attrs){
				$body = $("body").hammer();

				$body.on("panLeft",function(){
					$(ele).addClass("is-Active")
				})
			}
		}
	}


	var modulo = angular.module("heroes");
	modulo.directive("menu",menu);
}());
