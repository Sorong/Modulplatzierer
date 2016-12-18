const INIT_LOCATION = [52.520645, 13.40977]; //Koordinaten in Berlin
const DEFAULT_ZOOM = 18;

function Map() {
    this.map = null;
    /*   Notwendig?
     var mapHeight = $('#map').get(0).offsetHeight;
     var mapWidth = $('#map').get(0).offsetWidth;*/
    this.mapProvider = null;
    this.controller = null;
    this.moveablePolygons = [];
    this.nonMovablePolygon = null;
    this.selectedPolygon = null;
    this.d3Overlay = null;

    this.handlerGroup = null;
    this.lastPanelAppendPosition = null;
}

Map.prototype.init = function () {
    this.map = L.map('map').setView(INIT_LOCATION, DEFAULT_ZOOM);
    this.showGoogle();
    this.d3Overlay = L.d3SvgOverlay(function (selection, projection) {
        this.projection = projection;
    });
    this.d3Overlay.addTo(this.map);
};

Map.prototype.addMultiPolygon = function (model) {
    console.log(model);
    var self = this;
    this.handlerGroup = this.handlerGroup || new L.LayerGroup().addTo(this.map);
    this.selectedPolygon =
        L.polygon(model.getGeoJSON(), {
            color: '#FF0',
            draggable: true,
            transform: true
        }).addTo(this.handlerGroup);
    this.selectedPolygon.model = model;
    this.selectedPolygon.transform.enable(
        {
            rotation: true,
            scaling: false,
            resize: true
        });

    var rotation = 0;
    this.selectedPolygon.on("rotatestart", function (d) {

    });

    this.selectedPolygon.on("rotate", function (d) {
        rotation = d.rotation;
    });

    this.selectedPolygon.on("rotateend", function (d) {
        // TODO Begrenzung einfügen, unser Panel unterstützt nur 0-360!
        // TODO callback liefert im Moment die falsche Rotation, bzw keine nur in 'rotate' selbst
        selectedPolygon.model.setOrientationWithRadiant(rotation);
        rotation = 0;
    });

    this.selectedPolygon.on("resizestart", function () {
        console.log("resizestart")
    });
    var lastDistance = 0;
    // left: -1, right: 1
    var direction = 1;
    this.selectedPolygon.on('resize', function (d) {
        selectedPolygon = this;
        var startCoord = this._latlngs[0][0];
        var endCoord = this._latlngs[0][1];
        var distance = startCoord.distanceTo(endCoord);

        var currentDistance = parseInt((d.distance / distance));

        direction = (currentDistance < lastDistance) ? -1 : 1;

        if ((currentDistance >= 2 && direction == 1 || currentDistance >= 1 && direction == -1)
            && lastDistance != currentDistance) {
            if (currentDistance > lastDistance) {
                var panel = new Panel();
                model.appendPanel(panel);
            } else {
                model.removePanel();
            }
            selectedPolygon.setLatLngs(model.getGeoJSON());
            lastDistance = currentDistance
        }

    });

    this.selectedPolygon.on("resizeend", function () {
        console.log("resizeend")
    });


    this.selectedPolygon.on('click', function () {
        selectedPolygon = this;
        self.controller.updateModel(this);
    });

    this.selectedPolygon.on('drag', function (d) {
        console.log("Drag");
        console.log(d)
    });
    this.selectedPolygon.on('dragend', function (d) {
        console.log("DragEnd")
        model.setNewPosition(d.target._latlngs)
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