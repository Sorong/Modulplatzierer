const HOST = "10.136.193.75";

const DAYS_TILL_COOKIE_EXPIRE = 30;
const COOKIENAME = "Modulplatzierer";
const SERVER_URL = "http://" + HOST + ":8080/SolarRESTService_war_exploded/";


function Controller() {
    this.serverIsAvailable = true;
    this.viewMap = new Map();
    this.viewAddress = null;
    this.toolbar = null;
    this.serverHandler = new ServerHandler(SERVER_URL);
    this.serverHandler.errorFunction = callbackDisableServer;
    this.cookieHandler = new CookieHandler(COOKIENAME);
    this.roof = null;
    this.cookieId = null;
}

Controller.prototype.init = function () {
    if(navigator.cookieEnabled) { console.log("Cookies erlaubt") }
    this.viewMap.controller = this;
    this.viewMap.init();
    this.viewAddress = new google.maps.places.Autocomplete(
        (document.getElementById('address')),
        {types: ['geocode']});
    var self = this;
    this.viewAddress.addListener('place_changed', function () {
        var place = self.viewAddress.getPlace();
        self.getRoofFromServer(place);
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
        model.width = 10;
        model.height = 10;
        model.topLeft = panelData.LatLng;
        model.orientation = self.roof === null ? 0 : self.roof.orientation;
        model.align(self);

        var panelstring = new PanelString(controller, model);
        panelstring = self.viewMap.addMultiPolygon(panelstring);
        self.saveToServer(panelstring.model);
    }
};

Controller.prototype.disableServer = function () {
    $('#error_output').removeClass('hidden');
    this.serverIsAvailable = false;
};

Controller.prototype.enableServer = function () {
    this.serverIsAvailable = true;
};

Controller.prototype.loadFromServer = function (forceNewCookie) {
    this.cookieId = this.cookieHandler.readCookie();
    console.log("CookieID " + this.cookieId + " vom Nutzer gelesen");
    if (this.cookieId === null || this.cookieId === undefined || forceNewCookie === true) {
        var dueDate = new Date().getTime() + (DAYS_TILL_COOKIE_EXPIRE * 24 * 60 * 60 * 1000);
        var json = JSON.stringify({
            cookie_id: 0,
            ablaufdatum: dueDate
        });
        this.serverHandler.postCookie(json, callbackCreateCookie)
    } else {
        this.serverHandler.getCookie(this.cookieId, callbackEvaluateCookie)
    }

};

Controller.prototype.saveToServer = function (panel) {
    if (this.serverIsAvailable) {
        var json = this.convertModelToJsonString(panel);
        json.rahmenbreite = 0;

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
    if (this.toolbar === null) {
        this.toolbar = new Toolbar(polygon.model.constructor === PanelString ? polygon.model.masterPanel : polygon.model);
    } else {
        this.toolbar.unbindEvents();
    }

    var self = this;
    var selected = self.viewMap.selectedPolygon;
    var changed = function () {
        if (self.serverIsAvailable) {
            var json = self.convertModelToJsonString(polygon.model);
            self.serverHandler.updatePanel(json);
        }
    };
    var realignModel = function (selectedPolygon, width, height) {
        selectedPolygon.model.align(self, width, height);
        self.updateModelPosition(selectedPolygon, true);
    };
    this.toolbar.pitchSlider().on("input change", function () {
        if(polygon.model.constructor === PanelString) {
            selected.model.setPitch($(this).val());
        } else {
            selected.model.pitch = $(this).val();

        }
        realignModel(selected);
    }).focusout(changed);

    this.toolbar.heightSlider().on("input change", function () {
        realignModel(selected, selected.model.width, $(this).val());
    }).focusout(changed);

    this.toolbar.widthSlider().on("input change", function () {
        realignModel(selected, $(this).val(), selected.model.height);
    }).focusout(changed);

    this.toolbar.orientationSlider().on("input change", function () {
        if(polygon.model.constructor === PanelString) {
            selected.model.setOrientation($(this).val());
        } else {
            selected.model.orientation = $(this).val();

        }
        realignModel(selected);
    }).focusout(changed);
};

Controller.prototype.updateModelPosition = function (polygon, disabledServerUpdate) {
    polygon.model.align(this);
    polygon.setLatLngs(polygon.model.getPointsAsList());
    polygon.transform.resetHandler();
    if(disabledServerUpdate !== true) {
        var out = this.convertModelToJsonString(polygon.model);
        this.serverHandler.updatePanel(out, function (data) {
            console.log("Panel updated");
        });
    }
};

Controller.prototype.getRoofFromServer = function (place) {
    var self = this;
    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();
    var street, nr, citycode;
    for (var i = 0; i < place.address_components.length; i++) {
        var curr = place.address_components[i];
        if (curr.types[0] === "route") {
            street = curr.long_name;
        } else if (curr.types[0] === "street_number") {
            nr = curr.long_name;
        } else if (curr.types[0] === "postal_code") {
            citycode = curr.long_name;
        }
    }
    if (street !== undefined && nr !== undefined && citycode !== undefined) {
        this.removeAddressError();
        if (self.serverIsAvailable) {
            self.serverHandler.getPredefinedRoof(street, nr, citycode, callbackGetRoof)
        }
        self.viewMap.setFocus(lat, lng);
    } else {
        this.showAddressError();
    }
};

Controller.prototype.getRoofPartsFromServer = function () {
    if (this.serverIsAvailable) {
        this.serverHandler.getRoofParts(this.roof.gid, callbackGetRoofParts)
    }
};

Controller.prototype.drawRoof = function () {
    this.viewMap.setNonMovable(this.roof);
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

Controller.prototype.convertModelToJsonString = function (model) {
    var json = (model.constructor == PanelString) ? model.masterPanel.getAsJson() : model.getAsJson();
    json.cookie_id = this.cookieId;
    json.rahmenbreite = 0;
    return JSON.stringify(json);
};

Controller.prototype.showAddressError = function () {
    $('#address_tool').addClass('has-error');
    $('#address_tool_span').addClass('glyphicon-remove');
    $('#address_error').text("Addresse muss aus Straße, Hausnummer und Ort bestehen.");
};

Controller.prototype.removeAddressError = function () {
    $('#address_tool').removeClass('has-error');
    $('#address_tool_span').removeClass('glyphicon-remove');
    $('#address_error').text("");
};


/* Callbackfunktionen */

function callbackDisableServer() {
    if (controller !== undefined) {
        controller.disableServer();
    }
}

function callbackCreateCookie(data) {
    if (controller !== undefined) {
        if(navigator.cookieEnabled) {
            controller.createUserCookie(data.cookie_id, data.ablaufdatum);
        } else {
            alert("Bitte erlauben Sie die Nutzung von Cookie auf dieser Internetseite, um alle Funktionalitäten nutzen zu können");
        }

    }
}

function callbackEvaluateCookie(data) {
    if (controller === undefined) {
        return;
    }
    if (data.cookie_id === -1) {
        controller.deleteUserCooke();
    } else {
        data.solarpanelList.forEach(createPanel);

        function createPanel(p) {
            var panel = new Panel();
            panel.setPointsFromList(p.the_geom);
            panel.pitch = p.neigung;
            panel.orientation = p.ausrichtung;
            panel.id = p.panel_id;
            panel.width = p.breite;
            panel.height = p.laenge;
            panel.align(controller);
            controller.viewMap.addPolygon(panel);
        }
    }
}

function callbackGetRoof(data) {
    if (controller !== undefined) {
        var roof = new Roof();
        roof.gid = data.gid;
        roof.pv = data.pv;
        roof.st = data.st;
        var arr = [];
        data.the_geom.forEach(getCoords);
        function getCoords(element) {
            arr.push(L.latLng(element.latitude, element.longitude));
        }

        roof.setPointsFromList(arr);
        roof.calculateOrientation(controller);
        controller.roof = roof;
        controller.getRoofPartsFromServer();
    }
}

function callbackGetRoofParts(data) {
    if (controller !== null) {
        for (var i = 0; i < data.length; i++) {
            var arr = [];
            var roof = new Roof();
            roof.pv = data[i].pv;
            roof.st = data[i].st;
            data[i].the_geom.forEach(getCoords);
            function getCoords(element) {
                arr.push(L.latLng(element.latitude, element.longitude));
            }

            roof.setPointsFromList(arr);
            controller.roof.addPart(roof);

        }
        controller.drawRoof();
    }
}
