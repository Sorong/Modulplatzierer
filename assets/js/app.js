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


function loadCookieContent(data) {
    setRoofId(data.dach_ids[0]);
    controller.serverHandler.getPanelsFromServer(roofId);
}

function setCookie(cid, dueDate) {
    cookieId = cid;
    cookieHandler.createCookie(cid, dueDate);
    //PostRoof wird mir Dummydach aufgerufen
    serverHandler.postRoofToServer({
        dach_id: 0,
        strasse: "Musterstraße",
        hausnummer: "5",
        postleitzahl: "12345",
        dachneigung: 45,
        koord_dachmitte_lng: 12,
        koord_dachmitte_lat: 12,
        cookie: {
            cookie_id: cid,
            dach_ids: []
        },
        ablaufdatum: dueDate
    });
    alert("cookieId: " + cookieId);
}

function setRoofId(rid) {
    roofId = rid;
    alert("roofId: " + roofId);
}

function updateFromServer(paneldata) {
    if (paneldata === "undefined") {
        return;
    }
    paneldata.forEach(loadPanel);
    function loadPanel(element, index, array) {
        var panel = loadSolarpanel(
            L.latLng(element.obenLinks[0], element.obenLinks[1]),
            L.latLng(element.obenRechts[0], element.obenRechts[1]),
            L.latLng(element.untenLinks[0], element.untenLinks[1]),
            L.latLng(element.untenRechts[0], element.untenRechts[1]), element.neigung, element.ausrichtung
        );
        panel.id = element.panel_id;
        panel.width = element.breite;
        panel.length = element.laenge;
        panel.orientation = element.ausrichtung;
        panel.pitch = element.neigung;
        mapContainer.addPolygon(panel)
    }

    /* TODO: Auf Solarpanel fokussieren
     map.setView(solarpanels[0].originTopLeft.lat, solarpanels[0].originTopLeft.lng, 18);
     */
}


