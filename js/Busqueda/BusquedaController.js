(function(){

	var BusquedaController = function($scope,busquedaFactory,$http){
		$scope.series = [{name:'avengers'},
							{name:'fantastic four'},
							{name:'hulk'},
							{name:'iron man'},
							{name:'thor'},
							{name:'peter parker'}
						];
		//console.log(Date())
		var ts="?ts=16:26:30";
		var url = "http://gateway.marvel.com:80/v1/public/characters?name=";
		var clave = "&apikey=0cdf30383014ad1a8efffdf602784007";
		var hash = "&hash=7c9f8e2ab3a58de3dd6bf02ffdbcfd73";
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
				busquedaFactory.busquedaPersonaje(url+serie+ts+clave+hash).success(function(resp){
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
							for(var j = 0; j< comic.length; j++)
							{
								arregloComics.push($http.get(comic[j].resourceURI+ts+"?"+"apikey=0cdf30383014ad1a8efffdf602784007"+hash));
							}
							for(var j = 0; j< serie.length; j++)
							{
								arregloSeries.push($http.get(serie[j].resourceURI+ts+"?"+"apikey=0cdf30383014ad1a8efffdf602784007"+hash));
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