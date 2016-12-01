var controller;

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

