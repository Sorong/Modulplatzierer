function MapContainer() {
    var map, layer;
    var displayedPanels = [];
    var selectedSolarPolygon = null;
    var d3Overlay = null;
}

MapContainer.prototype.updateLatLngs = function (polygon) {
    polygon.setLatLngs([
        [polygon.panel.topLeft.lat,        polygon.panel.topLeft.lng],
        [polygon.panel.topRight.lat,       polygon.panel.topRight.lng],
        [polygon.panel.botRight.lat,    polygon.panel.botRight.lng],
        [polygon.panel.botLeft.lat,     polygon.panel.botLeft.lng]
    ]);
};

MapContainer.prototype.updatePolygonPosition = function (solarpanel) {
    if(this.displayedPanels === undefined) {
        this.displayedPanels = [];
    }
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
    this.selectedSolarPolygon = this.updatePolygonPosition(solarpanel);
    this.selectedSolarPolygon.panel = solarpanel;
    var mapC = this;
    this.selectedSolarPolygon.on('click', function () {
        selectedSolarPolygon = this;
        var panel = new PanelTool(selectedSolarPolygon);
        mapC.updateLatLngs(this);
        connectPolygonTools(panel);
    });
    /* TODO: return statt writeToDatabase
    if (writeToDatabase) {
        postPanelToServer(roofId, solarpanel);
    }
    */
    this.selectedSolarPolygon.on('drag', dragmovePanel);
    this.selectedSolarPolygon.on('dragend', dragendPanel);
    this.displayedPanels.push(solarpanel);
    return solarpanel;
};

MapContainer.prototype.showGoogleMaps = function () {
    if (this.layer) {
        map.removeLayer(layer);
    }
    this.layer = L.gridLayer.googleMutant({
        type: 'satellite',
        maxZoom: 20
    });
    this.map.addLayer(this.layer);
};

MapContainer.prototype.showOpenstreetMap = function () {
    if (this.layer) {
        map.removeLayer(layer);
    }
    var mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    this.layer = L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18
        });
    this.map.addLayer(this.layer);
};

MapContainer.prototype.layerPointToLatLng = function (point) {
  return this.d3Overlay.projection.layerPointToLatLng(point);
};

MapContainer.prototype.latLngToLayerPoint = function (latLng) {
    return this.d3Overlay.projection.latLngToLayerPoint(latLng);
};



