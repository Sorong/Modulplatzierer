/**
 * Matrix-Objekt, dass zur Berechnung der Drehungen genutzt wird.
 * @type {Matrix}
 */
var matrix = new Matrix();

/**
 * Konstruiert ein Solarpanel (Panel-Objekt).
 * @constructor
 * @property {L.latLng} oTopLeft Stellt die Ursprungskoordinaten für den Punkt im Nordwesten dar.
 * @property {L.latLng} oTopRight Stellt die Ursprungskoordinaten für den Punkt im Nordosten dar.
 * @property {L.latLng} oBotLeft Stellt die Ursprungskoordinaten für den Punkt im Südwesten dar.
 * @property {L.latLng} oBotLeft Stellt die Ursprungskoordinaten für den Punkt im Südosten dar.
 * @property {L.latLng} topLeft Stellt die Koordinaten für den Punkt im Nordwesten, unter Berücksichtigung der Rotation, dar.
 * @property {L.latLng} topRight Stellt die Koordinaten für den Punkt im Nordosten, unter Berücksichtigung der Rotation, dar.
 * @property {L.latLng} botLeft Stellt die Koordinaten für den Punkt im Südwesten, unter Berücksichtigung der Rotation, dar.
 * @property {L.latLng} botRight Stellt die Koordinaten für den Punkt im Südosten, unter Berücksichtigung der Rotation, dar.
 * @property {number} orientation Die Rotation entlang der Paneleigenen Z-Achse.
 * @property {string} pitch Die Rotation entlang der Paneleigenen X-Achse.
 * @property {number} height Die Höhe/Länge des Panels in Meter.
 * @property {number} width Die Breite des Panels in Meter.
 * @property {number} frameWidth Die Rahmenbreite des Panels in Meter.
 * @property {number} id Die ID des Panels.
 *
 */
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
    this.frameWidth = 0.05;
    this.id = -1;
}
/**
 * Justiert das Panel neu aufgrund von veränderten Koordinaten oder veränderte Breite/Länge.
 * @param {Controller} controller Der Controller der benötigt wird um Koordinaten von Geodaten in X/Y-Koordinaten umzurechnen.
 * @param {number|undefined} width Neue Breite des Panels, wenn nicht definiert, wird die bereits vorhandene Breite genutzt.
 * @param {number|undefined} height Neue Länge/Höhe des Panels, wenn nicht definiert, wird die bereits vorhande Länge genutzt.
 */
Panel.prototype.align = function (controller, width, height) {
    var w = width !== undefined ? width : this.width;
    var h = height !== undefined ? height : this.height;
    var frameInMeter = this.frameWidth;
    this.oTopLeft = this.topLeft;
    this.oTopRight = calcNextPoint(Number(this.width) + frameInMeter, this.oTopLeft, 0);
    this.oBotLeft = calcNextPoint(Number(this.height) + frameInMeter, this.oTopLeft, -90);
    this.oBotRight = calcNextPoint(Number(this.height) + frameInMeter, this.oTopRight, -90);
    this.width = w;
    this.height = h;
    this._selfAlign(controller);
};
/**
 * Verarbeitet die definierten Rotationswinkel (pitch/orientation) um die transformierten Koordinaten zu berechnen.
 * @param {Controller} controller Der Controller der benötigt wird um Koordinaten von Geodaten in X/Y-Koordinaten umzurechnen.
 * @private
 */
Panel.prototype._selfAlign = function (controller) {
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
/**
 * Berechnet die Rahmenbreite in Pixel.
 * @param {Controller} controller Der Controller der benötigt wird um Koordinaten von Geodaten in X/Y-Koordinaten umzurechnen.
 * @returns {number} Die Rahmenbreite in Pixel.
 */
Panel.prototype.getFrameWidthInPixel = function (controller) {
    var frameInMeter = this.frameWidth;
    console.log("Zentimeter" + frameInMeter);
    var vectorFrame = calcNextPoint(frameInMeter, this.oTopLeft, 0);
    vectorFrame = controller.getLatLngAsPoint(vectorFrame);
    vectorWithoutFrame = controller.getLatLngAsPoint(this.oTopLeft);
    return (vectorFrame.x - vectorWithoutFrame.x);
};
/**
 * Getter für die Rahmenbreite.
 * @returns {number} Rahmenbreite in Metern.
 */
Panel.prototype.getFrameWidth = function () {
    return this.frameWidth;
};
/**
 * Setter für die Rahmenbreite.
 * @param {Controller} controller Der Controller der zur Berechnung der Panelgrößen notwendig ist, interner Aufruf von {@link Panel#align}
 * @param {number} width Die neue Rahmenbreite in Metern.
 */
Panel.prototype.setFrameWidth = function (controller, width) {
    this.frameWidth = width;
    this.align(controller);
};
/**
 * Setter für die Ausrichtung des Panels.
 * @param {Controller} controller Der Controller der zur Berechnung der Panelgrößen notwendig ist, interner Aufruf von {@link Panel#align}
 * @param {number} orientation Die neue Ausrichtung des Panels in Grad.
 */
Panel.prototype.setOrientation = function (controller, orientation) {
    this.orientation = orientation;
    this.align(controller)
};
/**
 * Setter für die Neigung des Panels.
 * @param {Controller} controller Der Controller der zur Berechnung der Panelgrößen notwendig ist, interner Aufruf von {@link Panel#align}
 * @param {number} pitch Die neue Neigung des Panels in Grad.
 */
Panel.prototype.setPitch = function (controller, pitch) {
    this.pitch = pitch;
    this.align(controller);
};
/**
 * Setter für die nordwestlichste Koordinate des Panels.
 * @param {Controller} controller Der Controller der zur Berechnung der Panelgrößen notwendig ist, interner Aufruf von {@link Panel#align}
 * @param {L.latLng} topLeft Geodaten der Koordinaten, Liste beinhaltet vier Objekte.
 */
Panel.prototype.setTopLeft = function (controller, topLeft) {
    this.topLeft = topLeft;
    this.align(controller)
};

/**
 * Konvertiert die Punkte des Panels in ein Listenformat ([NW, NO, SO, SW]), Listenobjekte enthalten die Geodaten.
 * @returns {L.latLng[]} Array der Länge Vier.
 */
Panel.prototype.getPointsAsList = function () {
    return [this.oTopLeft, this.topRight, this.botRight, this.botLeft];
};
/**
 * @typedef {Object} LatLngList
 * @property {number[]} Zweistelliges Array, erster Eintrag beinhaltet die latitude, der zweite Eintrag die longitude.
 */
/**
 * Konvertiert die Punkte des Panels in ein Listenformat, mit der sortierung NW, NO, SO, SW.
 * Das Listenobjekte enhält die Geodaten.
 * @returns {LatLngList[]} Array der Länge Vier. Jeder Eintrag enthält ein Array der Länge Zwei [Latitude, Longitude].
 */
Panel.prototype.getLatLngsAsArray = function () {
    return [
        [this.topLeft.lat, this.topLeft.lng],
        [this.topRight.lat, this.topRight.lng],
        [this.botRight.lat, this.botRight.lng],
        [this.botLeft.lat, this.botLeft.lng]
    ]
};
/**
 * @typedef {Object} the_geom
 * @property {number} latitude Längengrad
 * @property {number} longitude Breitengrad
 */
/**
 * @typedef {Object} PanelJson
 * @property {number} panel_id - ID des Panels.
 * @property {number} laenge - Länge des Panels.
 * @property {number} breite - Breite des Panels.
 * @property {number} neigung - Neigung des Panels.
 * @property {number} ausrichtung - Ausrichtung des Panels.
 * @property {number} rahmenbreite - Rahmenbreite des Panels.
 */
/**
 * Konvertiert das Panel in ein JSON Objekt.
 * @returns {PanelJson} JSON-Objekt mit allen Informationen des Panels.
 */
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
/**
 * Liest die Punkte einer übergebenen Liste. Und setzt anhand dieser die Panelkoordinaten neu.
 * @param {the_geom}list Liste der Länge Vier. Punkte werden der Reihe nach neu gesetzt: NW, NO, SW, SO.
 */
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
/**
 * Getter für die ID des Panels.
 * @returns {number} ID des Panels.
 */
Panel.prototype.getId = function () {
    return this.id;
};
/**
 * Hilfsfunktion zur Berechnung neuer Geodaten im Abhängigkeit zur Distanz in Metern, dem Ursprungspunkt und dem Winkel.
 * Zur internen Rechnung wird ein Erdradius von 6.371.000 Metern angenommen, wodurch geringfügige Abweichung zur tatsächlichen Größe möglich sein können.
 * @param {number} distance Der Abstand in Metern zum Ursprungspunkt.
 * @param {L.latLng} point Die Geodaten des Ursprungspunkt.
 * @param {number} angle Der Winkel, in Grad, in denen sich der Zielpunkt befinden soll.
 * @returns {l.latLng} Die Geodaten des berechnten Punktes.
 * @static
 */
function calcNextPoint(distance, point, angle) {
    earthRadius = 6371000;
    distanceNorth = Math.sin(angle * Math.PI / 180) * distance;
    distanceEast = Math.cos(angle * Math.PI / 180) * distance;
    if (isNaN(distanceNorth)) {
        distanceNorth = 0;
    }
    if (isNaN(distanceEast)) {
        distanceEast = 0;
    }
    newLat = point.lat + (distanceNorth / earthRadius) * (180 / Math.PI);
    newLon = point.lng + (distanceEast / earthRadius) * (180 / Math.PI) / Math.cos(point.lat * Math.PI / 180);
    return L.latLng(newLat, newLon);
}