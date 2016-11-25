/* Konstanten */
const HOST = "localhost";
const DAYS_TILL_COOKIE_EXPIRE = 30;
const COOKIENAME = "Modulplatzierer";

const SERVER_URL = "http://" + HOST + ":8080/SolarRESTService_war_exploded/server";

/* Variablen */
var cookieId;
var roofId;


/* Klassen */
var serverHandler = new ServerHandler(SERVER_URL);
var cookieHandler = new CookieHandler(COOKIENAME);
var mapContainer = new MapContainer();

$(document).ready(function () {

    var mapHeight = document.getElementById("map").offsetHeight;
    var mapWidth = document.getElementById("map").offsetWidth;

    mapContainer.map = L.map('map').setView([52.46806645297567, 10.534391955698084], 18);
    mapContainer.showGoogleMaps();
    /* TODO: Dummydach ersetzen */

    var roof = L.polygon([
        [52.46847495386419, 10.533764318788599],
        [52.46853377767989, 10.534858660066675],
        [52.46771350515504, 10.53499277051742],
        [52.467667752452556, 10.533882335985254],
        [52.46847495386419, 10.533764318788599]
    ]).addTo(mapContainer.map);
    mapContainer.d3Overlay = L.d3SvgOverlay(function (selection, projection) {
        this.projection = projection;
    });
    mapContainer.d3Overlay.addTo(mapContainer.map);


    init();

    var addBtn = document.getElementById("add");

    addBtn.onclick = function () {

        var point = L.point(100, 100);

        var panelData = {};
        panelData.name = "Added Panel";
        panelData.LatLng = mapContainer.layerPointToLatLng(point);
        var solarpanel = createSolarpanel(panelData.LatLng, 10, 10);
        solarpanel = mapContainer.addPolygon(solarpanel);
        serverHandler.postPanelToServer(roofId,solarpanel);

    };


    var googleMapButton = document.getElementById("googleMap");
    googleMapButton.onclick = function () {
        mapContainer.showGoogleMap();
    };

    var openStreetMapButton = document.getElementById("openStreetMap");
    openStreetMapButton.onclick = function () {
        mapContainer.showOpenStreetMap();
    };

});


function init() {
    //  eraseCookie(COOKIENAME);
    cookieId = cookieHandler.readCookie(COOKIENAME);
    if (cookieId === null || cookieId === "undefined") {
        var dueDate = new Date().getTime() + (DAYS_TILL_COOKIE_EXPIRE * 24 * 60 * 60 * 1000);
        serverHandler.createCookieFromServer(dueDate);
    } else {
        serverHandler.getCookieFromServer(cookieId);

    }
}

function loadCookieContent(data) {
    setRoofId(data.dach_ids[0]);
    serverHandler.getPanelsFromServer(roofId);
}

function setCookie(cid, dueDate) {
    cookieId = cid;
    cookieHandler.createCookie(COOKIENAME, cid, dueDate);
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


