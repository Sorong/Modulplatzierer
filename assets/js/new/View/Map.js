const INIT_LOCATION = [52.520645, 13.40977]; //Koordinaten in Berlin
const DEFAULT_ZOOM = 19;

function Map() {
    this.map = null;
    this.mapProvider = null;
    this.controller = null;
    this.moveablePolygons = [];
    this.nonMovablePolygon = null;
    this.selectedPolygon = null;
    this.d3Overlay = null;

    this.handlerGroup = null;
}

Map.prototype.init = function () {
    this.map = L.map('map').setView(INIT_LOCATION, DEFAULT_ZOOM);
    this.showGoogle();
    this.d3Overlay = L.d3SvgOverlay(function (selection, projection) {
        this.projection = projection;
    });
    this.d3Overlay.addTo(this.map);

    // Add Clicklistener
    var self = this;
    $('#googleMap').on('click', function(){
        self.showGoogle()
    });

    $('#openstreetMap').on('click', function(){
        self.showOpenstreet()
    });
};

Map.prototype.selectPolygon = function (selectedPolygon) {
    /*if (this.selectedPolygon != null) {
     this.selectedPolygon.transform.disable()
     }*/
    this.selectedPolygon = selectedPolygon;
    //this.controller.updateModel(selectedPolygon);
    this.controller.connectModelWithToolbar(selectedPolygon);
    /*this.connectModelWithToolbar(polygon);
    self.selectedPolygon = this;
    self.controller.updateModel(this);*/
    /*this.selectedPolygon.transform.enable({
     rotation: true,
     scaling: false,
     resize: true
     });*/
};

Map.prototype.addMultiPolygon = function (model) {

    var self = this;
    this.handlerGroup = this.handlerGroup || new L.LayerGroup().addTo(this.map);

    this.selectedPolygon =
        L.polygon(model.getGeoJSON(), {
            color: '#FF0',
            draggable: true,
            transform: true
        }).addTo(this.handlerGroup);

    this.selectedPolygon.model = model;
    this.selectedPolygon.transform.enable({
        rotation: true,
        scaling: false,
        resize: true
    });

    this.selectedPolygon.on('click', function () {
        self.selectPolygon(this);
    });

    // Drag & Drop Events
    this.selectedPolygon.on('dragstart', function (d) {
        self.selectPolygon(this)
    }).on('dragend', function (d) {
        self.selectedPolygon.model.setPosition(d.target._latlngs)
    });

    // Rotation Events
    this.selectedPolygon.on('rotatestart', function (d) {
        self.selectPolygon(this)
    }).on('rotateend', function (d) {
        self.selectedPolygon.model.setOrientation(d.orientation);
        self.selectedPolygon.model.setPosition(d.target._latlngs);
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

    this.moveablePolygons.push(model);
    return this.selectedPolygon;
};

Map.prototype.addPolygon = function (model) {
    var self = this;
    this.selectedPolygon = this.updatePolygonPosition(model);
    this.selectedPolygon.on('click', function () {
        self.selectedPolygon = this;
        self.controller.updateModel(this);
    });
    this.selectedPolygon.on('drag', dragmoveModel);
    this.selectedPolygon.on('dragend', dragendModel);
    this.moveablePolygons.push(model);
    return this.selectedPolygon;
};

Map.prototype.updatePolygonPosition = function (model) {
    model.name = "Solarzelle " + this.moveablePolygons.length;
    this.handlerGroup = this.handlerGroup || new L.LayerGroup().addTo(this.map);

    var polygon = L.polygon(controller.getModelAsList(model), {
        color: '#FF0',
        draggable: true
    }).addTo(this.handlerGroup);
    polygon.model = model;
    return polygon;
};

Map.prototype.setNonMovable = function (model) {
    if (this.nonMovablePolygon !== null) {
        this.removeNonMoveable();
    }
    var polygon = model.getAsPolygon();
    polygon.addTo(this.map);
    polygon.parts = [];
    var parts = model.parts;
    for (var i = 0; i < parts.length; i++) {
        var m = parts[i].getAsPolygon();
        polygon.parts.push(m);
        m.addTo(this.map);
    }
    this.nonMovablePolygon = polygon;
};

Map.prototype.removeNonMoveable = function () {
    if (this.nonMovablePolygon !== null) {
        for (var i = 0; i < this.nonMovablePolygon.parts.length; i++) {
            this.map.removeLayer(this.nonMovablePolygon.parts[i]);
        }
        this.map.removeLayer(this.nonMovablePolygon);
    }
};


Map.prototype.setFocus = function (lat, lng) {
    this.map.setView(new L.LatLng(lat, lng), DEFAULT_ZOOM);
};


/* Konvertierung LatLng zu Punkt und umgekehrt */
Map.prototype.layerPointToLatLng = function (point) {
    return this.d3Overlay.projection.layerPointToLatLng(point);
};

Map.prototype.latLngToLayerPoint = function (latLng) {
    return this.d3Overlay.projection.latLngToLayerPoint(latLng);
};

Map.prototype.containerPointToLatLng = function (point) {
    return this.map.containerPointToLatLng(point);
};

/* Kartentypen */
Map.prototype.showGoogle = function () {
    var layer = L.gridLayer.googleMutant({
        type: 'satellite',
        maxZoom: 20
    });
    this.changeMapProvider(layer);
};

Map.prototype.showOpenstreet = function () {
    var mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    var layer = L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18
        });
    this.changeMapProvider(layer);
};

Map.prototype.changeMapProvider = function (layer) {
    if (this.mapProvider) {
        this.map.removeLayer(this.mapProvider);
    }
    this.mapProvider = layer;
    this.map.addLayer(this.mapProvider);
};

/* Dragfunktionnen */
function dragmoveModel(d) {
    updateModelPosition(d);
}

function dragendModel(d) {
    updateModelPosition(d);
    controller.updateModelPosition(d.target);
}

function updateModelPosition(draggedPolygon) {
    var d = draggedPolygon;
    var arr = [];
    arr.push(d.target._latlngs[0][0]);
    arr.push(d.target._latlngs[0][1]);
    arr.push(d.target._latlngs[0][2]);
    arr.push(d.target._latlngs[0][3]);

    d.target.model.setPointsFromList(arr);

}