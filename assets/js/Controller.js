const HOST = "10.132.134.222";
const DAYS_TILL_COOKIE_EXPIRE = 30;
const COOKIENAME = "Modulplatzierer";
const SERVER_URL = "http://" + HOST + ":8080/SolarRESTService_war_exploded/server";

function Controller() {
    var serverHandler;
    var cookieHandler;
    var mapContainer;


    var cookieId;
    var roofId;
}

Controller.prototype.initMap = function () {
    this.mapContainer = new MapContainer();
    var mapHeight = document.getElementById("map").offsetHeight;
    var mapWidth = document.getElementById("map").offsetWidth;

    this.mapContainer.map = L.map('map').setView([52.46806645297567, 10.534391955698084], 18);
    this.mapContainer.showGoogleMaps();
    /* TODO: Dummydach ersetzen */

    var roof = L.polygon([
        [52.46847495386419, 10.533764318788599],
        [52.46853377767989, 10.534858660066675],
        [52.46771350515504, 10.53499277051742],
        [52.467667752452556, 10.533882335985254],
        [52.46847495386419, 10.533764318788599]
    ]).addTo(this.mapContainer.map);


    this.mapContainer.d3Overlay = L.d3SvgOverlay(function (selection, projection) {
        this.projection = projection;
    });
    this.mapContainer.d3Overlay.addTo(this.mapContainer.map);
};

Controller.prototype.loadFromServer = function () {
    this.cookieHandler = new CookieHandler(COOKIENAME);
    this.serverHandler = new ServerHandler(SERVER_URL);
    this.cookieId = this.cookieHandler.readCookie(COOKIENAME);
    if (this.cookieId === null || this.cookieId === "undefined") {
        var dueDate = new Date().getTime() + (DAYS_TILL_COOKIE_EXPIRE * 24 * 60 * 60 * 1000);
        this.serverHandler.createCookieFromServer(dueDate, this.writeCookie);
    } else {
        this.serverHandler.getCookieFromServer(this.cookieId,this.loadCookieData);
    }
};

Controller.prototype.loadCookieData = function (data) {
    this.setRoofId(data.dach_ids[0]);
    this.serverHandler.getPanelsFromServer(roofId, function (data) {
        if (data === undefined) {
            return;
        }
        var arr = [];
        data.modelSolarpanelCollection.forEach(getPanels);
        function getPanels(element) {
            arr.push(element);
        }
        this.updateLoadedFromServer(arr);
    });
};

Controller.prototype.updateLoadedFromServer = function (data) {
    if (data === "undefined") {
        return;
    }
    data.forEach(loadPanel);
    function loadPanel(elem) {
        var panel = loadSolarpanel(
            L.latLng(elem.obenLinks[0], elem.obenLinks[1]),
            L.latLng(elem.obenRechts[0], elem.obenRechts[1]),
            L.latLng(elem.untenLinks[0], elem.untenLinks[1]),
            L.latLng(elem.untenRechts[0], elem.untenRechts[1]), elem.neigung, elem.ausrichtung
        );
        panel.id = elem.panel_id;
        panel.width = elem.breite;
        panel.length = elem.laenge;
        panel.orientation = elem.ausrichtung;
        panel.pitch = elem.neigung;
        this.mapContainer.addPolygon(panel)
    }
};

Controller.prototype.setRoofId = function (roofId) {
    this.roofId = roofId;
};

Controller.prototype.writeCookie = function (cid, dueDate) {
    this.cookieId = cid;
    this.cookieHandler.createCookie(cid, dueDate);
    //PostRoof wird mir Dummydach aufgerufen
    this.serverHandler.postRoofToServer({
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
};

Controller.prototype.createPanel = function (panel) {
    this.serverHandler.postPanelToServer(this.roofId, panel, function (data, panel) {
        panel.id = data;
    });

};