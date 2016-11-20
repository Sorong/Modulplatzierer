function Solarpanel() {
    this.originTopLeft = null;
    this.originTopRight = null;
    this.originBottomLeft = null;
    this.originBottomRight = null;
    this.topleft = null;
    this.topright = null;
    this.bottomleft = null;
    this.bottomright = null;
    this.orientation = 0;
    this.pitch = 0;
    this.name = null;
    this.length = null;
    this.width = null;
    this.id = 0;
}
Solarpanel.prototype.realign = function () {
    this.originTopLeft = this.topleft;
    this.originTopRight = translateCoordinates(this.width, this.originTopLeft, 0);
    this.originBottomLeft = translateCoordinates(this.length, this.originTopLeft, -90);
    this.originBottomRight = translateCoordinates(this.length, this.originTopRight, -90);

    alignPanel(this);
};
Solarpanel.prototype.setPitch = function (pitch) {
    this.pitch = parseInt(pitch);
};
Solarpanel.prototype.setOrientation = function (orientation) {
    this.orientation = parseInt(orientation);
};

function createSolarpanel(topleft, length, width, orientation, pitch) {
    var solarpanel = new Solarpanel();
    solarpanel.width = width;
    solarpanel.length = length;
    solarpanel.originTopLeft = topleft;
    solarpanel.originTopRight = translateCoordinates(width, solarpanel.originTopLeft, 0);
    solarpanel.originBottomLeft = translateCoordinates(length, solarpanel.originTopLeft, -90);
    solarpanel.originBottomRight = translateCoordinates(length, solarpanel.originTopRight, -90);

    if (orientation !== undefined || pitch !== undefined) {
        alignPanel(solarpanel, orientation, pitch);
    } else {
        solarpanel.topright = solarpanel.originTopRight;
        solarpanel.bottomleft = solarpanel.originBottomLeft;
        solarpanel.bottomright = solarpanel.originBottomRight;
    }
    solarpanel.topleft = solarpanel.originTopLeft;
    return solarpanel;
}

function loadSolarpanel(topleft, topright, bottomleft, bottomright, orientation, pitch) {
    var solarpanel = new Solarpanel();
    solarpanel.originTopLeft = topleft;
    solarpanel.originTopRight = topright;
    solarpanel.originBottomLeft = bottomleft;
    solarpanel.originBottomRight = bottomright;
    if(orientation === "undefined") {
        orientation = 0;
    }
    if (pitch === "undefined") {
        pitch = 0;
    }
    solarpanel.orientation = orientation;
    solarpanel.pitch = pitch;
    if(orientation != 0 || pitch != 0) {
        alignPanel(solarpanel, orientation, pitch);
    } else {
        solarpanel.topright = solarpanel.originTopRight;
        solarpanel.bottomleft = solarpanel.originBottomLeft;
        solarpanel.bottomright = solarpanel.originBottomRight;
    }
    solarpanel.topleft = solarpanel.originTopLeft;
    return solarpanel;
}


function alignPanel(solarpanel) {
    console.log("Aufruf");

    solarpanel.topleft = d3Overlay.projection.latLngToLayerPoint(solarpanel.originTopLeft);
    solarpanel.topright = d3Overlay.projection.latLngToLayerPoint(solarpanel.originTopRight);
    solarpanel.bottomleft = d3Overlay.projection.latLngToLayerPoint(solarpanel.originBottomLeft);
    solarpanel.bottomright = d3Overlay.projection.latLngToLayerPoint(solarpanel.originBottomRight);


    var vTopBottomLeft = [
        solarpanel.bottomleft.x - solarpanel.topleft.x,
        solarpanel.bottomleft.y - solarpanel.topleft.y,
        0
    ];
    var vTopBottomRight = [
        solarpanel.bottomright.x - solarpanel.topleft.x,
        solarpanel.bottomright.y - solarpanel.topleft.y,
        0
    ];
    var vTopLeftTopRight = [
        solarpanel.topright.x - solarpanel.topleft.x,
        solarpanel.topright.y - solarpanel.topleft.y,
        0];

    var orientationMatrix = calculateOrientationMatrix(solarpanel.orientation);
     var pitchMatrix = calculatePitchMatrix(solarpanel.pitch);

     var topright = matrixMultiplyVector(orientationMatrix, vTopLeftTopRight);


     var bottomleft = matrixMultiplyVector(orientationMatrix, matrixMultiplyVector(pitchMatrix, vTopBottomLeft));


     var bottomright = matrixMultiplyVector(orientationMatrix, matrixMultiplyVector(pitchMatrix, vTopBottomRight));

    solarpanel.bottomleft = d3Overlay.projection.layerPointToLatLng([solarpanel.topleft.x + bottomleft[0], solarpanel.topleft.y + bottomleft[1]]);
    solarpanel.topright = d3Overlay.projection.layerPointToLatLng([solarpanel.topleft.x + topright[0], solarpanel.topleft.y + topright[1]]);
    solarpanel.bottomright = d3Overlay.projection.layerPointToLatLng([solarpanel.topleft.x + bottomright[0], solarpanel.topleft.y + bottomright[1]]);
    solarpanel.topleft = d3Overlay.projection.layerPointToLatLng([solarpanel.topleft.x, solarpanel.topleft.y]);


    return solarpanel;

}

function calculateOrientationMatrix(orientation) {
    var matrix = [
        [Math.cos(orientation * Math.PI / 180), -Math.sin(orientation * Math.PI / 180), 0],
        [Math.sin(orientation * Math.PI / 180), Math.cos(orientation * Math.PI / 180), 0],
        [0, 0, 1]
    ];
    return matrix;
}

function calculatePitchMatrix(pitch) {
    var matrix = [
        [1, 0, 0],
        [0, Math.cos(pitch * Math.PI / 180), -Math.sin(pitch * Math.PI / 180)],
        [0, Math.sin(pitch * Math.PI / 180), Math.cos(pitch * Math.PI / 180)]
    ];
    return matrix;
}

function matrixMultiplyVector(matrix, vector) {
    var newVector = [
        matrix[0][0] * vector[0] + matrix[0][1] * vector[1] + matrix[0][2] * vector[2],
        matrix[1][0] * vector[0] + matrix[1][1] * vector[1] + matrix[1][2] * vector[2],
        matrix[2][0] * vector[0] + matrix[2][1] * vector[1] + matrix[2][2] * vector[2]
    ];
    return newVector;
}


function translateCoordinates(distance, point, angle) {
    distanceNorth = Math.sin(angle * Math.PI / 180) * distance;
    distanceEast = Math.cos(angle * Math.PI / 180) * distance;
    earthRadius = 6371000;


    newLat = point.lat + (distanceNorth / earthRadius) * (180 / Math.PI);
    newLon = point.lng + (distanceEast / earthRadius) * (180 / Math.PI) / Math.cos(point.lat * Math.PI / 180);

    return L.latLng(newLat, newLon);
}