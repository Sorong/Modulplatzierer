const BEST_PV = 2;

function Roof() {
    this.gid = null;
    this.corners = null;
    this.pv = null;
    this.st = null;
    this.orientation = null;
    this.controller = null;
}

Roof.prototype.setCornersUnsorted = function (coordinates) {

    function cross(o, a, b) {
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    }


    function convexHull(points) {
        points.sort(function (a, b) {
            return a[0] == b[0] ? a[1] - b[1] : a[0] - b[0];
        });

        var lower = [];
        for (var i = 0; i < points.length; i++) {
            while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0) {
                lower.pop();
            }
            lower.push(points[i]);
        }

        var upper = [];
        for (var i = points.length - 1; i >= 0; i--) {
            while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
                upper.pop();
            }
            upper.push(points[i]);
        }

        upper.pop();
        lower.pop();
        return lower.concat(upper);
    }

    this.corners = convexHull(coordinates);

};

Roof.prototype.getAsPolygon = function () {
    var color_border = Math.round(256 / BEST_PV)-1;
    var red = (255 - (color_border * this.pv)) << 16;
    var green = (color_border * this.pv) << 8;
    var rgb = 0x000000;
    rgb |= red |= green;
    rgb = rgb.toString(16);
    while (rgb.length < 6) {
        rgb = "0" + rgb;
    }
    var polygon = L.polygon(this.corners, {color: "#" + rgb});

    return polygon;
};

Roof.prototype.setOrientation = function () {
    var leftBot = [Number.MAX_VALUE, Number.MIN_VALUE];
    var rightBot = [Number.MAX_VALUE, Number.MIN_VALUE];
    for (var i = 0; i < this.corners.length; i++) {
        var curr = this.controller.getLatLngAsPoint(this.corners[i]);
        if (curr.y >= leftBot[1]) {
            leftBot = [curr.x, curr.y];
        } else if (curr.x >= rightBot[1]) {
            rightBot = [curr.x, curr.y];
        }
    }

    var cos_theta = (leftBot[0] + rightBot[0] * leftBot[1] + rightBot[1])
        / (Math.sqrt(Math.pow(leftBot[0], 2) + Math.pow(leftBot[1], 2)) * Math.sqrt(Math.pow(rightBot[0], 2) + Math.pow(rightBot[1], 2)));
    var angle = Math.acos(cos_theta) / Math.PI * 180;
    this.orientation = angle;
};

