window.onload = function () {

    var mapHeight = document.getElementById("map").offsetHeight;
    var mapWidth = document.getElementById("map").offsetWidth;
    var dragCoords = {x: 0, y: 0};

    var map = L.map('map').setView([52.46806645297567, 10.534391955698084], 18);
    var layer, d3Overlay;

    showGoogleMap();

    var drag = d3.behavior.drag()
        .origin(function () {
            return {x: 0, y: 0};
        })
        .on("dragstart", dragstarted)
        .on("drag", dragmove);

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

    //
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

    d3Overlay = L.d3SvgOverlay(function (selection, projection) {

        this.projection = projection;

        var feature = selection.selectAll('rect').data(panels);
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
        }
    });

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


    var addBtn = document.getElementById("add");
    addBtn.onclick = function () {

        var point = L.point(100, 100);

        var panelData = {};
        panelData.name = "Added Panel";
        panelData.LatLng = d3Overlay.projection.layerPointToLatLng(point);

        /* TESTABSCHNITT */
        var solarpanel = createSolarpanel(panelData.LatLng,1,1);
        var test = L.polygon([
            [solarpanel.topleft],
            [solarpanel.topright],
            [solarpanel.bottomleft],
            [solarpanel.bottomright]
        ]).addTo(map);

        /* Ende Testabschnitt */

        var select = d3.select(d3Overlay._svg._rootGroup);
        select.data([panelData]).append("rect")
            .style("stroke", "black")
            .style("opacity", .6)
            .style("fill", "yellow")
            .attr("width", 30)
            .attr("height", 50)
            .attr("transform", "translate(" +
                d3Overlay.projection.latLngToLayerPoint(panelData.LatLng).x + "," +
                d3Overlay.projection.latLngToLayerPoint(panelData.LatLng).y +
                ")"
            )
            .call(drag);
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