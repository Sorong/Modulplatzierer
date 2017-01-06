var controller = new Controller();
var DEBUG = 0;

function initAutocomplete() {
    controller.init();
    console.log("hier sollte niemals etwas anderes als 1 stehen" + ++DEBUG);

}

$(document).ready(function (){
    controller.loadFromServer();

    function resizeMap() {
        $("#map").height($(window).height() - 110);
        setTimeout(function () {
            controller.viewMap.map.invalidateSize();
        }, 100);
    }

    resizeMap();
    $(window).resize(function () {
        resizeMap()
    });

});
