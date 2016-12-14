var matrix = new Matrix();

function Panel() {
    this.oTopLeft = null;
    this.oTopRight = null;
    this.oBotLeft = null;
    this.oBotRight = null;
    this.topLeft = null;
    this.topRight = null;
    this.botLeft = null;
    this.botRight = null;
    this.orientation = 0;
    this.pitch = 0;
    this.name = null;
    this.height = 0;
    this.width = 0;
    this.id = 0;
}

Panel.prototype.align = function (controller, width, height) {
    var w = width !== undefined ? width : this.width;
    var h = height !== undefined ? height : this.height;
    this.oTopLeft = this.topLeft;
    //if (this.width !== w || this.oTopRight === null) {
    this.oTopRight = calcNextPoint(this.width, this.oTopLeft, 0);
    //}
    // if (this.height !== h || this.oBotLeft === null) {
    this.oBotLeft = calcNextPoint(this.height, this.oTopLeft, -90);
    // }
    //if (this.height !== h || this.width !== w || this.oBotRight === null) {
    this.oBotRight = calcNextPoint(this.height, this.oTopRight, -90);
    //
    this.width = w;
    this.height = h;
    this.selfAlign(controller);
};

Panel.prototype.selfAlign = function (controller) {
    this.topLeft = controller.getLatLngAsPoint(this.oTopLeft);
    this.topRight = controller.getLatLngAsPoint(this.oTopRight);
    this.botLeft = controller.getLatLngAsPoint(this.oBotLeft);
    this.botRight = controller.getLatLngAsPoint(this.oBotRight);

    var vTopBottomLeft = [
        this.botLeft.x - this.topLeft.x,
        this.botLeft.y - this.topLeft.y,
        0
    ];
    var vTopBottomRight = [
        this.botRight.x - this.topLeft.x,
        this.botRight.y - this.topLeft.y,
        0
    ];
    var vTopLeftTopRight = [
        this.topRight.x - this.topLeft.x,
        this.topRight.y - this.topLeft.y,
        0];

    var orientationMatrix = matrix.calculateOrientationMatrix(-this.orientation);
    var pitchMatrix = matrix.calculatePitchMatrix(this.pitch);
    var topright = matrix.matrixMultiplyVector(orientationMatrix, vTopLeftTopRight);
    var bottomleft = matrix.matrixMultiplyVector(orientationMatrix, matrix.matrixMultiplyVector(pitchMatrix, vTopBottomLeft));
    var bottomright = matrix.matrixMultiplyVector(orientationMatrix, matrix.matrixMultiplyVector(pitchMatrix, vTopBottomRight));

    this.botLeft = controller.getPointAsLatLng([this.topLeft.x + bottomleft[0], this.topLeft.y + bottomleft[1]]);
    this.topRight = controller.getPointAsLatLng([this.topLeft.x + topright[0], this.topLeft.y + topright[1]]);
    this.botRight = controller.getPointAsLatLng([this.topLeft.x + bottomright[0], this.topLeft.y + bottomright[1]]);
    this.topLeft = controller.getPointAsLatLng([this.topLeft.x, this.topLeft.y]);

};

Panel.prototype.getPointsAsList = function () {
    var list = [this.topLeft, this.topRight, this.botRight, this.botLeft];
    return list;
};

Panel.prototype.getPointsFromList = function (list) {
    if (list.length != 4) {
        return;
    }
    this.topLeft = list[0];
    this.topRight = list[1];
    this.botRight = list[2];
    this.botLeft = list[3];
};

function calcNextPoint(distance, point, angle) {
    earthRadius = 6371000;
    distanceNorth = Math.sin(angle * Math.PI / 180) * distance;
    distanceEast = Math.cos(angle * Math.PI / 180) * distance;
    newLat = point.lat + (distanceNorth / earthRadius) * (180 / Math.PI);
    newLon = point.lng + (distanceEast / earthRadius) * (180 / Math.PI) / Math.cos(point.lat * Math.PI / 180);
    return L.latLng(newLat, newLon);
}