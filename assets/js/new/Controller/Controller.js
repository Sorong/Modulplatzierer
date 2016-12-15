const HOST = "localhost";

const DAYS_TILL_COOKIE_EXPIRE = 30;
const COOKIENAME = "Modulplatzierer";
const SERVER_URL = "http://" + HOST + ":8080/SolarRESTService_war_exploded/";


function Controller() {
    this.serverIsAvailable = true;
    this.viewMap = new Map();
    this.viewAddress = null;
    this.serverHandler = new ServerHandler(SERVER_URL);
    this.serverHandler.errorFunction = callbackDisableServer;
    this.cookieHandler = new CookieHandler(COOKIENAME);
    this.cookieId = null;
}

Controller.prototype.init = function () {
    this.viewMap.controller = this;
    this.viewMap.init();
    this.viewAddress = new google.maps.places.Autocomplete(
        (document.getElementById('address')),
        {types: ['geocode']});
    var self = this;
    this.viewAddress.addListener('place_changed', function () {
        var place = self.viewAddress.getPlace();
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();

        var street, nr, postalcode;
        for (var i = 0; i < place.address_components.height; i++) {
            var curr = place.address_components[i];
            if (curr.types[0] === "route") {
                street = curr.long_name;
            } else if (curr.types[0] === "street_number") {
                nr = curr.long_name;
            } else if (curr.types[0] === "postal_code") {
                postalcode = curr.long_name;
            }
        }
        if (street !== undefined && nr !== undefined && postalcode !== undefined) {
            self.viewMap.setFocus(lat, lng);
        } else {
            alert("Bitte die Adresse vollständig (Straße, Hausnummer, Wohnort) eingeben");
        }

    });
    var addBtn = $('#add')[0];
    addBtn.onclick = function () {
        var mapHeight = document.getElementById("map").offsetHeight;
        var mapWidth = document.getElementById("map").offsetWidth;
        var center = controller.viewMap.containerPointToLatLng(L.point(mapHeight / 2, mapWidth / 2));
        var panelData = {
            name: "Added Panel",
            LatLng: center
        };
        //TODO: Maßstab der Solarpanels nicht hardcodieren
        var model = new Panel();
        model.width = 1000;
        model.height = 1000;
        model.topLeft = panelData.LatLng;
        model.orientation = self.viewMap.nonMovablePolygon === null ? 0 : self.viewMap.nonMovablePolygon.roof.orientation;
        model.align(self);
        polygonPanel = self.viewMap.addPolygon(model);
        self.saveToServer(polygonPanel.model);
    }
};

Controller.prototype.disableServer = function () {
    this.serverAvailable = false;
};

Controller.prototype.enableServer = function () {
    this.serverAvailable = true;
};

Controller.prototype.loadFromServer = function (forceNewCookie) {
    this.cookieId = this.cookieHandler.readCookie();
    console.log("CookieID " + this.cookieId + " vom Nutzer gelesen");
    if (this.cookieId === null || this.cookieId === undefined || forceNewCookie === true) {
        var dueDate = new Date().getTime() + (DAYS_TILL_COOKIE_EXPIRE * 24 * 60 * 60 * 1000);
        var json = JSON.stringify({
            cookie_id : 0,
            ablaufdatum : dueDate
        });
        this.serverHandler.postCookie(json, callbackCreateCookie)
    } else {
        this.serverHandler.getCookie(this.cookieId, callbackEvaluateCookie)
    }

};

Controller.prototype.saveToServer = function (panel) {
    if (this.serverAvailable) {
        var json = JSON.stringify({
            cookie_id: this.cookieId,
            panel_id: panel.id,
            obenLinks: [panel.oTopLeft.lat, panel.oTopLeft.lng],
            obenRechts: [panel.oTopRight.lat, panel.oTopRight.lng],
            untenRechts: [panel.oBotRight.lat, panel.oBotRight.lng],
            untenLinks: [panel.oBotLeft.lat, panel.oBotLeft.lng],
            laenge: panel.height,
            breite: panel.width,
            neigung: panel.pitch,
            ausrichtung: panel.orientation,
            rahmenbreite: 0
        });

        this.serverHandler.postPanel(json, panel, function (data, panel) {
            panel.id = data;
        });
    }
};

Controller.prototype.createUserCookie = function (cid, duedate) {
    this.cookieId = cid;
    this.cookieHandler.createCookie(cid, duedate);
};

Controller.prototype.deleteUserCooke = function () {
    this.cookieHandler.eraseCookie();
    this.loadFromServer(true);
};

Controller.prototype.updateModel = function (polygon) {
    this.updateModelPosition(polygon);
    this.connectModelWithToolbar(polygon);
};

Controller.prototype.connectModelWithToolbar = function (polygon) {
    var toolbar = new Toolbar(polygon.model);
    var self = this;
    var selected = self.viewMap.selectedPolygon;
    var changed = function () {
        if (self.serverAvailable) {
            self.serverHandler.updatePanelToServer(self.cookieId, selected.model);
        }
    };
    var realignModel = function (selectedPolygon, width, height) {
        selectedPolygon.model.align(self, width, height);
        self.updateModelPosition(selectedPolygon);
    };
    toolbar.pitchSlider().on("input change", function () {
        selected.model.pitch = $(this).val();
        realignModel(selected);
    }).change(changed());

    toolbar.heightSlider().on("input change", function () {
        realignModel(selected, selected.model.width, $(this).val());
    }).change(changed());

    toolbar.widthSlider().on("input change", function () {
        realignModel(selected, $(this).val(), selected.model.height);
    }).change(changed());

    toolbar.orientationSlider().on("input change", function () {
        selected.model.orientation = $(this).val();
        realignModel(selected);
    }).change(changed());
};

Controller.prototype.updateModelPosition = function (polygon) {
    polygon.setLatLngs(polygon.model.getPointsAsList());
};

Controller.prototype.getLatLngAsPoint = function (latLng) {
    return this.viewMap.latLngToLayerPoint(latLng);
};

Controller.prototype.getPointAsLatLng = function (point) {
    return this.viewMap.layerPointToLatLng(point);
};

Controller.prototype.getModelAsList = function (model) {
    return model.getPointsAsList();
};


/* Callbackfunktionen */

function callbackDisableServer() {
    if (controller !== undefined) {
        controller.disableServer();
    }
}

function callbackCreateCookie(cid, duedate) {
    if (controller !== undefined) {
        controller.createUserCookie(cid, duedate);
    }
}

function callbackEvaluateCookie(data) {
    if (controller === undefined) {
        return;
    }
    if (data.cookieId === -1) {
        controller.deleteUserCooke();
    } else {
        data.solarpanelList.forEach(createPanel);
        function createPanel(p) {
            var panel = new Panel();
            panel.oTopLeft = L.latLng(p.obenLinks[0], p.obenLinks[1]);
            panel.oTopRight = L.latLng(p.obenRechts[0], p.obenRechts[1]);
            panel.oBotLeft = L.latLng(p.untenLinks[0], p.untenRechts[1]);
            panel.oBotRight = L.latLng(p.untenRechts[0], p.untenRechts[1]);
            panel.pitch = p.neigung;
            panel.orientation = p.ausrichtung;
            panel.id = p.panel_id;
            panel.width = p.breite;
            panel.height = p.laenge;
            panel.align();
            controller.viewMap.addPolygon(panel);
        }
    }
}
