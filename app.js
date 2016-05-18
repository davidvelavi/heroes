var modulo = angular.module("heroes",["ui.router",'angular-md5']);



(function(){

	var BusquedaController = function($scope,busquedaFactory,$http,md5){
		$scope.series = [{name:'avengers'},
							{name:'fantastic four'},
							{name:'hulk'},
							{name:'iron man'},
							{name:'thor'},
							{name:'peter parker'}
						];

		var d = new Date();
		var n = Math.round(Date.now()/1000);
		var ts="?ts="+n;
		var url = "http://gateway.marvel.com:80/v1/public/characters"+ts+"&name=";
		var priv = "7e467f50bbd57233bae233db88606e9f220f7674";
		var publica = "0cdf30383014ad1a8efffdf602784007";
		var clave = "&apikey=0cdf30383014ad1a8efffdf602784007";

		var hash = "&hash="+md5.createHash(n+priv+publica);
		console.log(hash)
		$scope.SerieMarvel = [];
		var serieMarvel = {};
		$scope.comicsDavid = [];
		$scope.serieDavid = [];
		$scope.VisualizarLoader1 = false;
		$scope.ShowMensaje = false;
		$scope.mostrarSugerencia = false;
		$scope.VisualizarLoaderComic = false;
		$scope.ShowSugerencia = function(){
			$scope.mostrarSugerencia = $scope.mostrarSugerencia ==true ? $scope.mostrarSugerencia=false : $scope.mostrarSugerencia=true;
		}
		$scope.Elegido = function(serie){
			$scope.serie = serie;
			$scope.Peticion(serie)
		}

		$scope.Peticion = function(serie){
			if(serie.length > 3)
			{
				$scope.VisualizarLoader1 = true;
				$scope.ShowMensaje = false;
				console.log(url+serie+ts+clave+hash)
				busquedaFactory.busquedaPersonaje(url+serie+clave+hash).success(function(resp){
					//console.log(resp)
					$scope.SerieMarvel = [];
					if(resp.data.count > 0)
					{
							var item = resp.data.results[0];
							serieMarvel.nombreSerie = serie;
							serieMarvel.imagen = item.thumbnail.path +"."+item.thumbnail.extension;
							serieMarvel.descripcion = item.description || "-";
							serieMarvel.titulo = item.name || "-";
							$scope.SerieMarvel.push(serieMarvel);
							serieMarvel = {};
							var arregloComics= [];
							var arregloSeries= [];
							var comic = item.comics.items;
							var serie = item.series.items;
							$scope.VisualizarLoader1 = false;
							$scope.ShowMensaje = false;
							console.log(comic[0].resourceURI.split("comics"))
							for(var j = 0; j< comic.length; j++)
							{
								var ruta = comic[j].resourceURI.split("comics");
								var rutaUrl =ruta[0]+"comics"+ruta[1]+ts+"&"+"apikey=0cdf30383014ad1a8efffdf602784007"+hash;

								arregloComics.push($http.get(rutaUrl));
							}

							for(var j = 0; j< serie.length; j++)
							{
								arregloSeries.push($http.get(serie[j].resourceURI+"?"+"apikey=0cdf30383014ad1a8efffdf602784007"+hash));
							}

							busquedaFactory.busquedaComics(arregloComics).then(function(comics){
								//console.log(comics[0].data.data.results[0])
								
								for(var i = 0; i<comics.length; i++)
								{
									var detalleObj = {};
									var detalleComic = comics[i].data.data.results[0];
									
									detalleObj.imagen = detalleComic.thumbnail.path+"."+detalleComic.thumbnail.extension;
									detalleObj.titulo = detalleComic.title;
									$scope.comicsDavid.push(detalleObj);
								}
																
							})
							busquedaFactory.busquedaSeries(arregloSeries).then(function(series){
								//console.log("series",series);
								for(var i = 0;i<series.length;i++)
								{
									var detalleSerieObj = {};
									var detalleSerie = series[i].data.data.results[0];
									//console.log("detalleSerie",detalleSerie)
									detalleSerieObj.imagen = detalleSerie.thumbnail.path+"."+detalleSerie.thumbnail.extension;
									detalleSerieObj.titulo = detalleSerie.title;
									$scope.serieDavid.push(detalleSerieObj);
								}
							});
					}
					else{
						$scope.VisualizarLoader1 = false;
						$scope.ShowMensaje = true;
						$scope.Mensaje = "Personaje no encontrado"
					}

				}).error(function(error){
					console.log("error")
				})

			}
		}

		


	}


	var modulo = angular.module("heroes");
	modulo.controller("BusquedaController",BusquedaController);
}());
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