(function(){	


	var loader = function(){
		return {
			restrict:"E",
			templateUrl:"loader.html",
			scope:{
				visualiza:"=visualiza"
			}
		}
	}

	var modulo = angular.module("heroes");
	modulo.directive("loader",loader);
}());