var matrix = new Matrix();


function Matrix() {
    this.lastOrientation = null;
    this.lastOrientationMatrix = null;
    this.lastPitch = null;
    this.lastPitchMatrix = null;
}

Matrix.prototype.calculateOrientationMatrix = function (orientation) {
    if (this.lastOrientation === orientation) {
        return this.lastOrientationMatrix;
    }
    this.lastOrientation = orientation;
    this.lastOrientationMatrix = [
        [Math.cos(orientation * Math.PI / 180), -Math.sin(orientation * Math.PI / 180), 0],
        [Math.sin(orientation * Math.PI / 180), Math.cos(orientation * Math.PI / 180), 0],
        [0, 0, 1]
    ];
    return this.lastOrientationMatrix;
};

Matrix.prototype.calculatePitchMatrix = function (pitch) {
    if (this.lastPitch === pitch) {
        return this.lastPitchMatrix;
    }
    this.lastPitch = pitch;
    this.lastPitchMatrix = [
        [1, 0, 0],
        [0, Math.cos(pitch * Math.PI / 180), -Math.sin(pitch * Math.PI / 180)],
        [0, Math.sin(pitch * Math.PI / 180), Math.cos(pitch * Math.PI / 180)]
    ];
    return this.lastPitchMatrix;
};

Matrix.prototype.matrixMultiplyVector = function (matrix, vector) {
    var newVector = [
        matrix[0][0] * vector[0] + matrix[0][1] * vector[1] + matrix[0][2] * vector[2],
        matrix[1][0] * vector[0] + matrix[1][1] * vector[1] + matrix[1][2] * vector[2],
        matrix[2][0] * vector[0] + matrix[2][1] * vector[1] + matrix[2][2] * vector[2]
    ];
    return newVector;
};

function Solarpanel() {
    this.originTopLeft = null;
    this.originTopRight = null;
    this.originBotLeft = null;
    this.originBotRight = null;
    this.topLeft = null;
    this.topRight = null;
    this.botLeft = null;
    this.botRight = null;
    this.orientation = 0;
    this.pitch = 0;
    this.name = null;
    this.length = null;
    this.width = null;
    this.id = 0;
}

Solarpanel.prototype.realign = function () {
    this.originTopLeft = this.topLeft;
    this.originTopRight = translateCoordinates(this.width, this.originTopLeft, 0);
    this.originBotLeft = translateCoordinates(this.length, this.originTopLeft, -90);
    this.originBotRight = translateCoordinates(this.length, this.originTopRight, -90);
    this.alignPanel(this);
};

Solarpanel.prototype.setPitch = function (pitch) {
    this.pitch = parseInt(pitch);
};

Solarpanel.prototype.setOrientation = function (orientation) {
    this.orientation = parseInt(orientation);
};

Solarpanel.prototype.alignPanel = function () {
    var mapContainer = controller.mapContainer;
    this.topLeft = mapContainer.latLngToLayerPoint(this.originTopLeft);
    this.topRight = mapContainer.latLngToLayerPoint(this.originTopRight);
    this.botLeft = mapContainer.latLngToLayerPoint(this.originBotLeft);
    this.botRight = mapContainer.latLngToLayerPoint(this.originBotRight);

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

    this.botLeft = mapContainer.layerPointToLatLng([this.topLeft.x + bottomleft[0], this.topLeft.y + bottomleft[1]]);
    this.topRight = mapContainer.layerPointToLatLng([this.topLeft.x + topright[0], this.topLeft.y + topright[1]]);
    this.botRight = mapContainer.layerPointToLatLng([this.topLeft.x + bottomright[0], this.topLeft.y + bottomright[1]]);
    this.topLeft = mapContainer.layerPointToLatLng([this.topLeft.x, this.topLeft.y]);

    return this;
};

function createSolarpanel(topleft, length, width, orientation, pitch) {
    var solarpanel = new Solarpanel();
    solarpanel.width = width;
    solarpanel.length = length;
    solarpanel.topLeft = topleft;
    return solarpanel;
}

function loadSolarpanel(topleft, topright, bottomleft, bottomright, orientation, pitch) {
    var solarpanel = new Solarpanel();
    solarpanel.originTopLeft = topleft;
    solarpanel.originTopRight = topright;
    solarpanel.originBotLeft = bottomleft;
    solarpanel.originBotRight = bottomright;
    solarpanel.orientation = orientation;
    solarpanel.pitch = pitch;
    return solarpanel;
}