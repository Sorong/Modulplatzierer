function Solarpanel() {
    this.topleft = null;
    this.topright = null;
    this.bottomleft = null;
    this.bottomright = null;
    this.orientation = null;
    this.pitch = null;

}

Solarpanel.prototype.createPanel = function (topleft, length, width) {
    this.topleft = topleft;
    this.topright = translateCoordinates(width, topleft, 0);
    this.bottomleft = translateCoordinates(length, topleft, 90);
    this.bottomright = translateCoordinates(length, topright, 180);

};

Solarpanel.prototype.loadPanel = function (topleft, topright, bottomleft, bottomright) {

};

function createSolarpanel(topleft, length, width) {
    var solarpanel = new Solarpanel();
    solarpanel.topleft = topleft;
    solarpanel.topright = translateCoordinates(width, topleft, 0);
    solarpanel.bottomleft = translateCoordinates(length, topleft, -90);
    solarpanel.bottomright = translateCoordinates(length, solarpanel.topright, -90);
    return solarpanel;
}
/*
 Latitude: 1 deg = 110.574 km
 Longitude: 1 deg = 111.320*cos(latitude) km
 */

function translateCoordinates(distance, point, angle) {
    distanceNorth = Math.sin(angle*Math.PI/180) * distance;
    distanceEast = Math.cos(angle*Math.PI/180) * distance;
    earthRadius = 6371000;


    newLat = point.lat + (distanceNorth / earthRadius) * (180 / Math.PI);
    newLon = point.lng + (distanceEast / earthRadius) * (180 / Math.PI) / Math.cos(point.lat * Math.PI / 180) ;

    return L.latLng(newLat, newLon);
}