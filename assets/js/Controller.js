const HOST = "10.132.134.222";
const DAYS_TILL_COOKIE_EXPIRE = 30;
const COOKIENAME = "Modulplatzierer";
const SERVER_URL = "http://" + HOST + ":8080/SolarRESTService_war_exploded/server";

function Controller() {
    this.serverHandler = null;
    this.serverAvailable = null;
    this.cookieHandler = null;
    this.mapContainer = null;
    this.cookieId = null;
    this.roofId = null;
}


Controller.prototype.initMap = function () {

    this.mapContainer = new MapContainer();
    this.mapContainer.controller = this;
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
Controller.prototype.setServerUnavailable = function () {
    this.serverAvailable = false;
    this.serverHandler = null;
};

Controller.prototype.loadFromServer = function () {
    this.cookieHandler = new CookieHandler(COOKIENAME);
    this.serverHandler = new ServerHandler(SERVER_URL);
    var cont = this;
    this.serverHandler.default_error_function = function () {
        cont.setServerUnavailable();
    };
    this.cookieId = this.cookieHandler.readCookie(COOKIENAME);
    if (this.cookieId === null || this.cookieId === "undefined") {
        var dueDate = new Date().getTime() + (DAYS_TILL_COOKIE_EXPIRE * 24 * 60 * 60 * 1000);
        this.serverHandler.createCookieFromServer(dueDate, this.writeCookie);
    } else {
        this.serverHandler.getCookieFromServer(this.cookieId, this.loadCookieData);
    }
};

Controller.prototype.loadCookieData = function (data) {
    this.setRoofId(data.dach_ids[0]);
    if (!this.serverAvailable) {
        return;
    }
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
    if (!this.serverAvailable) {
        return;
    }
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
    if (!this.serverAvailable) {
        return;
    }
    this.serverHandler.postPanelToServer(this.roofId, panel, function (data, panel) {
        panel.id = data;
    });

};

Controller.prototype.connectWithPolygonTool = function(panel) {
    var panelTool = new PanelTool(panel);
    var controller = this;
    var changed = function () {
        if (!controller.serverAvailable) {
            return;
        }
        controller.serverHandler.updatePanelToServer(controller.serverHandler.roofId, selectedSolarPolygon.panel);
    };
    panelTool.pitchSlider().on("input change", function () {

        var pitch = $(this).val();

        selectedSolarPolygon.panel.setPitch(pitch);
        selectedSolarPolygon.panel.realign();
        controller.updateModel(selectedSolarPolygon);

    }).change(changed());

    panelTool.heightSlider().on("input change", function () {

        var height = $(this).val();

        console.log("Panel: " + selectedSolarPolygon.panel.name + " set height: " + height);
        selectedSolarPolygon.panel.length = height;
        selectedSolarPolygon.panel.realign();
        controller.updateModel(selectedSolarPolygon);

    }).change(changed());

    panelTool.widthSlider().on("input change", function () {

        var width = $(this).val();

        console.log("Panel: " + selectedSolarPolygon.panel.name + " set width: " + width);
        selectedSolarPolygon.panel.width = width;
        selectedSolarPolygon.panel.realign();
        controller.updateModel(selectedSolarPolygon);

    }).change(changed());

    panelTool.orientationSlider().on("input change", function () {

        var orientation = $(this).val();

        console.log("Panel: " + selectedSolarPolygon.panel.name + " set orientation: " + orientation);
        selectedSolarPolygon.panel.setOrientation(orientation);
        selectedSolarPolygon.panel.realign();
        controller.updateModel(selectedSolarPolygon);

    }).change(changed());
};

Controller.prototype.updateModel = function (polygon) {
    polygon.setLatLngs([
        [polygon.panel.topLeft.lat, polygon.panel.topLeft.lng],
        [polygon.panel.topRight.lat, polygon.panel.topRight.lng],
        [polygon.panel.botRight.lat, polygon.panel.botRight.lng],
        [polygon.panel.botLeft.lat, polygon.panel.botLeft.lng]
    ]);
};