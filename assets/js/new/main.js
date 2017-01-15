/**
 * Controller der aktuellen Sitzung.
 * @type {Controller}
 */
var controller = new Controller();

/**
 * Callback für das von Google genutzte Autocomplete Objekt zur Auflösung der Adressinformationen.
 * Der Controller der Sitzung wird initialisiert.
 */
function initAutocomplete() {
    controller.init();
}
/**
 * Sobald die Internetseite erfolgreich geladen wurde,
 * wird der dargestellten Karte die korrekten Pixelmaße des HTML-Elements übermittelt.
 */
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
