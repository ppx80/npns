

/*----- MAP SETUP -----*/
if(!ajaxEnabled){
	var ajaxEnabled=false;
}

$(document).ready( function() {

	integrateMapData();

} );

function integrateMapData () { //used by ajax response.map
	integrateMapDataOfflineSCK();
	integrateMapDataOnlineSCK();
	integrateMapDataBackers();
}


/* -- SET MAP PROVIDER (OSM - sandbox.smart.... or MAPBOX - test.smart...)-- */
var URLMapChecker = ['smartcitizen','test','loc','sandbox'];
var tileVendor;
function setMapProvider(){
	var baseURL = window.location.host.split( '.' );
	if(baseURL[0] == URLMapChecker[0] || baseURL[0] == URLMapChecker[1]){
		tileVendor = L.tileLayer('http://a.tiles.mapbox.com/v3/tomasdiez.map-4rh89xg5/{z}/{x}/{y}.png', {
			maxZoom: 18
		});
		//console.log("MapVendor: MAPBOX");
	} else {
		tileVendor = L.tileLayer('http://b.tile.cloudmade.com/d7788a55f24d490aa3a80a8aba28c174/92872/256/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://smartcitizen.me">SmartCitizen</a>'
		});
		//console.log("MapVendor: OSM");
	}
}
setMapProvider();
/* GEOLOCATION MARKER GROUP */
var geoMarkers = L.layerGroup();
  
/* TEMPORARY COMMENT */
var map = L.map('map', {
  center: new L.LatLng(41.383, 2.171),
  zoom: 12,
  minzoom: 5,
  maxzoom: 22,
  layers: [tileVendor]
});

/* MAP DATA BACKERS INTEGRATION  */
var backerJSON;
var geojsonMarkerOptions = {
    radius: 6,
    fillColor: "#76CC1E",
    color: "#000",
    weight: 1,
    opacity: 0.2,
    fillOpacity: 0.2
};
var backersLayer = L.layerGroup();
var numOfBackers=0;

function integrateMapDataBackers(){
	backersLayer.clearLayers();
	$('#mapdata').find('section.backerIcons').each(function(){
	 //alert('entre');
	 	var title = $('div', this).text();
		var marker = L.circleMarker([$(this).attr('data-lat'), $(this).attr('data-long')], 
			{
			    fillColor: "#76CC1E",
			    color: "#000",
			    weight: 1,
			    opacity: 0.2,
			    fillOpacity: 0.2
		    });
		    marker.setRadius(6);
		    backersLayer.addLayer(marker);
		    marker.on('mouseover', function(e) {
			    marker.bindPopup(title).openPopup();
        	});
	        	marker.on('mouseout', function(e) {
	        		map.closePopup();
	        	});
	         
	});
	backersLayer.addTo(map);
}

/* INTEGRATE ( ONLINE ) SMART CITIZEN KIT */
var onlineSCKMarkers = L.layerGroup();
var numOnlineSCK = 0;
function integrateMapDataOnlineSCK(){
	numOnlineSCK = 0;
	onlineSCKMarkers.clearLayers();
	if(ajaxEnabled){//ajaxify overwritting the content
		$('#mapdata').find('a').each(function(){ 
			$(this).attr('onclick',"getPage('" + $(this).attr('href') + "');return false;");
			$(this).attr('href',"#");
		});
	}
	$('#mapdata').find('section.deviceIcons').each(function(){
		if($(this).hasClass('active')){
			var marker = L.circleMarker([$(this).attr('data-lat'), $(this).attr('data-long')], {
				color: '#66d5f0',
				weight: 10,
				opacity: .6,
				fillColor: '#FFF',
				fillOpacity: 1
			});
			marker.setRadius(7);
			var link = $(this).attr('data-link')
			marker.on('click', function(e) { getPage(link) });	
			onlineSCKMarkers.addLayer(marker);
			numOnlineSCK++;
		}
	});
	onlineSCKMarkers.addTo(map);
	$("#nOnlineSCK").text(numOnlineSCK);
}
/* INTEGRATE ( OFFLINE ) SCK */
var offlineSCKMarkers = L.layerGroup();
var numOfflineSCK = 0;
function integrateMapDataOfflineSCK(){
	numOfflineSCK = 0;
	offlineSCKMarkers.clearLayers();
	if(ajaxEnabled){//ajaxify overwritting the content
		$('#mapdata').find('a').each(function(){ 
			$(this).attr('onclick',"getPage('" + $(this).attr('href') + "');return false;");
			$(this).attr('href',"#");
		});
	}
	$('#mapdata').find('section.deviceIcons').each(function(){
		if(!$(this).hasClass('active')){
			var marker = L.circleMarker([$(this).attr('data-lat'), $(this).attr('data-long')], {
				color: '#333',
				weight: 1,
				opacity: .3,
				fillColor: '#AAA',
				fillOpacity: .5
			});
			marker.setRadius(6);
			var link = $(this).attr('data-link')
			marker.on('click', function(e) { getPage(link) });	
			offlineSCKMarkers.addLayer(marker);
			numOfflineSCK++;
		}
	});
	offlineSCKMarkers.addTo(map);
	$("#nOfflineSCK").text(numOfflineSCK);
}


/*------ LOADING DATA ON MAP------*/
//layer for holding future markers
var markersLayer = L.layerGroup();
function integrateMapDataDevices(){
	markersLayer.clearLayers();
	if(ajaxEnabled){//ajaxify overwritting the content
		$('#mapdata').find('a').each(function(){ 
			$(this).attr('onclick',"getPage('" + $(this).attr('href') + "');return false;");
			$(this).attr('href',"#");
		});
	}
	
	$('#mapdata').find('section.deviceIcons').each(function(){
		if($(this).hasClass('active')){
			markerfill='#FFF';
			markerborder='#66d5f0';
			markerradius = 10;
		}else{
			markerfill='#AAA';
			markerborder='#333';
			markerradius  = 6;
		}
		
		var marker = L.circleMarker([$(this).attr('data-lat'), $(this).attr('data-long')], {
			color: markerborder,
			weight: 1,
			opacity: .3,
			fillColor: markerfill,
			fillOpacity: .7
		});
		marker.setRadius(markerradius);
		marker.bindPopup($(this).html());
		//console.log($(this).attr('data-link'));
		if($(this).attr('data-link')){ //load page on marker click if data-link
			var link = $(this).attr('data-link')
			marker.on('click', function(e) { getPage(link) });
			//console.log(link);
		}	
		markersLayer.addLayer(marker);
		//console.log("integrated an other icon on the map"+ $(this).attr('data-lat') +" | " + $(this).attr('data-long'));
		//$(this).remove();
	});
	//console.log('test');
	markersLayer.addTo(map);
}


/*--------------------*/
/*------ LIBRARY------*/
/*--------------------*/

function ColorLuminance(hex, lum) {  
  // validate hex string  
  hex = String(hex).replace(/[^0-9a-f]/gi, '');  
  if (hex.length < 6) {  
	  hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];  
  }  
  lum = lum || 0;  
  // convert to decimal and change luminosity  
  var rgb = "#", c, i;  
  for (i = 0; i < 3; i++) {  
	  c = parseInt(hex.substr(i*2,2), 16);  
	  c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);  
	  rgb += ("00"+c).substr(c.length); 
  }  
  return rgb;  
}  

function getScaledColour(index, maximum) {

// determine starting colour components
var redHex   = "dd";
var greenHex = null;
var blueHex  = "11";

// define values for formula
var startGreen = 150;
var endGreen   = 50;

// calculate the green value
var greenVal = startGreen + ((endGreen - startGreen) * (index / (maximum -1)));

// round the green value to an integer
greenVal = Math.round(greenVal);

// convert from decimal to hexadecimal
greenHex = greenVal.toString(16);

// pad the hexadecimal number if required
if(greenHex.length < 2) {
  greenHex = "0" + greenHex;
}

// return the final colour
return "#" + redHex + greenHex + blueHex;
}
/* -------------------------------------------------------------------- */
/* SCRIPT TO SWITCH BETWEEN MANY MAP TILES PROVIDES SUCH OSM AND MAPBOX */

(function () {
	L.TileLayer.Common = L.TileLayer.extend({
		initialize: function (options) {
			L.TileLayer.prototype.initialize.call(this, this.url, options);
		}
	});
	var osmAttr = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>';
 
	L.TileLayer.OpenStreetMap = L.TileLayer.Common.extend({
		url: 'http://b.tile.cloudmade.com/d7788a55f24d490aa3a80a8aba28c174/92872/256/{z}/{x}/{y}.png',
		options: {attribution: osmAttr}
	});
	
	L.TileLayer.MapBox = L.TileLayer.Common.extend({
		url: 'http://{s}.tiles.mapbox.com/v3/{user}.{map}/{z}/{x}/{y}.png'
	});
 
}());

/* -------------------------------------------------------------------- */
/* MY CUSTOM MARKER*/

var MyCustomMarker = L.Marker.extend({
 
    bindPopup: function(htmlContent, options) {
	  			
		if (options && options.showOnMouseOver) {
			
			// call the super method
			L.Marker.prototype.bindPopup.apply(this, [htmlContent, options]);
			
			// unbind the click event
			this.off("click", this.openPopup, this);
			
			// bind to mouse over
			this.on("mouseover", function(e) {
				
				// get the element that the mouse hovered onto
				var target = e.originalEvent.fromElement || e.originalEvent.relatedTarget;
				var parent = this._getParent(target, "leaflet-popup");
 
				// check to see if the element is a popup, and if it is this marker's popup
				if (parent == this._popup._container)
					return true;
				
				// show the popup
				this.openPopup();
				
			}, this);
			
			// and mouse out
			this.on("mouseout", function(e) {
				
				// get the element that the mouse hovered onto
				var target = e.originalEvent.toElement || e.originalEvent.relatedTarget;
				
				// check to see if the element is a popup
				if (this._getParent(target, "leaflet-popup")) {
 
					L.DomEvent.on(this._popup._container, "mouseout", this._popupMouseOut, this);
					return true;
 
				}
				
				// hide the popup
				this.closePopup();
				
			}, this);
			
		}
		
	},
 
	_popupMouseOut: function(e) {
	    
		// detach the event
		L.DomEvent.off(this._popup, "mouseout", this._popupMouseOut, this);
 
		// get the element that the mouse hovered onto
		var target = e.toElement || e.relatedTarget;
		
		// check to see if the element is a popup
		if (this._getParent(target, "leaflet-popup"))
			return true;
		
		// check to see if the marker was hovered back onto
		if (target == this._icon)
			return true;
		
		// hide the popup
		this.closePopup();
		
	},
	
	_getParent: function(element, className) {
		
		var parent = element.parentNode;
		
		while (parent != null) {
			
			if (parent.className && L.DomUtil.hasClass(parent, className))
				return parent;
			
			parent = parent.parentNode;
			
		}
		
		return false;
		
	}
 
});