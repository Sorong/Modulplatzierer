const BEST_PV = 2;

function Roof() {
    this.gid = 0;
    this.roofId = -1;
    this.points = [];
    this.pv = null;
    this.st = null;
    this.orientation = null;
    this.parts = null;
    this.bestPart = 0;
    this.tilt = 0;
    this.global = 0;
}

Roof.prototype.setPointsFromList = function (coordinates) {

    this.points = convexHull(coordinates);
    //this.points = coordinates;

};

Roof.prototype.getAsPolygon = function () {

    var color_border = Math.floor(255 / BEST_PV);
    var red = (255 - (color_border * this.pv)) << 16;
    var green = (color_border * this.pv) << 8;
    var rgb = 0x000000;
    rgb |= red |= green;
    rgb = rgb.toString(16);
    while (rgb.length < 6) {
        rgb = "0" + rgb;
    }
    var style = {
        color: "#" + rgb,
        weight: 2,
        fill: false
    };
    if(this.parts === null) {
        style.weight = 1;
        style.fill = true;
        style.fillOpacity = 0.1;
    }
    return L.polygon(this.points, style);
};

Roof.prototype.addPart = function (part) {
    if(this.parts === null) {
        this.parts = [];
    }
    var index = this.parts.push(part);
    var currentBest = this.parts[this.bestPart];
    if(currentBest.pv < part.pv || (currentBest.pv == part.pv && currentBest.global < part.global)) {
        this.bestPart = index-1;
    }
    this.global += part.global;
};

Roof.prototype.getBestRoofPart = function (controller) {
    if(this.bestPart === 0) { return this; }
    if(this.parts[this.bestPart].orientation === null) {
        this.parts[this.bestPart].calculateOrientation(controller);
    }
    return this.parts[this.bestPart];
};

Roof.prototype.calculateOrientation = function (controller) {
    var leftBot = rightBot = controller.getLatLngAsPoint(this.points[0]);
    for (var i = 0; i < this.points.length; i++) {
        var current = controller.getLatLngAsPoint(this.points[i]);
        var current_next = controller.getLatLngAsPoint(this.points[(i + 1) % this.points.length]);
        if(current.y >= leftBot.y) {
            leftBot = current;
            rightBot = current_next;
        }
    }



    rightBot.x-=leftBot.x;
    rightBot.y-=leftBot.y;
    leftBot.x= (leftBot.x+10) - leftBot.x;
    leftBot.y-=leftBot.y;
    var cos_theta = ((leftBot.x * rightBot.x) + (leftBot.y * rightBot.y))
        / (Math.sqrt(Math.pow(leftBot.x, 2) + Math.pow(leftBot.y, 2)) * Math.sqrt(Math.pow(rightBot.x, 2) + Math.pow(rightBot.y, 2)));
    var angle = Math.acos(cos_theta) / Math.PI * 180;
    this.orientation = isNaN(angle)  ? 0 : angle;
};

Roof.prototype.panelInRoof = function (panel) {

    var list = panel.getPointsAsList();
    var inside = false;
    var insideCounter = 0;
    for(var li = 0; li < list.length; li++) {
        for(var i = 0, j = this.points.length-1; i < this.points.length; j = i++){
            var roofFirst =   controller.getLatLngAsPoint(this.points[i]);
            var roofSecond = controller.getLatLngAsPoint(this.points[j]);
            var testPoint = controller.getLatLngAsPoint(list[li]);
            if( ((roofFirst.y > testPoint.y) != (roofSecond.y >testPoint.y)) &&
                (testPoint.x <  (roofSecond.x - roofFirst.x) * (testPoint.y - roofFirst.y) / (roofSecond.y-roofFirst.y) + roofFirst.x)) {
                inside = !inside;
            }
        }
        if(inside) {
            insideCounter++;
        }
        inside = false;
    }

    return insideCounter;
};

Roof.prototype.getAsJson = function () {
    var geom = [];
    for(var i = 0; i < this.points.length; i++) {
        geom.push({
            latitude: this.points[i].lat,
            longitude : this.points[i].lng
        })
    }

    return {
        dach_id : this.roofId,
        gid : this.gid,
        st : this.st,
        pv : this.pv,
        tilt : this.tilt,
        global : this.global,
        the_geom : geom
    }
};

// int pnpoly(int nvert, float *vertx, float *verty, float testx, float testy)
// {
//     int i, j, c = 0;
//     for (i = 0, j = nvert-1; i < nvert; j = i++) {
//         if ( ((verty[i]>testy) != (verty[j]>testy)) &&
//             (testx < (vertx[j]-vertx[i]) * (testy-verty[i]) / (verty[j]-verty[i]) + vertx[i]) )
//             c = !c;
//     }
//     return c;
// }

/* Hilfsfunktion */

function convexHull(points) {
    function cross(o, a, b) {
        return (a.lng - o.lng) * (b.lat - o.lat) - (a.lat - o.lat) * (b.lng - o.lng);
    }
    points.sort(function (a, b) {
        return a.lng == b.lng ? a.lat - b.lat : a.lng - b.lng;
    });

    var lower = [];
    for (var i = 0; i < points.length; i++) {
        while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0) {
            lower.pop();
        }
        lower.push(points[i]);
    }

    var upper = [];
    for (var j = points.length - 1; j >= 0; j--) {
        while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], points[j]) <= 0) {
            upper.pop();
        }
        upper.push(points[j]);
    }

    upper.pop();
    lower.pop();
    return lower.concat(upper);
}
