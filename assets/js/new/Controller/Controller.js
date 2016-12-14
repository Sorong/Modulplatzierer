const HOST = "localhost";

const DAYS_TILL_COOKIE_EXPIRE = 30;
const COOKIENAME = "Modulplatzierer";
const SERVER_URL = "http://" + HOST + ":8080/SolarRESTService_war_exploded/server";


function Controller() {
    this.serverIsAvailable = true;
    this.viewMap = new Map();
    this.viewAddress = null;
    this.serverHandler = new ServerHandler(SERVER_URL);
    this.cookieHandler = new CookieHandler(COOKIENAME);
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
        for(var i = 0; i < place.address_components.height; i++) {
            var curr = place.address_components[i];
            if(curr.types[0] === "route") {
                street = curr.long_name;
            } else if (curr.types[0] === "street_number") {
                nr = curr.long_name;
            } else if (curr.types[0] === "postal_code") {
                postalcode = curr.long_name;
            }
        }
        if(street !== undefined && nr !== undefined && postalcode !== undefined) {
            self.viewMap.setFocus(lat, lng);
        } else {
            alert("Bitte die Adresse vollständig (Straße, Hausnummer, Wohnort) eingeben");
        }

    });
    var addBtn = $('#add')[0];
    addBtn.onclick = function () {
        var mapHeight = document.getElementById("map").offsetHeight;
        var mapWidth = document.getElementById("map").offsetWidth;
        var center = controller.viewMap.containerPointToLatLng(L.point(mapHeight/2,mapWidth/2));
        var panelData = {
            name : "Added Panel",
            LatLng : center
        };
        //TODO: Maßstab der Solarpanels nicht hardcodieren
        var model = new Panel();
        model.width = 1000;
        model.height = 1000;
        model.topLeft = panelData.LatLng;
        model.orientation = self.viewMap.nonMovablePolygon === null ? 0 : self.viewMap.nonMovablePolygon.roof.orientation;
        model.align(self);
        polygonPanel = self.viewMap.addPolygon(model);
        //TODO: Ausrichten
    }
};

Controller.prototype.disableServer = function () {
    this.serverAvailable = false;
};

Controller.prototype.enableServer = function () {
    this.serverAvailable = true;
};

Controller.prototype.loadFromServer = function () {

};

Controller.prototype.saveToServer = function(panel) {

};

Controller.prototype.createUserCookie = function (cid, duedate) {
    this.cookieId = cid;
    this.cookieHandler.createCookie(cid, duedate);
};

Controller.prototype.updateModel = function(polygon) {
    this.updateModelPosition(polygon);
    this.connectModelWithToolbar(polygon);
};

Controller.prototype.connectModelWithToolbar = function (polygon) {
    var toolbar = new Toolbar(polygon.model);
    var self = this;
    var selected = self.viewMap.selectedPolygon;
    var changed = function () {
        if(self.serverAvailable) {
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

Controller.prototype.getLatLngAsPoint = function(latLng) {
    return this.viewMap.latLngToLayerPoint(latLng);
};

Controller.prototype.getPointAsLatLng = function (point) {
  return this.viewMap.layerPointToLatLng(point);
};

Controller.prototype.getModelAsList = function (model) {
  return model.getPointsAsList();
};







/* Callbackfunktionen */

function swapServerstatus() {
    if(controller !== undefined) {
        controller.serverIsAvailable ? controller.disableServer() : controller.enableServer();
    }
}

function getPanelsFromCookieData(data) {
    var arr = [];
    data.solarpanelList.forEach(getPanels);
    function getPanels(element) {
        arr.push(element);
    }
    /*TODO: cs.updateLoadedFromServer(arr);
    Das Pushen in das Array könnte überflüssig sein.

     */
}

function createUserCookie(cid, duedate) {
    controller.createUserCookie(cid, duedate);
}

function weissnochnicht() {
    
}