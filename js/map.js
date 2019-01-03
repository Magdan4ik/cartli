function initMap() {

var styleArray = [
    {
        featureType: "all",
        elementType: "all",
        stylers: [
            { saturation: -100 }
        ]
    }
];
var center = {lat: 49.1954626, lng: 30.6854476};

// Create a map object and specify the DOM element for display.
var map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    scrollwheel: false,
    zoom: 7.64,
    styles: styleArray
});

var imarker =  '/assets/templates/cartli/img/map_marker.svg'

	var LatLng1 = {lat: 49.234879, lng: 28.429459};
  	var title1 = new google.maps.Marker({
      map: map,
      position: LatLng1,
      icon: imarker
  });

	var LatLng2 = {lat: 49.801739, lng: 30.118028};
  	var title2 = new google.maps.Marker({
      map: map,
      position: LatLng2,
      icon: imarker
  });

	var LatLng3 = {lat: 48.740751, lng: 30.215904};
  var title3 = new google.maps.Marker({
      map: map,
      position: LatLng3,
      icon: imarker
  });

	var LatLng4 = {lat: 49.589555, lng: 34.550983};
  var title4 = new google.maps.Marker({
      map: map,
      position: LatLng4,
      icon: imarker
  });

	var LatLng5 = {lat: 49.550539, lng: 25.589055};
  	var title5 = new google.maps.Marker({
      map: map,
      position: LatLng5,
      icon: imarker
  });

};

