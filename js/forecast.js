
(function () {	
	'use strict';
	
	var _forecast = {}
	
	_forecast.getForecastDay = function (params) {
		var forecastDate 	=  new Date(params.dt * 1000);
		var formattedDate 	= forecastDate.getMonth() + "/" + forecastDate.getDate() + "/" + forecastDate.getFullYear();
	
		return $("<td class='forecastDay'>"
		+ "	<div class='forecastDate'>" + formattedDate + "</div>"
		+ "	<center><img src='http://openweathermap.org/img/w/" + params.icon + ".png'></center>"
		+ "	<center><p>Temperature</p></center><hr>"
		+ "	<div>"
		+ "		<div><strong>Day:</strong> " + Math.floor(params.temp.day) + "<span>°C</span></div>"
		+ "		<div><strong>Evening:</strong> " + Math.floor(params.temp.eve) + "<span>°C</span></div>"
		+ "		<div><span class='max'>Max:</span> " + Math.floor(params.temp.max) + "<span>°C</span></div>"
		+ "		<div><span class='min'>Min:</span> " + Math.floor(params.temp.min) + "<span>°C</span></div>"
		+ "		<div><strong>Morning:</strong> " + Math.floor(params.temp.morn) + "<span>°C</span></div>"
		+ "		<div><strong>Night:</strong> " + Math.floor(params.temp.night) + "<span>°C</span></div>"
		+ "	</div>"
		+ "</td>");
	};		
	
	_forecast.getForecast = function (params) {
		var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q={{city}},{{countryCode}}&units=metric&mode=json&cnt={{days}}';
		url = url.replace(/{{city}}/g, params.city);
		url = url.replace(/{{countryCode}}/g, params.countryCode);
		url = url.replace(/{{days}}/g, params.days);
		
		$.ajax({
		   type: 'GET',
			url: url,
			async: false,
			contentType: "application/json",
			dataType: 'jsonp'
		}).then(function(results) {
				$('#forecastTr').empty();
				$.each(results.list, function( index, value ) {
				
				  var forecastDay = _forecast.getForecastDay( {dt: value.dt, temp: value.temp, icon: value.weather[0].icon} );
				  forecastDay.appendTo($('#forecastTr'));
				});				
			}			
		);	
	};
	
	
	_forecast.submitForcast = function () {
		var city 		= ($("#txtCity").val()) ? $("#txtCity").val() : 'Toronto';
		var countryCode = ($("#txtCountryCode").val()) ? $("#txtCountryCode").val() : 'CA';
		
		_forecast.getForecast( { city: city, countryCode: countryCode, days: 7 } );	
	};
		
	window.forecast = window.forecast || _forecast;
})();
