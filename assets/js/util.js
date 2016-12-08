function updatePanelPosition(draggedPanel) {
    var d = draggedPanel;
    d.target.panel.topLeft.lat = d.target._latlngs[0][0].lat;
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
    if(controller.serverAvailable) {
        controller.serverHandler.updatePanelToServer(controller.cookieId, d.target.panel);
    }
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

function translateCoordinates(distance, point, angle) {
    earthRadius = 6371000;
    distanceNorth = Math.sin(angle * Math.PI / 180) * distance;
    distanceEast = Math.cos(angle * Math.PI / 180) * distance;
    newLat = point.lat + (distanceNorth / earthRadius) * (180 / Math.PI);
    newLon = point.lng + (distanceEast / earthRadius) * (180 / Math.PI) / Math.cos(point.lat * Math.PI / 180);
    return L.latLng(newLat, newLon);
}

function GET_DUMMY_DACH() {
    var json = {
        "gid": 38063,
        "gmlid": "BLDG_0003000000894894",
        "nr": "2138",
        "street": "Illerzeile",
        "number": "5",
        "plz": 13509,
        "hid": 38063,
        "ort": "Berlin",
        "zusatz": "",
        "denkmal": false,
        "denkmali": null,
        "monument_reason": null,
        "area2d": 167.043701171875,
        "area3d": 218.7119074665735,
        "pv": 2,
        "st": 2,
        "gd": null,
        "doneby": 31412,
        "calctime": 3.58577,
        "qhint": null,
        "household_size": 0,
        "gd_area": 0,
        "rueckhalt": 0,
        "the_geom": [
            {
                "latitude": 52.587197,
                "longitude": 13.292041
            },
            {
                "latitude": 52.587262,
                "longitude": 13.291927
            },
            {
                "latitude": 52.587367,
                "longitude": 13.292086
            },
            {
                "latitude": 52.587334,
                "longitude": 13.292143
            },
            {
                "latitude": 52.587302,
                "longitude": 13.292199
            },
            {
                "latitude": 52.587197,
                "longitude": 13.292041
            }
        ],
        "rt_geom": [
            {
                "latitude": 61.049414,
                "longitude": 33.310396
            },
            {
                "latitude": 61.049545,
                "longitude": 33.310232
            },
            {
                "latitude": 61.049666,
                "longitude": 33.310641
            },
            {
                "latitude": 61.0496,
                "longitude": 33.310722
            },
            {
                "latitude": 61.049534,
                "longitude": 33.310803
            },
            {
                "latitude": 61.049414,
                "longitude": 33.310396
            }
        ]
    };
    return json;
}