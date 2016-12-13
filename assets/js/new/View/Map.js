const INIT_LOCATION = [52.520645, 13.40977];
const DEFAULT_ZOOM = 20;

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

}

Map.prototype.init = function () {
    this.map = L.map('map').setView(INIT_LOCATION, DEFAULT_ZOOM);
    this.showGoogle();
    this.d3Overlay = L.d3SvgOverlay(function (selection, projection) {
        this.projection = projection;
    });
    this.d3Overlay.addTo(this.map);
};

Map.prototype.addPolygon = function (model) {
    var self = this;
    this.selectedPolygon = this.updatePolygonPosition(model);
    this.selectedPolygon.on('click', function () {
        selectedPolygon = this;
        self.controller.updateModel(this);
    })
};

Map.prototype.updatePolygonPosition = function (model) {
    model.name = "Solarzelle " + this.moveablePolygons.length;
    this.handlerGroup = this.handlerGroup || new L.LayerGroup().addTo(this.map);

    var polygon = L.polygon(controller.getModelAsList(model), {
        color: '#F00',
        draggable: true
    }).addTo(this.handlerGroup);
    polygon.model = model;
    return polygon;
};

Map.prototype.setNonMovable = function (polygon) {

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