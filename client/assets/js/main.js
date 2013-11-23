//Main js
function gmap(){
	var styles0 = [
		{
			stylers: [
			{ hue: "00ffe6" }, 
			{ saturation: -20 }
			]
		},{
			featureType: "road",
			elementType: "geometry",
			stylers: [
			{ lightness: 100 },
			{ visibility: "simplified" }
			]
		},{
			featureType: "road",
			elementType: "labels",
			stylers: [
			{ visibility: "on" }
			]
		},{
			featureType: "poi",
			elementType: "labels",
			stylers: [
			{ visibility: "on" }
			]
		}

	];

	var styles01 = [
		{
			stylers: [
			{ hue: "393c40" }, 
			{ saturation: -20 }
			]
		},{
			featureType: "road",
			elementType: "geometry",
			stylers: [
			{ lightness: 100 },
			{ visibility: "simplified" }
			]
		},{
			featureType: "road",
			elementType: "labels",
			stylers: [
			{ visibility: "on" }
			]
		},{
			featureType: "poi",
			elementType: "labels",
			stylers: [
			{ visibility: "on" }
			]
		}

	];

	var styles2 = [
	{
		featureType: 'water',
		elementType: 'geometry',
		stylers: [
			{ hue: '#43576f' },
			{ saturation: -45 },
			{ lightness: -54 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'road',
		elementType: 'geometry',
		stylers: [
			{ hue: '#000000' },
			{ saturation: -100 },
			{ lightness: -100 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'road.arterial',
		elementType: 'geometry',
		stylers: [
			{ hue: '#5b7ab5' },
			{ saturation: -62 },
			{ lightness: -31 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'landscape',
		elementType: 'all',
		stylers: [
			{ hue: '#393c40' },
			{ saturation: -79 },
			{ lightness: -73 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'landscape.man_made',
		elementType: 'all',
		stylers: [
			{ hue: '#cccccc' },
			{ saturation: -100 },
			{ lightness: -10 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'poi',
		elementType: 'all',
		stylers: [
			{ hue: '#666666' },
			{ saturation: -100 },
			{ lightness: -49 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'transit',
		elementType: 'all',
		stylers: [
			{ hue: '#bb1749' },
			{ saturation: 78 },
			{ lightness: -45 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'water',
		elementType: 'all',
		stylers: [

		]
	}
];
			     
var styles = [
	{
		featureType: 'water',
		elementType: 'geometry',
		stylers: [
			{ hue: '#43576f' },
			{ saturation: -45 },
			{ lightness: -54 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'landscape',
		elementType: 'geometry',
		stylers: [
			{ hue: '#393c40' },
			{ saturation: -79 },
			{ lightness: -73 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'landscape.man_made',
		elementType: 'geometry',
		stylers: [
			{ hue: '#cccccc' },
			{ saturation: -100 },
			{ lightness: -10 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'poi',
		elementType: 'all',
		stylers: [
			{ hue: '#666666' },
			{ saturation: -100 },
			{ lightness: -49 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'administrative',
		elementType: 'all',
		stylers: [
			{ hue: '#393c40' },
			{ saturation: 6 },
			{ lightness: -53 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'road',
		elementType: 'geometry',
		stylers: [
			{ hue: '#08314b' },
			{ saturation: -19 },
			{ lightness: -75 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'transit',
		elementType: 'geometry',
		stylers: [
			{ hue: '#ba1747' },
			{ saturation: 78 },
			{ lightness: -45 },
			{ visibility: 'on' }
		]
	}
];			    
	// Create a new StyledMapType object, passing it the array of styles,
	// as well as the name to be displayed on the map type control.
	var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

	/* Lat. and Lon. of the center of the map */
	var myCenter = new google.maps.LatLng(45.463551, 9.188570);
			  
	// Create a map object, and include the MapTypeId to add
	// to the map type control.
	var mapOptions = {
		zoom: 12, 				//zoom level
		center: myCenter, 		//center position
		scrollwheel: false, 	//zoom when scroll disable
		zoomControl: true, 		//show control zoom

		mapTypeControlOptions: {
		  mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style'] 
		}
	};

	var map = new google.maps.Map(document.getElementById('gmap'),mapOptions);

	//Associate the styled map with the MapTypeId and set it to display.
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');
}

google.maps.event.addDomListener(window, 'load', gmap);



