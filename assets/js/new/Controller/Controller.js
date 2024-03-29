/**
 * Gibt die Host-IP oder die DNS des Datenbankservers an.
 *
 * @constant
 * @type {string}
 */
const HOST = location.hostname;
/**
 * Bestimmt die Dauer von neu erstellten Cookies in Tagen.
 *
 * @constant
 * @type {number}
 */
const DAYS_TILL_COOKIE_EXPIRE = 30;
/**
 * Bestimmt den Namen der Cookies, die beim Nutzer abgelegt werden.
 *
 * @constant
 * @type {string}
 */
const COOKIENAME = "Modulplatzierer";
/**
 * Bestimmt den Pfad der für die Nutzung des RESTWebservices genutzt wird.
 * @constant
 * @type {string}
 */
const SERVER_URL = "http://" + HOST + ":8080/SolarRESTService_war_exploded/";

/**
 * Konstruiert ein Controller-Objekt.
 * Das Kontrollerobjekt wird bereits mit einem ServerHandler zur Kommunikation mit dem Datenbankserver,
 * einem CookieHandler zur Verwaltung und Interaktion des Benutzercookies
 * und einer Map, die die dargestellte Karte repräsentiert ausgestattet.
 * @class
 * @constructor
 * @property {boolean} serverIsAvailable Gibt an, ob der Datenbankserver zur Verfügung steht.
 * @property {Map} viewMap Hauptansicht der Karte
 * @property {google.maps.places.Autocomplete} viewAdress Das Objekt, dass die Adresseingabe ermöglicht.
 * @property {Toolbar} toolbar Werkzeugleiste zur Modifikation des Modells.
 * @property {ServerHandler} serverHandler Handler zur Nutzung der REST-Schnittstelle.
 * @property {CookieHandler} cookieHandler Handler zum Lesen und Schreiben von Cookies.
 * @property {Roof} roof Das aktuell dargestellte Dachmodell.
 * @property {number} cookieId Die vom Nutzer ausgelesene CookieID.
 * @property {EfficiencyDisplay} efficiencyDisplay Anzeige zur Darstellung der Effektivität.
 *
 */
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

    this._setOrientation = null;
}
/**
 * Initialisiert den Controller, hier werden grundsätzliche Funktionen des Frontends, der View, verknüpft.
 * Hier wird der Knopf zum Hinzufügen weitere Modelle mit einem Clicklistener verknüpft.
 * Auch wird hier das Adresseingabefeld mit einem Listener zur Auswertung der eigebenen Adresse verbunden.
 * Außerdem werden die entsprechenden Viewkomponenten, wie die Karte, die Werkzeugleiste und die Darstellung der Effizienz initialisiert.
 */
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
    this.showEfficiency(null);

    var addBtn = $('#add')[0];
    addBtn.onclick = function () {
        var mapHeight = document.getElementById("map").offsetHeight;
        var mapWidth = document.getElementById("map").offsetWidth;
        var center = controller.viewMap.containerPointToLatLng(L.point(mapWidth / 2, mapHeight / 2));
        var panelData = {
            name: "Added Panel",
            LatLng: center
        };
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
        self.getPanelEffiency();
    }
};
/**
 * Deaktiviert den Datenbankserver, wodurch weitere AJAX-Anfragen unterbunden werden.
 */
Controller.prototype.disableServer = function () {
    $('#error_output').removeClass('hidden');
    this.serverIsAvailable = false;
};
/**
 * Aktiviert den Datenbankserver, wodurch AJAX-Anfragen wieder ermöglicht werden.
 */
Controller.prototype.enableServer = function () {
    $('#error_output').addClass('hidden');
    this.serverIsAvailable = true;
};
/**
 *  Liest den Cookie des Nutzers aus. Wenn kein Cookie vorhanden ist wird stattdessen ein neuer Cookie angelegt.
 *  Sollte ein Cookie vorhanden sein wird der Cookie an den ServerHandler übergeben,
 *  um die Informationen die mit dem Cookie verknüpft sind abzurufen.
 *
 * @param {boolean} forceNewCookie Erzwingt das Erstellen eines neuen Cookies.
 */
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
/**
 * Stößt den Speicherprozess zur Speicherung eines Panels auf dem Datenbankserver an.
 *
 * @param {Panel} panel Muss ein Panelobjekt sein, sonst wird eine ungültige Anfrage an den Server gestellt.
 * @param {number} masterId Diese ID wird dem ServerHandler übergeben, um Panels zu einem Panelstring zu verbinden.
 * -1 signalisiert, dass das Panel der Beginn eines neuen Panelstrings ist.
 */
Controller.prototype.saveToServer = function (panel, masterId) {
    if (this.serverIsAvailable) {
        var json = this.convertModelToJsonString(panel, masterId);
        this.serverHandler.postPanel(json, panel, function (data, panel) {
            panel.id = data.panel_id;
            panel.name = "Solarpanelstring " + panel.id;
        });
    }
};
/**
 *  Erstellt einen Cookie beim Benutzer
 * @param {number} cid Die CookieID die dem Nutzer zugeteilt werden soll.
 * @param {number} duedate Das Ablaufdatum als UNIX-Zeitstempel.
 */
Controller.prototype.createUserCookie = function (cid, duedate) {
    this.cookieId = cid;
    this.cookieHandler.createCookie(cid, duedate);
};
/**
 * Löscht den Cookie des Benutzers.
 */
Controller.prototype.deleteUserCooke = function () {
    this.cookieHandler.eraseCookie();
    this.loadFromServer(true);
};
/**
 * Übermittelt dem mit dem Polygon verknüpftem Modell Positions und/oder Ausrichtungsänderungen.
 * Stößt den Speichervorgang zur Speicherung auf dem Datenbankserver an.
 * @param {L.Polygon} polygon Das Leafletpolygon, dass mit dem Modell verknüpft ist.
 * @param {L.latLng[][]} position Matrix mit den aktualisierten Koordinaten des Polygons.
 * @param {number} orientation Orientierung in Grad, in die das Polygon gedreht wurde.
 */
Controller.prototype.updateModel = function (polygon, position, orientation) {
    polygon.model.setPosition(position);
    if (orientation !== undefined) {
        polygon.model.setOrientation(orientation);
    }
    this.updatePolygonPosition(polygon);
    this.savePanelstring(polygon.model);
    this.getPanelEffiency();
};
/**
 * Verbindet ein Polygon mit der Toolbar um dessen Modifikation zu ermöglichen.
 * Hier werden die Listener für die HTML Elemente gesetzt, bzw. zuvorgesetzte Listener gelöscht,
 * damit auch nur das ausgewählte Polygon modifiziert wird.
 * @param {L.Polygon} polygon Das Polygon mit dem die Toolbar verknüpft wird. Das Polygon muss mit einem Modell verknüpft sein.
 */
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

        if (this._setOrientation != null) {
            polygon.model.setOrientation(this._setOrientation);
            this._setOrientation = null;
        }

        if (self.serverIsAvailable) {
            for (var i = 0; i < polygon.model.size(); i++) {
                var json = self.convertModelToJsonString(polygon.model.get(i), i === 0 ? -1 : polygon.model.get(0).id);
                self.serverHandler.updatePanel(json, function (data) {

                });
            }
        }
        self.getPanelEffiency();
    };
    var realignModel = function (selectedPolygon, width, height) {
        selectedPolygon.model.align(self, width, height);
        self.updatePolygonPosition(selectedPolygon);

    };
    this.toolbar.pitchSlider().on("input change", function () {
        if (polygon.model.constructor === PanelString) {
            selected.model.setPitch($(this).val());
        } else {
            selected.model.pitch = $(this).val();

        }
        realignModel(selected);
    }).mouseup(changed);

    this.toolbar.heightSlider().on("input change", function () {
        realignModel(selected, selected.model.width, $(this).val());
    }).mouseup(changed);

    this.toolbar.widthSlider().on("input change", function () {
        realignModel(selected, $(this).val(), selected.model.height);
    }).mouseup(changed);

    this.toolbar.orientationSlider().on("input change", function () {

        var orientation = $(this).val();
        if (polygon.model.constructor === PanelString) {
            polygon.transform.orientation(orientation);
            polygon.model.setOrientation(orientation);
        } else {
            selected.model.orientation = orientation;
        }
        realignModel(selected);
    }).mouseup(changed);

    this.toolbar.frameWidthSlider().on("input change", function () {
        if (polygon.model.constructor === PanelString) {
            selected.model.setFrameWidth(($(this).val()/100));
        } else {
            selected.model.frameWidth = ($(this).val()/100);
        }
        selected.setStyle({weight: selected.model.getFrameWidth()});
        realignModel(selected);
    }).mouseup(changed);

    this.toolbar.modelDelete.on("click", function () {
        for (var i = selected.model.size() - 1; i >= 0; i--) {
            controller.removeModelById(selected.model.get(i).id);
        }
        controller.toolbar.unbindEvents();
        controller.viewMap.removeSelected();
    })
};
/**
 * Richtet ein Polygon anhand dessen Modell neu aus.
 * @param {L.polygon} polygon Das Polygon, das neu ausgerichtet werden soll.
 */
Controller.prototype.updatePolygonPosition = function (polygon) {
    polygon.model.align(this);
    polygon.setLatLngs(polygon.model.getPointsAsList());
    polygon.transform.resetHandler();
};
/**
 * Verarbeitet, die vom Nutzer eingebene Adresse. Stößt Anfrage an den Datenbankserver an.
 * Die Adresse sollte die Straße, Hausnummer und den Ort enthalten,
 * ansonsten wird dem Benutzer ein Fehler angezeigt und es findet keine Anfrage an den Datenbankserver statt.
 * Bei gültiger Adresse wird vom Datenbankserver das Roof-Objekt erfragt.
 * @param {Place} place - Placeobjekt,  welches verarbeitet werden soll.
 * @see {@link https://developers.google.com/maps/documentation/javascript/places?hl=de} für weitere Informationen.
 */
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
/**
 * Frag den Datenbankserver nach Teildächern des Daches.
 */
Controller.prototype.getRoofPartsFromServer = function () {
    if (this.serverIsAvailable && this.roof != null) {
        this.serverHandler.getRoofParts(this.roof.gid, callbackGetRoofParts)
    }
};
/**
 * Zeichnet ein Polygon auf die Karte, welche mit dem aktuellen Dachmodell verknüpft ist.
 * Außerdem wird der Speichervorgang angestoßen, mit dem beim erneuten Besuchen der Internetseite das selbe Dach automatisch abgerufen wird.
 */
Controller.prototype.drawRoof = function () {

    this.viewMap.removeAllNonMoveable();
    if (this.serverIsAvailable && this.roof.roofId === -1) {
        this.serverHandler.postRoof(this.convertModelToJsonString(this.roof), function (data) {
            console.log("Dach gespeichert");
        });
    }
    this.viewMap.addNonMovable(this.roof);
    if (this.roof.parts != null && this.roof.parts.length > 0) {
        this.viewMap.addNonMovable(this.roof.getBestRoofPart(this));
    }


    this.viewMap.setFocus(this.roof.points[0].lat, this.roof.points[0].lng);
    this.getPanelEffiency();

};
/**
 * Konvertiert ein L.latLng-Objekt in das entsprechende L.point-Objekt, relativ zur dargestellten Karte.
 * Somit lassen sich Geodaten in Pixelkoordinaten konvertieren.
 * @param {L.latLng} latLng Objekt mit den Geodaten.
 * @return {L.point} Den konvertierten Punkt.
 */
Controller.prototype.getLatLngAsPoint = function (latLng) {
    return this.viewMap.latLngToLayerPoint(latLng);
};
/**
 * Konvertiert ein L.point-Objekt in das entsprechende L.latLng-Objekt.
 * Somit lassen sich Pixelkoordinaten in Geodaten konvertierten.
 * @param {L.point} point
 * @return {L.latLng} Die konvertierten Geodaten.
 */
Controller.prototype.getPointAsLatLng = function (point) {
    return this.viewMap.layerPointToLatLng(point);
};
/**
 * Konvertiert ein Modell in einen JSON-String, zusätzlich werden dem JSON-String die aktuelle CookieID und ggf. die MasterpanelID hinzugefügt.
 * @param {Panel|PanelString|Roof} model Das Modell, das als JSON-String abgebildet werden soll.
 * @param {number} masterId ID des Masterpanels welche dem JSON-String hinzugefügt werden soll.
 * @return {string} JSON-String JSON-Objekt als String.
 */
Controller.prototype.convertModelToJsonString = function (model, masterId) {
    var json = model.getAsJson();
    json.cookie_id = this.cookieId;
    if (masterId !== undefined) {
        json.masterpanel_id = masterId;
    }
    return JSON.stringify(json);
};
/**
 * Fügt einem Panelstring ein neues Panel hinzu. Stößt Speichervorgang für das hinzugefügte Panel an.
 * @param {PanelString} model PanelString welcher erweitert werden soll.
 * @param {Panel} nextModel Panel, der hinzugefügt werden soll, wenn kein Panel übergeben wird, wird stattdessen ein neues Panel erstellt.
 */
Controller.prototype.appendModel = function (model, nextModel) {
    var appendModel = nextModel !== undefined ? nextModel : new Panel();
    model.appendPanel(appendModel);
    if (appendModel.id === -1) {
        this.saveToServer(appendModel, model.masterPanel.id);
    }
    this.getPanelEffiency();
};
/**
 * Entfernt einem Panelstring ein Panel.
 * Stößt Löschvorgang auf dem Datenbankserver an um zu löschendes Panel aus der Datenbank zu entfernen.
 * @param {PanelString} model Der Panelstring, dem ein Panel entfernt werden soll.
 */
Controller.prototype.removeModel = function (model) {
    var id = model.removePanel();
    if (id !== undefined && id !== -1) {
        this.removeModelById(id);
    }
    this.getPanelEffiency();
};
/**
 * Löst Löschvorgang auf dem Datenbankserver aus.
 * @param {number} id Die ID, des Panels welches gelöscht werden soll.
 */
Controller.prototype.removeModelById = function (id) {
    if(this.serverIsAvailable) {
        this.serverHandler.removePanel(id, function () {
            console.log(id + " wurde gelöscht");
        })
    }
};
/**
 * Stößt Aktualisierungsvorgang für einen kompletten Panelstring auf dem Datenbankserver an.
 * @param {PanelString} panelstring Panelstring, dessen Panels auf dem Datenbankserver aktualisiert werden sollen.
 */
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
/**
 * Liefert alle Geodaten eines Modells.
 * @param {PanelString|Panel} model Panel oder Panelstring, dessen Geodaten geliefert werden sollen.
 * @returns {Array} Alle Geodaten des entsprechenden Modells als Liste.
 */
Controller.prototype.getGeoJSON = function (model) {
    return model.getGeoJSON();
};


/* Adress-Error */
/**
 * Signalisiert dem Benutzer, dass die Adresseingabe ungültig ist.
 */
Controller.prototype.showAddressError = function () {
    $('#address_tool').addClass('has-error');
    $('#address_tool_span').addClass('glyphicon-remove');
    $('#address_error').text("Addresse muss aus Straße, Hausnummer und Ort bestehen.");
};
/**
 * Signalisiert dem Benutzer, dass keine Dachdaten für die Adresse vorhanden sind.
 */
Controller.prototype.showCanNotFoundAddressError = function () {
    $('#address_tool').addClass('has-error');
    $('#address_tool_span').addClass('glyphicon-remove');
    $('#address_error').text("Keine Dachdaten der gewünschten Adresse abrufbar.");
};
/**
 * Entfernt einen zuvor angezeigten AdressError.
 */
Controller.prototype.removeAddressError = function () {
    $('#address_tool').removeClass('has-error');
    $('#address_tool_span').removeClass('glyphicon-remove');
    $('#address_error').text("");
};

/**
 * Erstellt ein Roof-Objekt aus den Koordinaten, die übergeben wurden.
 * @param {Array} data Datensatz der eingezeichnten Koordinaten.
 */
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
    if (this.roof != null) {
        roof.roofId = this.roof.roofId;
    }
    roof.setPointsFromList(latlngs);
    roof.calculateOrientation(this);
    this.roof = roof;
    this.drawRoof();
};

/**
 * Berechnet die Effizienz aller dargestellten Panels. Zunächst werden alle Panels, die im aktuellen Dach liegen ermittelt.
 * Sollten Sich nicht alle Panels im Dach befinden wir der Benutzer darauf aufmerksam gemacht.
 * Außerdem wird dem Benutzer signalisiert, falls keine Einstrahlungswerte vorliegen, bspw. beim selbst eingezeichnten Dach.
 * Wenn der Nutzer aktuell gar kein Dach abgebildet hat, wenn zum Beispiel keine Adresse eingegeben wurde,
 * oder kein Dach gezeichnet wurde, wird dem Benutzer dies ebenfalls mitgeteilt.
 */
Controller.prototype.getPanelEffiency = function () {
    if (this.roof !== null) {
        var arr = [];
        var checkedPanels = 0;
        for (var i = 0; i < this.viewMap.moveablePolygons.length; i++) {
            var currentModel = this.viewMap.moveablePolygons[i].model;
            if (currentModel.constructor === PanelString) {
                var panelsInRoof = 0;
                for (var j = 0; j < currentModel.size(); j++) {


                    var currentPanel = currentModel.get(j);
                    if (this.roof.getBestRoofPart(this).panelInRoof(currentPanel)) {
                        arr.push({
                            width: currentPanel.width,
                            height: currentPanel.height,
                            pitch: currentPanel.pitch,
                            orientation: currentPanel.orientation
                        });
                        panelsInRoof++;
                    }
                    if (panelsInRoof === currentModel.size()) {
                        this.viewMap.moveablePolygons[i].setStyle({fillColor: "#3388ff"});
                    } else {
                        this.viewMap.moveablePolygons[i].setStyle({fillColor: "#FF0000"});
                    }
                    checkedPanels++;
                }
            }
        }
        var efficiency = evaluateEfficiency(arr, this.roof.getBestRoofPart(this).global);
        if (checkedPanels == arr.length) {
            this.showEfficiency(efficiency);
        } else if (this.roof.getBestRoofPart(this).global === 0) {
            this.showEfficiency(efficiency, "Für das von Ihnen ausgewählte Dach liegen keine Einstrahlungswerte vor.");
        } else {

            this.showEfficiency(efficiency, "Es konnten nicht alle Solarzellen berechnet werden. Bitte überprüfen Sie die Platzierung.");
        }

    } else {
        this.showEfficiency(null, "Bitte geben Sie Ihre Adresse ein, oder zeichnen Sie ein eigenes Dach.");
    }
};
/**
 * Verarbeitet die in getPanelEfficiency ermittelten Daten
 * @see getPanelEfficiency
 * @param {object} efficiency Containerobjekt mit den Daten, die dargestellt werden sollen. Objekt muss Nennleistung, KW pro Jahr, Anzahl und Fläche enthalten.
 * @param {string} warningMessage Warnung, die ausgeben werden soll.
 */
Controller.prototype.showEfficiency = function (efficiency, warningMessage) {
    var nominal = 0;
    var perYear = 0;
    var counter = 0;
    var area = 0;
    if (efficiency !== null) {
        nominal += efficiency.nominal;
        perYear += efficiency.perYear;
        counter += efficiency.counter;
        area += efficiency.area;
    }
    this.efficiencyDisplay.setPanelCounter(counter);
    this.efficiencyDisplay.setPanelArea(area);
    this.efficiencyDisplay.setPanelNominal(nominal);
    this.efficiencyDisplay.setPerYear(perYear);
    if (warningMessage === undefined) {
        this.efficiencyDisplay.hideWarning();
    } else {
        this.efficiencyDisplay.showWarning(warningMessage);
    }
};
/* Callbackfunktionen */

/**
 * Callbackfunktion, der den Datenbankserver für den Controller deaktiviert.
 * @callback errorFunction
 */
function callbackDisableServer() {
    if (controller !== undefined) {
        controller.disableServer();
    }
}
/**
 * Callbackfunktion, der dem Benutzer eine CookieID zuteilt.
 * @param {object} data Enthält eine gültige CookieID und ein gültiges Ablaufdatum, die vom Datenbankserver ermittelt wurde.
 * @callback postCookie
 */
function callbackCreateCookie(data) {
    if (controller !== undefined) {
        if (navigator.cookieEnabled) {
            controller.createUserCookie(data.cookie_id, data.ablaufdatum);
        } else {
            alert("Bitte erlauben Sie die Nutzung von Cookie auf dieser Internetseite, um alle Funktionalitäten nutzen zu können");
        }

    }
}
/**
 * Callbackfunktion, die den Inhalt eines vom Datenbankserver empfangenen Cookies verarbeitet.
 * Im Cookie enthalten sind die Liste aller Panels, die der Nutzer angelegt hat und auch das von Ihm zuletzt aufgerufene Dach.
 * @param {object} data Enthält JSON-Objekt mit alle vom Server erhaltenen Daten, die dem Cookie zugeordnert sind.
 * @callback getCookie
 */
function callbackEvaluateCookie(data) {
    if (controller === undefined) {
        return;
    }
    if (data.cookie_id === -1) {
        controller.deleteUserCooke();
    } else {
        data.solarpanelList.forEach(createPanels);
        if (data.modelDach !== null) {
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
            if (roof.gid != null) {
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
/**
 * Callbackfunktion, die ein vom Server empfangenes Dach verarbeitet.
 * @param {Roof} data JSON-Objekt, welches die Datenfelder eines Roof-Objekts enthält.
 * @callback getRoof
 */
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
/**
 * Callbackfunktion, die alle vom Server empfangenen Dachteile verarbeitet.
 * @param {Roof[]} data JSON-Objekte. welche die Datenfelder von Roof-Objekten enthalten.
 * @callback getRoofParts
 */
function callbackGetRoofParts(data) {
    if (controller !== undefined) {
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
