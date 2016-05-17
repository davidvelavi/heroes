(function(){

	var rutas = function($stateProvider,$urlRouterProvider){
		$urlRouterProvider.otherwise("/heroe");
		$stateProvider
			.state("heroe",{
				url:"/heroe",
				templateUrl:"Buscador.html",
				controller:"BusquedaController"
			})
	}

	var modulo = angular.module("heroes");
	modulo.config(rutas);
}());