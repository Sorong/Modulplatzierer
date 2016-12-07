var controller;
var autocomplete;

// callback für die Google-Api
// muss hier geladen werden,
// in document.ready funktioniert es nicht mehr

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('address')),
        {types: ['geocode']});
    autocomplete.addListener('place_changed', addressChanged);
}

function addressChanged() {
    var place = autocomplete.getPlace();
    if(controller != undefined){
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();
        controller.mapContainer.map.setView(new L.LatLng(lat, lng), 18);
    }
}

$(document).ready(function () {

    controller = new Controller();
    controller.initMap();
    controller.loadFromServer();

    var addBtn = document.getElementById("add");

    addBtn.onclick = function () {
        var point = L.point(100, 100);

        var panelData = {};
        panelData.name = "Added Panel";
        panelData.LatLng = controller.mapContainer.layerPointToLatLng(point);
        var solarpanel = createSolarpanel(panelData.LatLng, 10, 10);
        solarpanel = controller.mapContainer.addPolygon(solarpanel);
        controller.createPanel(solarpanel);
    };


    var googleMapButton = document.getElementById("googleMap");
    googleMapButton.onclick = function () {
        controller.mapContainer.showGoogleMaps();
    };

    var openStreetMapButton = document.getElementById("openStreetMap");
    openStreetMapButton.onclick = function () {
        controller.mapContainer.showOpenstreetMap();
    };

});

