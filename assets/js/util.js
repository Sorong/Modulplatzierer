function connectPolygonTools(panel) {
    panel.pitchSlider().on("input change", function () {

        var pitch = $(this).val();

        selectedSolarPolygon.panel.setPitch(pitch);
        alignPanel(selectedSolarPolygon.panel);
        updateLatLngs(selectedSolarPolygon);

    }).change(function () {
        serverHandler.updatePanelToServer(roofId, selectedSolarPolygon.panel);
    });

    panel.heightSlider().on("input change", function () {

        var height = $(this).val();

        console.log("Panel: " + selectedSolarPolygon.panel.name + " set height: " + height);
        selectedSolarPolygon.panel.length = height;
        selectedSolarPolygon.panel.realign();
        updateLatLngs(selectedSolarPolygon);

    }).change(function () {
        serverHandler.updatePanelToServer(roofId, selectedSolarPolygon.panel);
    });

    panel.widthSlider().on("input change", function () {

        var width = $(this).val();

        console.log("Panel: " + selectedSolarPolygon.panel.name + " set width: " + width);
        selectedSolarPolygon.panel.width = width;
        selectedSolarPolygon.panel.realign();
        updateLatLngs(selectedSolarPolygon);

    }).change(function () {
        serverHandler.updatePanelToServer(roofId, selectedSolarPolygon.panel);
    });

    panel.orientationSlider().on("input change", function () {

        var orientation = $(this).val();

        console.log("Panel: " + selectedSolarPolygon.panel.name + " set orientation: " + orientation);
        selectedSolarPolygon.panel.setOrientation(orientation);
        selectedSolarPolygon.panel.realign();
        updateLatLngs(selectedSolarPolygon);

    }).change(function () {
        serverHandler.updatePanelToServer(roofId, selectedSolarPolygon.panel);
    });
}

function updatePanelPosition(draggedPanel) {
    var d = draggedPanel;
    d.target.panel.topLeft.lat = d.target._latlngs[0][1].lat;
    d.target.panel.topLeft.lng = d.target._latlngs[0][0].lng;

    d.target.panel.topRight.lat = d.target._latlngs[0][1].lat;
    d.target.panel.topRight.lng = d.target._latlngs[0][1].lng;

    d.target.panel.botRight.lat = d.target._latlngs[0][2].lat;
    d.target.panel.botRight.lng = d.target._latlngs[0][2].lng;

    d.target.panel.botLeft.lat = d.target._latlngs[0][3].lat;
    d.target.panel.botLeft.lng = d.target._latlngs[0][3].lng;
}

function dragmovePanel(d) {
    updatePanelPosition(d);
}

function dragendPanel(d) {
    updatePanelPosition(d);
    d.target.panel.realign();
    serverHandler.updatePanelToServer(roofId, d.target.panel);
}

function dragstarted() {
    dragCoords = {x: 0, y: 0};
    d3.event.sourceEvent.stopPropagation();
}

function dragmove(d) {
    // First run?
    if (dragCoords.x == 0 && dragCoords.y == 0) {
        var t = d3.transform(d3.select(this).attr("transform"));
        dragCoords.x = t.translate[0];
        dragCoords.y = t.translate[1];
    }

    dragCoords.x += d3.event.dx;
    dragCoords.y += d3.event.dy;

    console.log(d);

    d3.select(this).attr("transform", "translate(" + dragCoords.x + "," + dragCoords.y + ")");
    d.LatLng = d3Overlay.projection.layerPointToLatLng(new L.Point(dragCoords.x, dragCoords.y));
}
