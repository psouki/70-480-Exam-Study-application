function createDrivingDirections() {
    var mapDiv = document.getElementById('googleMap');

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(showPosition, OnError);

        function showPosition(position) {
            mapDiv.innerHTML = position.coords.latitude+ ' - '+ position.coords.longitude;
            showMap(position.coords.latitude, position.coords.longitude);
        };
        function OnError(error) {
            switch (error.code) {
            case error.PERMISSION_DENIED:
                mapDiv.innerHTML = "User denied it.";
                break;
            case error.POSITION_UNAVAILABLE:
                mapDiv.innerHTML = "Location info unavailable.";
                break;
            case error.TIMEOUT:
                mapDiv.innerHTML = "The request time it out.";
                break;
            case error.UNKNOWN_ERR:
                mapDiv.innerHTML = "An unknown error occured.";
                break;
            default:
            }
        };
    } else {
        mapDiv.innerHTML = "No support for geolocation, we can't find you.";
    }
}

function showMap(lat, lng) {
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();

    var route = {
        origin: new google.maps.LatLng(lat, lng),
        destination: "paco pigale, Belo Horizonte",
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    var mapProp = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    directionsRenderer.setMap(map);
    directionsService.route(route, function(result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
        }
    });
};