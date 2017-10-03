mainApp.controller("geoCtrl",function($scope,$http){
	    if(navigator.geolocation){
		  navigator.geolocation.getCurrentPosition(function(position){
		    $scope.$apply(function(){
			  $scope.lat = position.coords.latitude;
			  $scope.lon = position.coords.longitude;
			  
			  var url = "https://fcc-weather-api.glitch.me/api/current";
			  var config = {params: {lat: $scope.lat, lon: $scope.lon}}
			  $http.get(url,config).
			  then(function(response){
			    $scope.weather = response.data;
				$scope.label = "C"
				
				$scope.weather.visibility = $scope.weather.visibility/ 1000;
				$scope.getFar = function(){
				  var cel = $scope.weather.main.temp;
				  var far = (((cel * 9)/5) + 32);
				  
				  if ($scope.label != "F"){
				    $scope.weather.main.temp = ((cel * 9)/5) + 32;
					$scope.label = "F";
				  }
				  
				  $scope.farbutton = {
				    'background' : '#FEFEFE',
					'color' : '#1497E2'
				  }
				  $scope.celbutton = {
				    'background' : 'none',
					'color' : '#FEFEFE'
				  }
				}
				
				$scope.getCel = function(){
				  if ($scope.label != "C"){
				    $scope.weather.main.temp = (($scope.weather.main.temp - 32) * 5) / 9;
					$scope.label = "C";
				  }
				  
				  $scope.celbutton = {
				    'background' : '#FEFEFE',
					'color' : '#1497E2'
				  }
				  
				  $scope.farbutton = {
				    'background' : 'none',
					'color' : '#FEFEFE'
				  }
				}
				
			  });
			});
		  });
		}
	  });