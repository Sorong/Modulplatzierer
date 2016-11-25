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
    solarpanel.originBotLeft = translateCoordinates(length, solarpanel.originTopLeft, -90);
    solarpanel.originBotRight = translateCoordinates(length, solarpanel.originTopRight, -90);

    if (orientation !== undefined || pitch !== undefined) {
        alignPanel(solarpanel, orientation, pitch);
    } else {
        solarpanel.topRight = solarpanel.originTopRight;
        solarpanel.botLeft = solarpanel.originBotLeft;
        solarpanel.botRight = solarpanel.originBotRight;
    }
    solarpanel.topLeft = solarpanel.originTopLeft;
    return solarpanel;
}

function loadSolarpanel(topleft, topright, bottomleft, bottomright, orientation, pitch) {
    var solarpanel = new Solarpanel();
    solarpanel.originTopLeft = topleft;
    solarpanel.originTopRight = topright;
    solarpanel.originBotLeft = bottomleft;
    solarpanel.originBotRight = bottomright;
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
        solarpanel.topRight = solarpanel.originTopRight;
        solarpanel.botLeft = solarpanel.originBotLeft;
        solarpanel.botRight = solarpanel.originBotRight;
    }
    solarpanel.topLeft = solarpanel.originTopLeft;
    return solarpanel;
}


function alignPanel(solarpanel) {
    console.log("Aufruf");

    solarpanel.topLeft = mapContainer.latLngToLayerPoint(solarpanel.originTopLeft);
    solarpanel.topRight = mapContainer.latLngToLayerPoint(solarpanel.originTopRight);
    solarpanel.botLeft = mapContainer.latLngToLayerPoint(solarpanel.originBotLeft);
    solarpanel.botRight = mapContainer.latLngToLayerPoint(solarpanel.originBotRight);


    var vTopBottomLeft = [
        solarpanel.botLeft.x - solarpanel.topLeft.x,
        solarpanel.botLeft.y - solarpanel.topLeft.y,
        0
    ];
    var vTopBottomRight = [
        solarpanel.botRight.x - solarpanel.topLeft.x,
        solarpanel.botRight.y - solarpanel.topLeft.y,
        0
    ];
    var vTopLeftTopRight = [
        solarpanel.topRight.x - solarpanel.topLeft.x,
        solarpanel.topRight.y - solarpanel.topLeft.y,
        0];

    var orientationMatrix = calculateOrientationMatrix(solarpanel.orientation);
     var pitchMatrix = calculatePitchMatrix(solarpanel.pitch);

     var topright = matrixMultiplyVector(orientationMatrix, vTopLeftTopRight);


     var bottomleft = matrixMultiplyVector(orientationMatrix, matrixMultiplyVector(pitchMatrix, vTopBottomLeft));


     var bottomright = matrixMultiplyVector(orientationMatrix, matrixMultiplyVector(pitchMatrix, vTopBottomRight));

    solarpanel.botLeft = mapContainer.layerPointToLatLng([solarpanel.topLeft.x + bottomleft[0], solarpanel.topLeft.y + bottomleft[1]]);
    solarpanel.topRight = mapContainer.layerPointToLatLng([solarpanel.topLeft.x + topright[0], solarpanel.topLeft.y + topright[1]]);
    solarpanel.botRight = mapContainer.layerPointToLatLng([solarpanel.topLeft.x + bottomright[0], solarpanel.topLeft.y + bottomright[1]]);
    solarpanel.topLeft = mapContainer.layerPointToLatLng([solarpanel.topLeft.x, solarpanel.topLeft.y]);


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