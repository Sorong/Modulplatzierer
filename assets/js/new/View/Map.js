/**
 * Gibt die Ort an, der beim Laden der Seite initial angezeigt wird.
 * Gibt die Lokation, in Längen-, Breitengrad, an, die beim Laden der Seite als erstes angezeigt wird.
 *
 * @constant
 * @type {number[]}
 */
const INIT_LOCATION = [52.520645, 13.40977]; //Koordinaten in Berlin

/**
 * Gibt an mit welcher Zoomstufe die Karte bei der Initialisierung geladen werden soll.
 *
 * @constant
 * @type {number} Standardzoomstufe
 */
const DEFAULT_ZOOM = 20;

/**
 * Konstruktor des Map-Objektes.
 * Das Map-Objekt ist eine Containerklasse zur Darstellung von Karten der Kartenprovider GoogleMaps und Openstreetmap.
 * Darüberhinaus das Objekt der Visualisierung von beweglichen und unbeweglichen Polygonen.
 * @class
 * @constructor
 * @property {L.map} map Karte die dargestellt wird.
 * @property {L.tileLayer|L.gridLayer.googleMutant} mapProvider Layer der Karte die dargestellt wird.
 * @property {Controller} controller Der mit der Karte assoziierte Controller.
 * @property {L.polygon[]} moveablePolygons Liste aller beweglichen Polygonen.
 * @property {L.polygon[]} nonMoveablePolygon Liste aller unbeweglicher Polygone.
 * @property {L.polygon} selectedPolygon Aktuell ausgewähltes Polygon.
 * @property {L.d3SvgOverlay} d3Overlay Layer zur Berechnung von Koordinaten.
 * @property {L.LayerGroup} handlerGroup Layer mit beweglichen Polygonen.
 */
function Map() {
    this.map = null;
    this.mapProvider = null;
    this.controller = null;
    this.moveablePolygons = [];
    this.nonMovablePolygon = [];
    this.selectedPolygon = null;
    this.d3Overlay = null;

    this.handlerGroup = null;
}

/**
 * Initialisierung der Karte, hier werden die Buttons mit Funktionen der Karte verknüpft und die Karte vom Kartenprovider geladen.
 */
Map.prototype.init = function () {
    this.map = L.map('map', {drawControl: false, editable: true}).setView(INIT_LOCATION, DEFAULT_ZOOM);
    this.showGoogle();
    this.d3Overlay = L.d3SvgOverlay(function (selection, projection) {
        this.projection = projection;
    });
    this.d3Overlay.addTo(this.map);

    var self = this;

    // Roof
    $("#drawRoof").on('click', function () {
        var polygonDrawer = new L.Draw.Polygon(self.map);
        polygonDrawer.enable();
    });

    this.map.on(L.Draw.Event.CREATED, function (data) {
        controller.createRoof(data);
    });

    // Add Clicklistener
    $('#googleMap').on('click', function () {
        self.showGoogle()
    });

    $('#openstreetMap').on('click', function () {
        self.showOpenstreet()
    });
};

/**
 * Es wird angegeben, welches Polygon Objekt ausgewählt wurde.
 * Hierzu wird noch zusätzlich die {@link Controller#connectModelWithToolbar} aktiviert,
<<<<<<< HEAD
 * um Einstellungen für die das selektiere Polygon durchzuführen.
=======
 * um Einstellungen für die Panels vorzunehmen.
>>>>>>> 217180dd2d807bf347dc9f3f1d17bd23add5b3f2
 *
 * @param {L.polygon} selectedPolygon - Ausgewähltes Polygon-Objekt.
 */
Map.prototype.selectPolygon = function (selectedPolygon) {
    this.selectedPolygon = selectedPolygon;
    this.controller.connectModelWithToolbar(selectedPolygon);
};

/**
 * Hier wird ein bewegliches Polygon als Multipolygon angelegt.
 * Dies wird mit einem Clicklistener verknüpft, außerdem werden Handler für die Rotation, Skalierung und Drag-Funktionalität eingerichtet.
 * Das Polygon wird auf der Karte dargestellt und in die Liste der beweglichen Polygone eingefügt.
 *
 * @param {Panel|PanelString} model Das Model, dass mit dem Polygon assoziert wird. Die Geodaten werden vom Controller ermittelt {link Controller#getGeoJSON}.
 * @return {L.polygon} Das angelegte Polygon.
 */
Map.prototype.addMultiPolygon = function (model) {

    var self = this;
    this.handlerGroup = this.handlerGroup || new L.LayerGroup().addTo(this.map);

    this.selectedPolygon =
        L.polygon(self.controller.getGeoJSON(model), {
            color : "#FFF",
            fillColor: '#FF0',
            draggable: true,
            transform: true,
            opacity : 0.5,
            weight : model.getFrameWidth(),
            lineJoin : "miter"
        }).addTo(this.handlerGroup);

    this.selectedPolygon.model = model;
    this.selectedPolygon.transform.enable({
        rotation: true,
        scaling: false,
        resize: true
    });

    var orientation = model.masterPanel.orientation.toFixed(0) || 0;
    this.selectedPolygon.transform.setStartOrientation(orientation);

    this.selectedPolygon.on('click', function () {
        self.selectPolygon(this);
    });

    // Drag & Drop Events
    this.selectedPolygon.on('dragstart', function (d) {
        self.selectPolygon(this)
    }).on('dragend', function (d) {
        self.controller.updateModel(self.selectedPolygon, d.target._latlngs);
    });

    // Rotation Events
    this.selectedPolygon.on('rotatestart', function (d) {
        self.selectPolygon(this)
   }).on('rotate', function (d) {
        if (self.controller.toolbar != null)
            self.controller.toolbar.setOrientation(d.orientation);
    }).on('rotateend', function (d) {
        self.controller.updateModel(self.selectedPolygon, d.target._latlngs, d.orientation);
    });

    // Resize Events
    var lastDistance = 0;
    var moveDirection = 1; // left: -1, right: 1
    this.selectedPolygon.on('resizestart', function (d) {
        self.selectPolygon(this);
    }).on('resize', function (d) {

        var startCoord = this._latlngs[0][0];
        var endCoord = this._latlngs[0][1];
        var distance = startCoord.distanceTo(endCoord);
        var currentDistance = parseInt((d.distance / distance));

        moveDirection = (currentDistance < lastDistance) ? -1 : 1;

        var isAddOrRemoveBorderExceeded = (
            (currentDistance >= 2 && moveDirection == 1 || currentDistance >= 1 && moveDirection == -1)
            && lastDistance != currentDistance
        );
        if (isAddOrRemoveBorderExceeded) {
            if (currentDistance > lastDistance) {
                self.controller.appendModel(self.selectedPolygon.model);
            } else {
                self.controller.removeModel(self.selectedPolygon.model);
            }
            self.selectedPolygon.setLatLngs(self.controller.getGeoJSON(model));
            lastDistance = currentDistance
        }

    });

    this.moveablePolygons.push(this.selectedPolygon);
    return this.selectedPolygon;
};

/**
 * Hier wird ein nicht bewegliches Polygon angelegt. Das Polygon wird in den Hintergrund verschoben, um bewegliche Polygone nicht einzuschränken.
 * Das Polygon wird in die Liste der unbeweglichen Polygone eingefügt.
 * @param {Roof} model - Darzustellendes unbewegliches Model, welches mit dem Polygon verknüpft wird.
 */
Map.prototype.addNonMovable = function (model) {
    var polygon = model.getAsPolygon();
    polygon.addTo(this.map);
    polygon.bringToBack();
    this.nonMovablePolygon.push(polygon);
};

/**
 * Entfernt alle nicht beweglichen Polygone von der Karte und aus der Liste der nicht beweglichen Polygone.
 */
Map.prototype.removeAllNonMoveable = function () {
    while (this.nonMovablePolygon.length !== 0) {
            this.map.removeLayer(this.nonMovablePolygon.pop());
    }
};

/**
 * Die Karte wird auf die übergebenen Koordinaten, mit der Standardzoomstufe, zentriert.
 *
 * @param {number} lat - Längengrad (latitude)
 * @param {number} lng - Breitengrad (longitude)
 */
Map.prototype.setFocus = function (lat, lng) {
    this.map.setView(new L.LatLng(lat, lng), DEFAULT_ZOOM);
};


/* Konvertierung LatLng zu Punkt und umgekehrt */

/**
 * Konvertiert einen Punkt auf der Karte zu einem Längen- und Breitengrad.
 *
 * @param {L.point} point - Punkt auf der Karte.
 * @returns {L.latLng} Längen-, Breitengrad.
 */
Map.prototype.layerPointToLatLng = function (point) {
    return this.d3Overlay.projection.layerPointToLatLng(point);
};

/**
 * Konvertiert Längen- und Breitengrad zu dem entsprechendem Punkt (X/Y-Koordinaten).
 *
 * @param {L.latLng} latLng - Koordinaten als Längen-, Breitengrad
 * @returns {L.point} Punkt auf der Karte
 */
Map.prototype.latLngToLayerPoint = function (latLng) {
    return this.d3Overlay.projection.latLngToLayerPoint(latLng);
};


/**
 * Konvertiert Längen- und Breitengrad zu dem entsprechendem Punkt (X/Y-Koordinaten).
 * Unter Berücksichtigung der Größe des entsprechenden HTML-Elementes.
 *
 * @param {L.point} point - Punkt auf der Karte
 * @returns {L.latLng} Längen-, Breitengrad
 */
Map.prototype.containerPointToLatLng = function (point) {
    return this.map.containerPointToLatLng(point);
};

/**
 * Zeigt als Kartenlayer Google Maps an
 */
Map.prototype.showGoogle = function () {
    var layer = L.gridLayer.googleMutant({
        type: 'satellite',
        maxZoom: 20
    });
    this.changeMapProvider(layer);
};

/**
 * Zeigt als Kartenlayer Openstreetmap an
 */
Map.prototype.showOpenstreet = function () {
    var mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    var layer = L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18
        });
    this.changeMapProvider(layer);
};

/**
 * Es wird der übergebe Layer als Kartenlayer angezeigt und der vorher ausgewählte wird entfernt.
 *
 * @param {L.tileLayer|L.gridLayer.googleMutant} layer - Kartenlayer
 */
Map.prototype.changeMapProvider = function (layer) {
    if (this.mapProvider) {
        this.map.removeLayer(this.mapProvider);
    }
    this.mapProvider = layer;
    this.map.addLayer(this.mapProvider);
};

/**
 * Es wird das ausgewählte Panel von der Karte und aus der Liste der beweglichen Polygone entfernt.
 *
 */
Map.prototype.removeSelected = function () {
    this.selectedPolygon.transform.disable();
    this.map.removeLayer(this.selectedPolygon);
    for(var i = 0; i < this.moveablePolygons.length; i++) {
        if(this.selectedPolygon.model.equals(this.moveablePolygons[i].model)) {
            this.moveablePolygons.splice(i, 1);
            return;
        }
    }
};
