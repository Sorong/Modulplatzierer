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
    this.frameWidth = 0.5;
    this.id = -1;
}

Panel.prototype.align = function (controller, width, height) {
    var w = width !== undefined ? width : this.width;
    var h = height !== undefined ? height : this.height;
    var frameInMeter = ((this.frameWidth/100)) ;
    this.oTopLeft = this.topLeft;
    this.oTopRight = calcNextPoint(Number(this.width) + frameInMeter, this.oTopLeft, 0);
    this.oBotLeft = calcNextPoint(Number(this.height) + frameInMeter, this.oTopLeft, -90);
    this.oBotRight = calcNextPoint(Number(this.height) + frameInMeter, this.oTopRight, -90);
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

    var orientationMatrix = matrix.calculateOrientationMatrix(this.orientation);
    var pitchMatrix = matrix.calculatePitchMatrix(this.pitch);
    var topright = matrix.matrixMultiplyVector(orientationMatrix, vTopLeftTopRight);
    var bottomleft = matrix.matrixMultiplyVector(orientationMatrix, matrix.matrixMultiplyVector(pitchMatrix, vTopBottomLeft));
    var bottomright = matrix.matrixMultiplyVector(orientationMatrix, matrix.matrixMultiplyVector(pitchMatrix, vTopBottomRight));

    this.botLeft = controller.getPointAsLatLng([this.topLeft.x + bottomleft[0], this.topLeft.y + bottomleft[1]]);
    this.topRight = controller.getPointAsLatLng([this.topLeft.x + topright[0], this.topLeft.y + topright[1]]);
    this.botRight = controller.getPointAsLatLng([this.topLeft.x + bottomright[0], this.topLeft.y + bottomright[1]]);
    this.topLeft = controller.getPointAsLatLng([this.topLeft.x, this.topLeft.y]);

};
Panel.prototype.getFrameWidthInPixel = function (controller) {
    var frameInMeter = this.frameWidth/100;
    var vectorFrame = calcNextPoint(frameInMeter, this.oTopLeft, 0);
    vectorFrame = controller.getLatLngAsPoint(vectorFrame);
    vectorWithoutFrame = controller.getLatLngAsPoint(this.oTopLeft);
    return (vectorFrame.x - vectorWithoutFrame.x);
};

Panel.prototype.getFrameWidth = function () {
  return this.frameWidth;
};

Panel.prototype.setFrameWidth = function(controller, width){
    this.frameWidth = width;
    this.align(controller);
};

Panel.prototype.setOrientation = function (controller, orientation) {
    this.orientation = orientation;
    this.align(controller)
};

Panel.prototype.setPitch = function (controller, pitch) {
    this.pitch = pitch;
    this.align(controller);
};

Panel.prototype.setTopLeft = function(controller, topLeft){
    this.topLeft = topLeft;
    this.align(controller)
};

Panel.prototype.getPointsAsList = function () {
    var list = [this.oTopLeft, this.topRight, this.botRight, this.botLeft];
    return list;
};

Panel.prototype.getLatLngsAsArray = function () {
    return [
        [this.topLeft.lat, this.topLeft.lng],
        [this.topRight.lat, this.topRight.lng],
        [this.botRight.lat, this.botRight.lng],
        [this.botLeft.lat, this.botLeft.lng]
    ]
};

Panel.prototype.getAsJson = function () {
    return {
        panel_id: this.id,
        the_geom: [
            {
                latitude: this.oTopLeft.lat,
                longitude: this.oTopLeft.lng
            },
            {
                latitude: this.oTopRight.lat,
                longitude: this.oTopRight.lng
            },
            {
                latitude: this.oBotRight.lat,
                longitude: this.oBotRight.lng
            },
            {
                latitude: this.oBotLeft.lat,
                longitude: this.oBotLeft.lng
            }],
        laenge: this.height,
        breite: this.width,
        neigung: this.pitch,
        ausrichtung: this.orientation,
        rahmenbreite: this.frameWidth
    }
};

Panel.prototype.setPointsFromList = function (list) {
    if (list.length > 0) {
        for (var i = 0; i < list.length; i++) {
            var latLng = L.latLng(list[i].latitude, list[i].longitude);
            if (latLng === undefined) {
                latLng = list[i];
            }
            switch (i) {
                case 0:
                    this.oTopLeft = this.topLeft = latLng;
                    break;
                case 1:
                    this.oTopRight = latLng;
                    break;
                case 2:
                    this.oBotRight = latLng;
                    break;
                case 3:
                    this.oBotLeft = latLng;
                    break;
                default:
                    return;
            }
        }

    }
};

Panel.prototype.getId = function () {
  return this.id;
};

function calcNextPoint(distance, point, angle) {
    earthRadius = 6371000;
    distanceNorth = Math.sin(angle * Math.PI / 180) * distance;
    distanceEast = Math.cos(angle * Math.PI / 180) * distance;
    if(isNaN(distanceNorth)) {
       distanceNorth = 0;
    }
    if(isNaN(distanceEast)) {
        distanceEast = 0;
    }
    newLat = point.lat + (distanceNorth / earthRadius) * (180 / Math.PI);
    newLon = point.lng + (distanceEast / earthRadius) * (180 / Math.PI) / Math.cos(point.lat * Math.PI / 180);
    return L.latLng(newLat, newLon);
}