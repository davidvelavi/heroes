(function(){

	var abrir = function(){

		return{

			link:function(scope,ele,attrs){
				$(ele).on("click",function(){
					$(this).toggleClass("Active");
					$(this).next().toggleClass("Hide");
				})
			}	
		}
	}


	var modulo = angular.module("heroes");
	modulo.directive("abrir",abrir);
}());