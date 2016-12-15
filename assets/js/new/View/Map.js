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

Map.prototype.addMultiPolygon = function (model){
  var self = this;
    this.handlerGroup = this.handlerGroup || new L.LayerGroup().addTo(this.map);

    this.selectedPolygon =
        L.polygon(model.getGeoJSON(), {
            color: '#FF0',
            draggable: true,
            transform: true
        }).addTo(this.handlerGroup);
    this.selectedPolygon.transform.enable({rotation: true, scaling: true});
    this.selectedPolygon.on("resizestart", function(){
        console.log("resizestart")
    });
    this.selectedPolygon.on("transform", function(d){
        console.log("Transform")
        console.log(d)
    })
    this.selectedPolygon.on('scalestart', function(d){
        console.log(d)
    })
    this.selectedPolygon.on('scale', function(d){
        console.log("Scale");
        console.log(d.matrix._matrix);
        if(d.matrix._matrix[0] > 2){
            model.appendPanel();
            selectedPolygon.setLatLngs(model.getGeoJSON());
        }
        console.log(d.rect._latlngs)
        console.log(d.rect._pxBounds)
    })
    this.selectedPolygon.on('scaleend', function(d){
        console.log("Scale End");
        //console.log(d)
        console.log(d);
        console.log(d.rect._latlngs)
        console.log(d.rect._pxBounds)
    })
    this.selectedPolygon.on("resize", function(d){
        console.log("resize")
        console.log(d)
    });
    this.selectedPolygon.on("resizeend", function(){
        console.log("resizeend")
    });
    this.selectedPolygon.on("drag", function(){
        console.log("dragxxx")
    });
    this.selectedPolygon.on("dragend", function(){
        console.log("dragend")
    });
    this.selectedPolygon.model = model;
    this.selectedPolygon.on('click', function () {
        selectedPolygon = this;
        self.controller.updateModel(this);
    });
    this.selectedPolygon.on('drag', dragmoveModel);
    this.selectedPolygon.on('dragend', dragendModel);
    this.moveablePolygons.push(model);
    return this.selectedPolygon;
};

Map.prototype.addPolygon = function (model) {
    var self = this;
    this.selectedPolygon = this.updatePolygonPosition(model);
    this.selectedPolygon.on('click', function () {
        selectedPolygon = this;
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

/* Dragfunktionnen */
function dragmoveModel(d) {
    console.log("test " + d.target._latlngs[0][0]);
    updateModelPosition(d);
}

function dragendModel(d) {
    updateModelPosition(d);
    d.target.model.align(controller);
}


function updateModelPosition(draggedPolygon) {
    var d = draggedPolygon;
    var arr = [];
    arr.push(d.target._latlngs[0][0]);
    arr.push(d.target._latlngs[0][1]);
    arr.push(d.target._latlngs[0][2]);
    arr.push(d.target._latlngs[0][3]);

    d.target.model.getPointsFromList(arr);

}