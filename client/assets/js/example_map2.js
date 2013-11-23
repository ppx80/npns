function initialize() {
			
			/* Style of the map */
			var styles = [
			{
		      stylers: [
		        { hue: "#00ffe6" },
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
		        { visibility: "off" }
		      ]
		    },{
		         featureType: "poi",
		         elementType: "labels",
		         stylers: [
		           { visibility: "off" }
		         ]
		       }
		
		     ];
		     
		    
		  // Create a new StyledMapType object, passing it the array of styles,
		  // as well as the name to be displayed on the map type control.
		  var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});
		  
		  /* Lat. and Lon. of the center of the map */
		  var myCenter = new google.maps.LatLng(52.540196, 13.406067);
		  
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
		  
		  var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
		
		  //Associate the styled map with the MapTypeId and set it to display.
		  map.mapTypes.set('map_style', styledMap);
		  map.setMapTypeId('map_style');
		  
		  
		  /* Marker Berlin */
		  var contentString = 
		      '<div class="popup">'+
		      '<h2 id="berlin">Berlin</h2>'+
		      '<p>Center of Berlin</b><br/>'+
		      '<small><b>Lat.</b> 52.520196, <b>Lon.</b> 13.406067</small></p>'+
		      '<a target="_blank" href="https://maps.google.it/maps?q=Hotel+Berlino,+Via+Giovanni+Antonio+Plana,+Milano,+MI&hl=it&sll=45.086854,9.328594&sspn=0.077082,0.181789&oq=berlino&hq=Hotel+Berlino,+Via+Giovanni+Antonio+Plana,+Milano,+MI&t=m&z=15">'+
		      'Watch the Full Screen Map &#187;</a> '+
		      '</div>';
		
		  var infowindow = new google.maps.InfoWindow({
		      content: contentString,
		      maxWidth: 230,
		      maxHeight: 300,
		
		  });
		  
		  var myLatlng = new google.maps.LatLng(52.520196, 13.406067);
		  var marker = new google.maps.Marker({
		      position: myLatlng,
		      map: map,
		      title: 'Uluru (Ayers Rock)'
		  });
		 
		  google.maps.event.addListener(marker, 'click', function() {
		    infowindow.open(map,marker);
		  });
		  
		 
		  
		  /* Marker MyPub */
		  var contentString1 = 
		      '<div class="popup">'+
		      '<h2> My Pub</h2>'+
		      '<p>Example Strasse n.1</b><br/>'+
		      '<small><b>Lat.</b> 52.520196, <b>Lon.</b> 13.406067</small></p>'+
		      '<a target="_blank" href="http://www.marchettidesign.net">'+
		      'Visit Web Site &#187;</a> '+
		      '</div>';
		      
		  var infowindow1 = new google.maps.InfoWindow({
		      content: contentString1,
		      maxWidth: 230,
		      maxHeight: 300,
		
		  });
		
		  var image1 = 'img/beer.png';
		  var myLatLng1 = new google.maps.LatLng(52.499307, 13.431816);
		  var marker1 = new google.maps.Marker({
		      position: myLatLng1,
		      map: map,
		      icon: image1
		  });
		  
		  google.maps.event.addListener(marker1, 'click', function() {
		    infowindow1.open(map,marker1);
		  });

		    /* Marker Ice Cream */
		  var image2 = 'img/ice-cream.png';
		  var myLatLng2 = new google.maps.LatLng(52.543437, 13.352719);
		  var marker2 = new google.maps.Marker({
		      position: myLatLng2,
		      map: map,
		      icon: image2
		  });
		  
		  /* Marker Food */
		  var image3 = 'img/food.png';
		  var myLatLng3 = new google.maps.LatLng(52.518439, 13.385124);
		  var marker3 = new google.maps.Marker({
		      position: myLatLng3,
		      map: map,
		      icon: image3
		  });
		  
		   /* Hide Markers when zoom <= 12 x */
		  google.maps.event.addListener(map, 'zoom_changed', function() {
		    var zoom = map.getZoom();
		
		    if (zoom <= 12) {
		    	marker3.setMap(null);
		        marker2.setMap(null);
		        marker1.setMap(null);
		    } else {
		    	marker3.setMap(map);
		        marker2.setMap(map);
		        marker1.setMap(map);
		    }
		  });
		  
		   /* open popup marker when map is load */
		  new google.maps.event.trigger( marker, 'click' );  		
		  	
	}