function MapContainer() {
    this.map = null;
    this.layer = null;
    this.controller = null;
    this.displayedPanels = [];
    this.selectedSolarPolygon = null;
    this.d3Overlay = null;
    this.roof = null;
}

MapContainer.prototype.updatePolygonPosition = function (solarpanel) {
    //TODO: alignPanel refactoren
    var panel = solarpanel.alignPanel();
    panel.name = "Panel_" + this.displayedPanels.length;
    
    var polygon = L.polygon([
            [panel.topLeft.lat, panel.topLeft.lng],
            [panel.topRight.lat, panel.topRight.lng],
            [panel.botRight.lat, panel.botRight.lng],
            [panel.botLeft.lat, panel.botLeft.lng]
        ], {
            color: '#f00',
            draggable: true
        }
    ).addTo(this.map);
    return polygon;
};

MapContainer.prototype.addPolygon = function(solarpanel) {
    var cont = this.controller;
    this.selectedSolarPolygon = this.updatePolygonPosition(solarpanel);
    this.selectedSolarPolygon.panel = solarpanel;
    this.selectedSolarPolygon.on('click', function () {
        selectedSolarPolygon = this;
        var panel = new PanelTool(selectedSolarPolygon);
        cont.updateModel(this);
        cont.connectWithPolygonTool(panel);
    });
    this.selectedSolarPolygon.on('drag', dragmovePanel);
    this.selectedSolarPolygon.on('dragend', dragendPanel);
    this.displayedPanels.push(solarpanel);
    return this.selectedSolarPolygon;
};

MapContainer.prototype.showGoogleMaps = function () {
    if (this.layer) {
       this.map.removeLayer(this.layer);
    }
    this.layer = L.gridLayer.googleMutant({
        type: 'satellite',
        maxZoom: 20
    });
    this.map.addLayer(this.layer);
};

MapContainer.prototype.showOpenstreetMap = function () {
    if (this.layer) {
        this.map.removeLayer(this.layer);
    }
    var mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    this.layer = L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 20
        });
    this.map.addLayer(this.layer);
};

MapContainer.prototype.layerPointToLatLng = function (point) {
  return this.d3Overlay.projection.layerPointToLatLng(point);
};

MapContainer.prototype.latLngToLayerPoint = function (latLng) {
    return this.d3Overlay.projection.latLngToLayerPoint(latLng);
};

MapContainer.prototype.drawRoof = function (polygon) {
    this.roof = polygon;
    this.roof.addTo(this.map);
    this.map.fitBounds(polygon.getBounds());
};

