(function(){

	var busquedaFactory = function($http,$q){
		return {
				busquedaPersonaje:function(url){

					return $http.get(url);
				},
				busquedaComics:function(comics){

					return $q.all(comics);
				}
				,
				busquedaSeries:function(serie){

					return $q.all(serie);
				}
		}


	}


	var modulo = angular.module("heroes");
	modulo.factory("busquedaFactory", busquedaFactory)
}());