var controller = new Controller();
var DEBUG = 0;

function initAutocomplete() {
    controller.init();
    console.log("hier sollte niemals etwas anderes als 1 stehen" + ++DEBUG);

}

$(document).ready(function () {
    controller.loadFromServer();

    $("#setMarker").on("click", function(){

        var map = controller.viewMap.map;

        var lat = $("#debug_lat").val();
        var lng = $("#debug_lng").val();

        L.circleMarker(L.latLng(lat, lng), {radius:1}).addTo(controller.viewMap.map);

    });

});
