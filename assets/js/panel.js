function Solarpanel() {
    this.originTopLeft = null;
    this.originTopRight = null;
    this.originBottomLeft = null;
    this.originBottomRight = null;
    this.topleft = null;
    this.topright = null;
    this.bottomleft = null;
    this.bottomright = null;
    this.orientation = null;
    this.pitch = null;
    this.name = null;
}


function createSolarpanel(topleft, length, width, orientation, pitch) {
    var solarpanel = new Solarpanel();
    solarpanel.originTopLeft = topleft;
    solarpanel.originTopRight = translateCoordinates(width, solarpanel.originTopLeft, 0);
    solarpanel.originBottomLeft = translateCoordinates(length, solarpanel.originTopLeft, -90);
    solarpanel.originBottomRight = translateCoordinates(length, solarpanel.originTopRight, -90);

    if (orientation !== undefined || pitch !== undefined) {
        alignPanel(solarpanel, orientation, pitch);
        solarpanel.topleft = solarpanel.originTopLeft;
    } else {
        solarpanel.topleft = solarpanel.originTopLeft;
        solarpanel.topright = solarpanel.originTopRight;
        solarpanel.bottomleft = solarpanel.originBottomLeft;
        solarpanel.bottomright = solarpanel.originBottomRight;
    }
    return solarpanel;
}

function loadSolarpanel(topleft, topright, bottomleft, bottomright, orientation, pitch) {
    var panel = new Solarpanel();
    panel.originTopLeft = topleft;
    panel.originTopRight = topright;
    panel.originBottomLeft = bottomleft;
    panel.originTopRight = bottomright;
    if(orientation === "undefined") {
        orientation = 0;
    }
    if (pitch === "undefined") {
        pitch = 0;
    }
    panel.orientation = orientation;
    panel.pitch = pitch;
}

function alignPanel(solarpanel, d3Overlay, orientation, pitch) {


    solarpanel.orientation = orientation;
    solarpanel.pitch = pitch;
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
     solarpanel.topright = d3Overlay.projection.layerPointToLatLng([solarpanel.topleft.x + topright[1], solarpanel.topleft.y + topright[0]]);

     var bottomleft = matrixMultiplyVector(orientationMatrix, matrixMultiplyVector(pitchMatrix, vTopBottomLeft));
     solarpanel.bottomleft = d3Overlay.projection.layerPointToLatLng([solarpanel.topleft.x + bottomleft[1], solarpanel.topleft.x + bottomleft[0]]);

     var bottomright = matrixMultiplyVector(orientationMatrix, matrixMultiplyVector(pitchMatrix, vTopBottomRight));
     solarpanel.bottomright = d3Overlay.projection.layerPointToLatLng([solarpanel.topleft.x + bottomright[1], solarpanel.topleft.y + bottomright[0]]);

     solarpanel.topleft = solarpanel.originTopLeft;

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