const HOST = "10.132.134.222";
const DAYS_TILL_COOKIE_EXPIRE = 30;
const COOKIENAME = "Modulplatzierer";
const SERVER_URL = "http://" + HOST + ":8080/SolarRESTService_war_exploded/server";

function Controller() {
    this.serverHandler = null;
    this.serverAvailable = null;
    this.cookieHandler = null;
    this.mapContainer = null;

    this.roof = null;

    this.cookieId = null;

}


Controller.prototype.initMap = function () {

    this.mapContainer = new MapContainer();
    this.mapContainer.controller = this;
    var mapHeight = document.getElementById("map").offsetHeight;
    var mapWidth = document.getElementById("map").offsetWidth;

    this.mapContainer.map = L.map('map').setView([0.0, 0.0], 0);
    this.mapContainer.showGoogleMaps();
    this.getRoofFromServer();
    this.mapContainer.drawRoof(this.roof.getAsPolygon());


    this.mapContainer.d3Overlay = L.d3SvgOverlay(function (selection, projection) {
        this.projection = projection;
    });
    this.mapContainer.d3Overlay.addTo(this.mapContainer.map);
    this.roof.setOrientation();
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
    this.roof.id = roofId;
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
    this.serverHandler.postPanelToServer(this.roof.id, panel, function (data, panel) {
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
        controller.serverHandler.updatePanelToServer(controller.serverHandler.roof.id, selectedSolarPolygon.panel);
    };
    panelTool.pitchSlider().on("input change", function () {

        var pitch = $(this).val();
        selectedSolarPolygon.panel.setPitch(pitch);
        selectedSolarPolygon.panel.realign();
        controller.updateModel(selectedSolarPolygon);

    }).change(changed());

    panelTool.heightSlider().on("input change", function () {

        var height = $(this).val();
        selectedSolarPolygon.panel.length = height;
        selectedSolarPolygon.panel.realign();
        controller.updateModel(selectedSolarPolygon);

    }).change(changed());

    panelTool.widthSlider().on("input change", function () {

        var width = $(this).val();
        selectedSolarPolygon.panel.width = width;
        selectedSolarPolygon.panel.realign();
        controller.updateModel(selectedSolarPolygon);

    }).change(changed());

    panelTool.orientationSlider().on("input change", function () {

        var orientation = $(this).val();
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

Controller.prototype.getRoofFromServer = function() {
    var roof_json = GET_DUMMY_DACH();

    this.roof = new Roof();
    this.roof.controller = this;
    this.roof.pv = roof_json.pv;
    this.roof.st = roof_json.st;
    var arr = [];
    roof_json.the_geom.forEach(getCoords);
    function getCoords(element) {
        arr.push([element.latitude, element.longitude]);
    }
    this.roof.setCornersUnsorted(arr);
};
Controller.prototype.getLatLngAsPoint = function(latLng) {
    return this.mapContainer.latLngToLayerPoint(latLng);
};

Controller.prototype.getBasePolygonOrientation = function () {
    return roof.orientation;
};