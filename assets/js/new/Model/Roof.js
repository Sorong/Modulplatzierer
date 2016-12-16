const BEST_PV = 2;

function Roof() {
    this.gid = null;
    this.points = null;
    this.pv = null;
    this.st = null;
    this.orientation = null;
    this.parts = null;
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
    return L.polygon(this.points, {color: "#" + rgb});
};

Roof.prototype.addPart = function (part) {
    if(this.parts === null) {
        this.parts = [];
    }
    this.parts.push(part);
};

Roof.prototype.calculateOrientation = function (controller) {
    var leftBot = rightBot = controller.getLatLngAsPoint(this.points[0]);
    for (var i = 0; i < this.points.length; i++) {
        var current = controller.getLatLngAsPoint(this.points[i]);
        if(current.y >= leftBot.y) {
            if(current.x > leftBot.x) {
                rightBot = current;
            } else {
                leftBot = current;
            }
        }
    }
    L.circle(controller.getPointAsLatLng(leftBot),0.8).addTo(controller.viewMap.map);
    L.circle(controller.getPointAsLatLng(rightBot),0.8).addTo(controller.viewMap.map);
    var cos_theta = (leftBot.x + rightBot.x * leftBot.y + rightBot.y)
        / (Math.sqrt(Math.pow(leftBot.x, 2) + Math.pow(leftBot.y, 2)) * Math.sqrt(Math.pow(rightBot.x, 2) + Math.pow(rightBot.y, 2)));
    var angle = Math.acos(cos_theta) / Math.PI * 180;
    this.orientation = isNaN(angle)  ? 0 : angle;
};

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