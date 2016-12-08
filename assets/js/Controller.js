
const HOST = "195.37.224.87";

const DAYS_TILL_COOKIE_EXPIRE = 30;
const COOKIENAME = "Modulplatzierer";
const SERVER_URL = "http://" + HOST + ":8080/SolarRESTService_war_exploded/server";

function Controller() {
    this.serverHandler = null;
    this.serverAvailable = true;
    this.cookieHandler = null;
    this.mapContainer = null;

    this.roof = null;

    this.cookieId = null;

    this.self = this;


}

Controller.prototype.initMap = function () {
    this.mapContainer = new MapContainer();
    this.cookieHandler = new CookieHandler(COOKIENAME);
   // this.cookieHandler.eraseCookie();
    this.serverHandler = new ServerHandler(SERVER_URL);
    this.mapContainer.controller = this;
    var mapHeight = document.getElementById("map").offsetHeight;
    var mapWidth = document.getElementById("map").offsetWidth;

    this.mapContainer.map = L.map('map').setView([52.587896, 13.29209], 18);
    this.mapContainer.showGoogleMaps();

    this.mapContainer.d3Overlay = L.d3SvgOverlay(function (selection, projection) {
        this.projection = projection;
    });
    this.mapContainer.d3Overlay.addTo(this.mapContainer.map);
};

Controller.prototype.setServerUnavailable = function () {
    this.serverAvailable = false;
    //this.serverHandler = null;
    console.log("Server nicht da");
};

Controller.prototype.loadFromServer = function () {

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

Controller.prototype.setRoofId = function (roofId) {
    this.roof.id = roofId;
};

Controller.prototype.loadCookieData = function (data) {
    var cs = controller.self;
   // cs.setRoofId(data.dach_ids[0]);
    if (!cs.serverAvailable) {
        return;
    }
        if (data === undefined) {
            return;
        }
        var arr = [];
        data.solarpanelList.forEach(getPanels);
        function getPanels(element) {
            arr.push(element);
        }

        cs.updateLoadedFromServer(arr);

};

Controller.prototype.updateLoadedFromServer = function (data) {
    var cs = controller.self;
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
        cs.mapContainer.addPolygon(panel)
    }
};



Controller.prototype.writeCookie = function (cid, dueDate) {
    var cs = controller.self;
    cs.cookieId = cid;
    cs.cookieHandler.createCookie(cid, dueDate);
};

Controller.prototype.createPanel = function (panel) {
    if (!this.serverAvailable) {
        return;
    }
    this.serverHandler.postPanelToServer(this.cookieId, panel, function (data, panel) {
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
        controller.serverHandler.updatePanelToServer(controller.cookieId, selectedSolarPolygon.panel);
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

Controller.prototype.getRoofFromServer = function(place) {
    this.serverAvailable = true;
    this.serverHandler.getPredefinedRoof(place.address_components[1].short_name,
        place.address_components[0].short_name,
        place.address_components[7].short_name, this.drawRoofOnMap);

};

Controller.prototype.drawRoofOnMap = function (data) {
    var cs = controller.self;
    var roof_json = data;

    cs.roof = new Roof();
    cs.roof.controller = cs;
    cs.roof.pv = roof_json.pv;
    cs.roof.st = roof_json.st;
    var arr = [];
    roof_json.the_geom.forEach(getCoords);
    function getCoords(element) {
        arr.push([element.latitude, element.longitude]);
    }
    cs.roof.setCornersUnsorted(arr);
    cs.mapContainer.drawRoof(cs.roof.getAsPolygon());
    cs.roof.setOrientation();
};

Controller.prototype.getLatLngAsPoint = function(latLng) {
    return this.mapContainer.latLngToLayerPoint(latLng);
};

Controller.prototype.getBasePolygonOrientation = function () {
    return roof.orientation;
};