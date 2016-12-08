function MapContainer() {
    this.map = null;
    this.layer = null;
    this.controller = null;
    this.displayedPanels = [];
    this.selectedSolarPolygon = null;
    this.d3Overlay = null;
    this.roof = null;

    this.handlerGroup = null;

    this.appendPanelDirection = {
        "TOP": 1,
        "BOTTOM": 2,
        "LEFT": 3,
        "RIGHT": 4
    }
}

MapContainer.prototype.appendPanel = function (parentpanel, direction, isMoving) {

    var self = this;

    console.log("Append");

    if (direction === self.appendPanelDirection.RIGHT) {

        var rightTop = parentpanel.originTopRight;
        var rightBot = parentpanel.originBotRight;
        var length = parentpanel.length;
        var panelwidth = (parentpanel.originBotRight.lng - parentpanel.originBotLeft.lng);
        var orientation = parentpanel.orientation;
        var pitch = parentpanel.pitch;

        var solarpanel = createSolarpanel(rightTop, length, parentpanel.width, orientation, pitch);

        var handlerPosition = solarpanel.originBotRight;

        var polygon = this.addPolygon(solarpanel);

        if (!isMoving) {

            var moved = null;
            var circle = this.showPanelStringHandler(solarpanel, true);
            var mapC = this.map;

            circle.on({
                mousedown: function () {
                    mapC.on('mousemove', function (e) {

                        var currpos = e.latlng.lng;

                        if (moved == null) {
                            moved = currpos;
                        }

                        console.log("Currpos " + currpos);
                        console.log("Moved" + moved);
                        console.log("Width" + panelwidth);

                        if ((currpos - moved) >= panelwidth) {

                            solarpanel = self.appendPanel(solarpanel, 4, true);
                            handlerPosition = solarpanel.originBotRight;
                            moved = currpos;
                            circle.setLatLng(handlerPosition);
                        }
                        mapC.dragging.disable();
                    });
                }
            });
            mapC.on('mouseup', function (e) {
                mapC.dragging.enable();
                mapC.removeEventListener('mousemove');
            })
        }

        return solarpanel;

    }

    console.log(parentpanel);
    console.log(direction);

};

MapContainer.prototype.updatePolygonPosition = function (solarpanel) {
    //TODO: alignPanel refactoren
    var panel = solarpanel.alignPanel();
    panel.name = "Panel_" + this.displayedPanels.length;

    this.handlerGroup = this.handlerGroup || new L.LayerGroup().addTo(this.map);
    
    var polygon = L.polygon([
            [panel.topLeft.lat, panel.topLeft.lng],
            [panel.topRight.lat, panel.topRight.lng],
            [panel.botRight.lat, panel.botRight.lng],
            [panel.botLeft.lat, panel.botLeft.lng]
        ], {
            color: '#f00',
            draggable: true
        }
    ).addTo(this.handlerGroup);
    return polygon;
};

MapContainer.prototype.showPanelStringHandler = function(solarpanel, show){

    var handlerPosition = solarpanel.originBotRight;

    return L.circle(handlerPosition, 1).addTo(this.handlerGroup);

};

MapContainer.prototype.addPolygon = function(solarpanel) {
    var cont = this.controller;
    var self = this;

    var enableString = $("#panel_string").is(":checked");

    $("#panel_string").on("input change", function () {
       enableString = $(this).is(":checked");
    });

    this.selectedSolarPolygon = this.updatePolygonPosition(solarpanel);
    this.selectedSolarPolygon.panel = solarpanel;
    this.selectedSolarPolygon.on('click', function () {
        selectedSolarPolygon = this;
        var panel = new PanelTool(selectedSolarPolygon);
        cont.updateModel(this);
        cont.connectWithPolygonTool(panel);
        if(enableString){
            self.appendPanel(this.panel, self.appendPanelDirection.RIGHT);
        }
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

MapContainer.prototype.drawRoof = function (polygon) {
    this.roof = polygon;
    this.roof.addTo(this.map);
    this.map.fitBounds(polygon.getBounds());
};

