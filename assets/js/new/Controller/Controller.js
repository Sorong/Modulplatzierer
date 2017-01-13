const HOST = "195.37.224.174";

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
    this.efficiencyDisplay = null;
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
        self.getRoofFromServer(place);
    });

    this.efficiencyDisplay = new EfficiencyDisplay();
    this.efficiencyDisplay.setPanelCounter(77);
    this.efficiencyDisplay.setPanelArea(77);
    this.efficiencyDisplay.setPanelNominal(77);
    this.efficiencyDisplay.setPerYear(77);

    this.efficiencyDisplay.showWarning("Letzte Warnung");

    var addBtn = $('#add')[0];
    addBtn.onclick = function () {
        var mapHeight = document.getElementById("map").offsetHeight;
        var mapWidth = document.getElementById("map").offsetWidth;
        var center = controller.viewMap.containerPointToLatLng(L.point(mapWidth / 2, mapHeight / 2));
        var panelData = {
            name: "Added Panel",
            LatLng: center
        };
        //TODO: Maßstab der Solarpanels nicht hardcodieren
        var model = new Panel();
        model.name = "";
        model.width = 2;
        model.height = 2;
        model.topLeft = panelData.LatLng;
        model.orientation = self.roof === null ? 0 : self.roof.orientation;
        model.align(self);

        var panelstring = new PanelString(controller, model);
        panelstring = self.viewMap.addMultiPolygon(panelstring);
        self.saveToServer(panelstring.model.masterPanel, -1);
    }
};

Controller.prototype.disableServer = function () {
    $('#error_output').removeClass('hidden');
    this.serverIsAvailable = false;
};

Controller.prototype.enableServer = function () {
    $('#error_output').addClass('hidden');
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

Controller.prototype.saveToServer = function (panel, masterId) {
    if (this.serverIsAvailable) {
        var json = this.convertModelToJsonString(panel, masterId);
        this.serverHandler.postPanel(json, panel, function (data, panel) {
            panel.id = data.panel_id;
            panel.name = "Solarpanelstring " + panel.id;
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

Controller.prototype.updateModel = function (model, position, orientation) {
    model.setPosition(position);
    if (orientation !== undefined) {
        model.setOrientation(orientation);
    }

    this.savePanelstring(model);
    var efficiency = this.getPanelEffiency();
};

Controller.prototype.connectModelWithToolbar = function (polygon) {

    var model = polygon.model.constructor === PanelString ? polygon.model.masterPanel : polygon.model;
    var isOtherPanelSelected = !(this.toolbar != null && model == this.toolbar.selectedModel);

    if (this.toolbar === null) {
        this.toolbar = new Toolbar(model);
    } else if (isOtherPanelSelected) {
        this.toolbar.unbindEvents();
        this.toolbar = null;
        this.toolbar = new Toolbar(model);
    }

    var self = this;
    var selected = self.viewMap.selectedPolygon;
    var changed = function () {
        if (self.serverIsAvailable) {
            for (var i = 0; i < polygon.model.size(); i++) {
                var json = self.convertModelToJsonString(polygon.model.get(i), i === 0 ? -1 : polygon.model.get(0).id);
                self.serverHandler.updatePanel(json, function (data) {

                });
            }
        }
    };
    var realignModel = function (selectedPolygon, width, height) {
        selectedPolygon.model.align(self, width, height);
        self.updateModelPosition(selectedPolygon, true);
    };
    this.toolbar.pitchSlider().on("input change", function () {
        if (polygon.model.constructor === PanelString) {
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
        if (polygon.model.constructor === PanelString) {
            selected.model.setOrientation($(this).val());
        } else {
            selected.model.orientation = $(this).val();

        }
        realignModel(selected);
    }).focusout(changed);

    this.toolbar.frameWidthSlider().on("input change", function () {
        if (polygon.model.constructor === PanelString) {
            selected.model.setFrameWidth( ($(this).val()/10));
        } else {
            selected.model.frameWidth = ($(this).val() / 10);
        }
        realignModel(selected);
    }).focusout(changed);

    this.toolbar.modelDelete.on("click", function () {
        for (var i = selected.model.size() - 1; i >= 0; i--) {
            controller.removeModelById(selected.model.get(i).id);
        }
        controller.toolbar.unbindEvents();
        controller.viewMap.removeSelected();
    })
};

Controller.prototype.updateModelPosition = function (polygon, disabledServerUpdate) {
    polygon.model.align(this);
    polygon.setLatLngs(polygon.model.getPointsAsList());
    polygon.transform.resetHandler();
    if (disabledServerUpdate !== true) {
        var out = this.convertModelToJsonString(polygon.model);
        this.serverHandler.updatePanel(out, function (data) {
            console.log("Panel updated");
        });
    }
};

Controller.prototype.getRoofFromServer = function (place) {
    var self = this;
    if (place.geometry === undefined) {
        return;
    }
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

    var removedPolygons = this.viewMap.removeAllNonMoveable();
    if(this.serverIsAvailable && this.roof.roofId === -1) {
        this.serverHandler.postRoof(this.convertModelToJsonString(this.roof), function (data) {
            console.log("Dach gespeichert");
        });
    }
    this.viewMap.addNonMovable(this.roof);
    if (this.roof.parts != null && this.roof.parts.length > 0) {
        this.viewMap.addNonMovable(this.roof.getBestRoofPart(this));
    }


    this.viewMap.setFocus(this.roof.points[0].lat, this.roof.points[0].lng);

};

Controller.prototype.getLatLngAsPoint = function (latLng) {
    return this.viewMap.latLngToLayerPoint(latLng);
};

Controller.prototype.getPointAsLatLng = function (point) {
    return this.viewMap.layerPointToLatLng(point);
};

Controller.prototype.convertModelToJsonString = function (model, masterId) {
    var json = model.getAsJson();
    json.cookie_id = this.cookieId;
    if(masterId !== undefined) {
        json.masterpanel_id = masterId;
    }
    return JSON.stringify(json);
};

Controller.prototype.appendModel = function (model, nextModel) {
    var appendModel = nextModel !== undefined ? nextModel : new Panel();
    model.appendPanel(appendModel);
    if (appendModel.id === -1) {
        this.saveToServer(appendModel, model.masterPanel.id);
    }
};

Controller.prototype.removeModel = function (model) {
    var id = model.removePanel();
    if (id !== undefined && id !== -1) {
        this.removeModelById(id);
    }
};

Controller.prototype.removeModelById = function (id) {
    this.serverHandler.removePanel(id, function () {
        console.log(id + " wurde gelöscht");
    })
};

Controller.prototype.savePanelstring = function (panelstring) {
    if (this.serverIsAvailable) {
        var masterpanelId = panelstring.get(0).id;
        for (var i = 0; i < panelstring.size(); i++) {
            var json = this.convertModelToJsonString(panelstring.get(i), i === 0 ? -1 : masterpanelId);
            this.serverHandler.updatePanel(json, function (data) {

            });
        }
    }
};

Controller.prototype.getGeoJSON = function (model) {
    return model.getGeoJSON();
};


/* Adress-Error */
Controller.prototype.showAddressError = function () {
    $('#address_tool').addClass('has-error');
    $('#address_tool_span').addClass('glyphicon-remove');
    $('#address_error').text("Addresse muss aus Straße, Hausnummer und Ort bestehen.");
};

Controller.prototype.showCanNotFoundAddressError = function () {
    $('#address_tool').addClass('has-error');
    $('#address_tool_span').addClass('glyphicon-remove');
    $('#address_error').text("Keine Dachdaten der gewünschten Adresse abrufbar.");
};

Controller.prototype.removeAddressError = function () {
    $('#address_tool').removeClass('has-error');
    $('#address_tool_span').removeClass('glyphicon-remove');
    $('#address_error').text("");
};


Controller.prototype.createRoof = function (data) {
    var type = data.layerType,
        layer = data.layer;

    layer.addTo(this.viewMap.map);
    //layer._latlngs hat die Koordinaten
    // oder layer.editing.latlngs
    $(layer).on('click', function () {
        if (layer.editing._enabled) {
            layer.editing.disable()
        } else {
            layer.editing.enable()
        }
    });
    this.viewMap.map.removeLayer(layer);
    var latlngs = data.layer.getLatLngs()[0];
    var roof = new Roof();
    if(this.roof != null) {
        roof.roofId = this.roof.roofId;
    }
    roof.setPointsFromList(latlngs);
    roof.calculateOrientation(this);
    this.roof = roof;
    this.drawRoof();
};

Controller.prototype.editRoof = function (data) {
    console.log(data)
};

Controller.prototype.getPanelEffiency = function () {
    if (this.roof !== null) {
        var arr = [];
        for (var i = 0; i < this.viewMap.moveablePolygons.length; i++) {
            var current = this.viewMap.moveablePolygons[i].model;
            if (current.constructor === PanelString) {
                var panelsInRoof = 0;
                for (var j = 0; j < current.size(); j++)
                    if (this.roof.getBestRoofPart(this).panelInRoof(current.get(j)) === 4) {
                        arr.push({
                            width: current.get(j).width,
                            height: current.get(j).height,
                            pitch: current.get(j).pitch
                        });
                        panelsInRoof++;
                    }
            }
            if (panelsInRoof === current.size()) {
                this.viewMap.moveablePolygons[i].setStyle( {color: "#3388ff"});
            }
        }


        //TODO: Hier prüfen ob alle Panels im Dach sind
        this.roof.getBestRoofPart().calculateOrientation(this);
        console.log(evaluateEfficency(arr, this.roof.getBestRoofPart(this).global));
    } else {
        console.log("kein Dach");
    }
};
/* Callbackfunktionen */

function callbackDisableServer() {
    if (controller !== undefined) {
        controller.disableServer();
    }
}

function callbackCreateCookie(data) {
    if (controller !== undefined) {
        if (navigator.cookieEnabled) {
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
        data.solarpanelList.forEach(createPanels);
        if(data.modelDach !== null) {
            var roof = new Roof();
            roof.roofId = data.modelDach.dach_id;
            roof.global = data.modelDach.global;
            roof.pv = data.modelDach.pv;
            roof.st = data.modelDach.st;
            roof.gid = data.modelDach.gid;
            var arr = [];
            data.modelDach.the_geom.forEach(getCoords);
            function getCoords(element) {
                arr.push(L.latLng(element.latitude, element.longitude));
            }
            roof.setPointsFromList(arr);
            roof.calculateOrientation(controller);
            controller.roof = roof;
            if(roof.gid != null) {
                controller.getRoofPartsFromServer();
            } else {
                controller.drawRoof();
            }

        }

        function createPanels(list) {
            var panelstring;
            for (var i = 0; i < list.length; i++) {
                var panel = new Panel();
                var listItem = list[i];
                panel.setPointsFromList(listItem.the_geom);
                panel.pitch = listItem.neigung;
                panel.orientation = listItem.ausrichtung;
                panel.id = listItem.panel_id;
                panel.width = listItem.breite;
                panel.height = listItem.laenge;
                panel.frameWidth = listItem.rahmenbreite;
                panel.align(controller);
                if (i === 0) {
                    panelstring = new PanelString(controller, panel);
                } else {
                    controller.appendModel(panelstring, panel);

                }
            }
            console.log(panelstring.masterPanel.orientation);
            controller.viewMap.addMultiPolygon(panelstring);
            controller.viewMap.selectedPolygon.transform._orientation = -(panelstring.masterPanel.orientation - 360);
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
        if (data.the_geom === undefined) {
            controller.showCanNotFoundAddressError();
            return;
        } else {
            controller.removeAddressError();
        }
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
            roof.global = data[i].global;
            roof.tilt = data[i].tilt;
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
