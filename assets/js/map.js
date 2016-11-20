/* Konstanten */
var DAYS_TILL_COOKIE_EXPIRE = 30;
var COOKIENAME = "Modulplatzierer";

/* Variablen */
var cookieId;
var roofId;

var map;
var solarpanels = [];
var selectedSolarPolygon = null;

var d3Overlay;

var dragCoords = {x: 0, y: 0};


function init() {
    eraseCookie(COOKIENAME);
    cookieId = readCookie(COOKIENAME);
    if(cookieId === null || cookieId === "undefined") {
        var dueDate = new Date().getTime()+(DAYS_TILL_COOKIE_EXPIRE*24*60*60*1000);
        createCookieFromServer(dueDate);
    } else {
        getPanelsFromServer(cookieId);
    }
}

function setCookie(cid, dueDate) {
    cookieId = cid;
    createCookie(COOKIENAME, cid, dueDate);
    //PostRoof wird mir Dummydach aufgerufen
    postRoofToServer({
        dach_id : 0,
        strasse : "Musterstraße",
        hausnummer : "5",
        postleitzahl : "12345",
        dachneigung : 45,
        koord_dachmitte_lng : 12,
        koord_dachmitte_lat : 12,
        cookie : {
            cookie_id : cid,
            dach_ids : []
        },
        ablaufdatum : dueDate
    });
    alert("cookieId: " + cookieId);
}

function setRoofId(rid) {
    roofId = rid;
    alert("roofId: " + roofId);
}

function updateFromServer(paneldata) {
    if(paneldata === "undefined") {
        return;
    }
    paneldata.forEach(loadPanel);
    function loadPanel(element, index, array) {
        var panel = loadSolarpanel(
          element.obenLinks, element.obenRechts, element.obenLinks, element.obenRechts, element.neigung, element.ausrichtung
        );
        addPanel(panel);
    }
    /* TODO: Auf Solarpanel fokussieren
    map.setView(solarpanels[0].originTopLeft.lat, solarpanels[0].originTopLeft.lng, 18);
    */
}

function addPanel(solarpanel, d3Overlay) {

    solarpanel.name = "Panel_" + (solarpanel.length);
    alignPanel(solarpanel, d3Overlay, 0, 45);

    var solarpanelpolygon = L.polygon([
            [solarpanel.topleft.lat, solarpanel.topleft.lng],
            [solarpanel.topright.lat, solarpanel.topright.lng],
            [solarpanel.bottomright.lat, solarpanel.bottomright.lng],
            [solarpanel.bottomleft.lat, solarpanel.bottomleft.lng]
        ], {
            color: '#f00',
            draggable: true
        }
    ).addTo(map);

    solarpanelpolygon.panel = solarpanel;
    solarpanelpolygon.on('click', function () {

        selectedSolarPolygon = this;
        console.log("Click Panel: " + selectedSolarPolygon.panel.name);

        var panel = new PanelTools(selectedSolarPolygon);
        panel.tilt().on("change mousemove", function () {

            var val = $(this).val();

            alignPanel(selectedSolarPolygon.panel, d3Overlay, val, selectedSolarPolygon.panel.pitch);

            selectedSolarPolygon.setLatLngs([
                [selectedSolarPolygon.panel.topleft.lat, selectedSolarPolygon.panel.topleft.lng],
                [selectedSolarPolygon.panel.topright.lat, selectedSolarPolygon.panel.topright.lng],
                [selectedSolarPolygon.panel.bottomright.lat, selectedSolarPolygon.panel.bottomright.lng],
                [selectedSolarPolygon.panel.bottomleft.lat, selectedSolarPolygon.panel.bottomleft.lng]
            ]);

        }).change(function () {

            var val = $(this).val();
            // Data changed

        });

        panel.height().on("change mousemove", function () {

            var val = $(this).val();
            console.log("Panel: " + selectedSolarPolygon.panel.name + " set height: " + val);

        });

        panel.width().on("change mousemove", function () {

            var val = $(this).val();
            console.log("Panel: " + selectedSolarPolygon.panel.name + " set width: " + val);

        });

    });
    postPanelToServer(solarpanel);
    solarpanelpolygon.on('drag', dragmovePanel);
    solarpanels.push(solarpanel);
}

function dragmovePanel(d) {

    console.log("Drag Panel: " + d.target.panel.name);

    d.target.panel.topleft.lat = d.target._latlngs[0][0].lat;
    d.target.panel.topleft.lng = d.target._latlngs[0][0].lng;

    d.target.panel.topright.lat = d.target._latlngs[0][1].lat;
    d.target.panel.topright.lng = d.target._latlngs[0][1].lng;

    d.target.panel.bottomright.lat = d.target._latlngs[0][2].lat;
    d.target.panel.bottomright.lng = d.target._latlngs[0][2].lng;

    d.target.panel.bottomleft.lat = d.target._latlngs[0][3].lat;
    d.target.panel.bottomleft.lng = d.target._latlngs[0][3].lng;

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



window.onload = function () {

    var toolsContainer = $("#tools");

    var mapHeight = document.getElementById("map").offsetHeight;
    var mapWidth = document.getElementById("map").offsetWidth;


    map = L.map('map').setView([52.46806645297567, 10.534391955698084], 18);
    var layer, d3Overlay;

    showGoogleMap();


    var drag = d3.behavior.drag()
        .origin(function () {
            return {x: 0, y: 0};
        })
        .on("dragstart", dragstarted)
        .on("drag", dragmove);

    var dragPanel = d3.behavior.drag()
        .origin(function () {
            return {x: 0, y: 0};
        })
        .on("drag", dragmovePanel);


    //
    // Roof
    //
    /*
     http://www.solare-stadt.de/zgb/SolarDachAtlas?s=101
     http://details.v06.solare-stadt.de/p/318037/SB8BAF6T/
     http://details.v06.solare-stadt.de/mp/318037/SB8BAF6T/5/

     Alfred-Teves-Straße 14, 38518 Gifhorn, Deutschland
     Breitengrad : 52.466854 | Längengrad : 10.53532
     */
    var roof = L.polygon([
        [52.46847495386419, 10.533764318788599],
        [52.46853377767989, 10.534858660066675],
        [52.46771350515504, 10.53499277051742],
        [52.467667752452556, 10.533882335985254],
        [52.46847495386419, 10.533764318788599]
    ]).addTo(map);

    /*
    // Panels
    //
    var panels = [];
    d3.json("rectangle.json", function (data) {
        panels = data.features;
        var i = 0;
        panels.forEach(function (d) {
            d.name = "Panel_" + (++i);
            var coords = d.geometry.coordinates;
            d.LatLng = new L.LatLng(coords[0], coords[1]);
        });
        d3Overlay.addTo(map)
    });
    */

    d3Overlay = L.d3SvgOverlay(function (selection, projection) {

        this.projection = projection;

     /*   var feature = selection.selectAll('rect').data(panels);
        feature.enter()
            .append("rect")
            .style("stroke", "black")
            .style("opacity", .6)
            .style("fill", "red")
            .attr("width", 30)
            .attr("height", 50)
            .call(drag);

        map.on("zoom", update);
        update();

        function update() {
            feature.attr("transform",
                function (d) {
                    return "translate(" +
                        projection.latLngToLayerPoint(d.LatLng).x + "," +
                        projection.latLngToLayerPoint(d.LatLng).y + ")";
                }
            );
        }*/
    });

    d3Overlay.addTo(map);

    function showOpenStreetMap() {
        if (layer) {
            map.removeLayer(layer);
        }
        var mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        layer = L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; ' + mapLink + ' Contributors',
                maxZoom: 18
            });
        map.addLayer(layer);
    }

    function showGoogleMap() {
        if (layer) {
            map.removeLayer(layer);
        }
        layer = L.gridLayer.googleMutant({
            type: 'satellite',
            maxZoom: 20
        });
        map.addLayer(layer);
    }

    init();

    var addBtn = document.getElementById("add");

    addBtn.onclick = function () {

        var point = L.point(100, 100);

        var panelData = {};
        panelData.name = "Added Panel";
        panelData.LatLng = d3Overlay.projection.layerPointToLatLng(point);
        var solarpanel = createSolarpanel(panelData.LatLng, 10, 10);
        addPanel(solarpanel, d3Overlay);

    };


    var googleMapButton = document.getElementById("googleMap");
    googleMapButton.onclick = function () {
        showGoogleMap();
    };

    var openStreetMapButton = document.getElementById("openStreetMap");
    openStreetMapButton.onclick = function () {
        showOpenStreetMap();
    };

};