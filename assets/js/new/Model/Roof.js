/**
 * Bester Wert für die Effizienz anhand der Einstrahlungswerte.
 *
 * @constant
 * @type {number}
 */
const BEST_PV = 2;

/**
 * Das Roof-Objekt repräsentiert ein Dach eines Gebäudes.
 *
 * @class
 * @constructor
 *
 * @property {number} gid - Die GebäudeID.
 * @property {number} roofId - Die ID der Dachfläche.
 * @property {L.latLng[]} points - Koordinaten der Dachfläche.
 * @property {number} pv - Eignung der Dachfläche für Photovoltaik-Module.
 * @property {number} st - Eignung der Dachfläche für die Solarthermie.
 * @property {number} orientation - Ausrichtung der Dachfläche in Richtung Süden in Grad.
 * @property {Roof[]} parts - Liste der Dachteilflächen.
 * @property {number} bestPart - Index der besten Dachteilfläche aus der Liste der Dachteilflächen.
 * Die Qualität wird anhand der besten PV-Eignung und den besten Einstrahlungswerten ermittelt.
 * @property {number} tilt - Der Winkel der Dachneigung in Grad.
 * @property {number} global - Die globalen Einstrahungswerte der Dachfläche.
 */
function Roof() {
    this.gid = 0;
    this.roofId = -1;
    this.points = [];
    this.pv = null;
    this.st = null;
    this.orientation = null;
    this.parts = null;
    this.bestPart = -1;
    this.tilt = 0;
    this.global = 0;
}

/**
 * Die Dachfläche wird anhand der übergebene Koordinaten, als konvexe Fläche ermittelt.
 * @see {convexHull}
 * @param {L.latLng[]} coordinates - Geo-Koordinaten der Dachfläche
 */
Roof.prototype.setPointsFromList = function (coordinates) {
    this.points = convexHull(coordinates);
};


/**
 * Konvertiert ein Dach in ein Polygon, je nach Eignung wird die Farbe in Farbabstufung Rot (niedrige Eignung) bis Grün(hohe Eignung) gesetzt.
 * Außerdem wird die Polygonfläche einer Teilfläche mit dem jeweiligen Farbton gefüllt, während vom eigentlich Dach lediglich die Umrisse dargestellt werden.
 * @return {L.polygon} Dach als Polygon.
 */
Roof.prototype.getAsPolygon = function () {
    if(this.pv > BEST_PV) {this.pv = 0;}
    var color_border = Math.floor(255 / BEST_PV);
    var red = (255 - (color_border * this.pv)) << 16;
    var green = (color_border * this.pv) << 8;
    var rgb = 0x000000;
    rgb |= red |= green;
    rgb = rgb.toString(16);
    while (rgb.length < 6) {
        rgb = "0" + rgb;
    }
    var style = {
        color: "#" + rgb,
        weight: 2,
        fill: false
    };
    if(this.parts === null) {
        style.weight = 1;
        style.fill = true;
        style.fillOpacity = 0.1;
    }
    return L.polygon(this.points, style);
};

/**
 * Hier wird einem Dach eine Dachfläche hinzugefügt. Ein Dach ist eine Sammlung mehrerer Dachflächen, die für sich jeweils Dächer sind.
 * @param {Roof} part - Dach, welches dem Dach hinzugefügt wird.
 */
Roof.prototype.addPart = function (part) {
    if(this.parts === null) {
        this.parts = [];
    }
    var index = this.parts.push(part);
    if(this.bestPart === -1) {this.bestPart++;}
    var currentBest = this.parts[this.bestPart];
    if(currentBest.pv < part.pv || (currentBest.pv == part.pv && currentBest.global < part.global)) {
        this.bestPart = index-1;
    }
    this.global += part.global;
};

/**
 * Getter für den zur Photovoltaik am besten geeigneten Dachteil.
 * @param {Controller} controller Wird benötigt, um ggf. die Ausrichtung der Dachteilfläche zu berechnen.
 * @return {Roof} Beste Teilfläche für die Photovoltaik.
 */
Roof.prototype.getBestRoofPart = function (controller) {
    if(this.bestPart === -1) { return this; }
    if(controller !== undefined && this.parts[this.bestPart].orientation === null) {
        this.parts[this.bestPart].calculateOrientation(controller);
    }
    return this.parts[this.bestPart];
};


/**
 * Berechnung der Ausrichtung des Daches.
 * @param {Controller} controller Wird benötigt um die Geodaten in X/Y-Koordinaten zu transformieren um anhand dieser die Ausrichtung zu berechnen.
 */
Roof.prototype.calculateOrientation = function (controller) {
    var leftBot = rightBot = controller.getLatLngAsPoint(this.points[0]);
    for (var i = 0; i < this.points.length; i++) {
        var current = controller.getLatLngAsPoint(this.points[i]);
        var current_next = controller.getLatLngAsPoint(this.points[(i + 1) % this.points.length]);
        if(current.y >= leftBot.y) {
            leftBot = current;
            rightBot = current_next;
        }
    }



    rightBot.x-=leftBot.x;
    rightBot.y-=leftBot.y;
    leftBot.x= (leftBot.x+10) - leftBot.x;
    leftBot.y-=leftBot.y;
    var cos_theta = ((leftBot.x * rightBot.x) + (leftBot.y * rightBot.y))
        / (Math.sqrt(Math.pow(leftBot.x, 2) + Math.pow(leftBot.y, 2)) * Math.sqrt(Math.pow(rightBot.x, 2) + Math.pow(rightBot.y, 2)));
    var angle = Math.acos(cos_theta) / Math.PI * 180;
    this.orientation = isNaN(angle)  ? 0 : angle;
};


/**
 * Die Funktion überprüft ob sich ein Panel innerhalb eines Dachs befindet.
 * Sollte sich das Panel ausserhalb des Dachs befinden, wird false zurückgegeben, sonst true.
 *
 * @param {Panel|PanelString} panel - Panel- oder PanelString-Objekt
 * @return {boolean} Gibt an ob sich die Panels auf dem Dach befinden
 */
Roof.prototype.panelInRoof = function (panel) {

    var list = panel.getPointsAsList();
    var inside = false;
    var insideCounter = 0;
    for(var li = 0; li < list.length; li++) {
        for(var i = 0, j = this.points.length-1; i < this.points.length; j = i++){
            var roofFirst =   controller.getLatLngAsPoint(this.points[i]);
            var roofSecond = controller.getLatLngAsPoint(this.points[j]);
            var testPoint = controller.getLatLngAsPoint(list[li]);
            if( ((roofFirst.y > testPoint.y) != (roofSecond.y >testPoint.y)) &&
                (testPoint.x <  (roofSecond.x - roofFirst.x) * (testPoint.y - roofFirst.y) / (roofSecond.y-roofFirst.y) + roofFirst.x)) {
                inside = !inside;
            }
        }
        if(inside) {
            insideCounter++;
        }
        inside = false;
    }

    return insideCounter === list.length;
};

/**
 * @typedef {Object} DachJson
 * @property {number} dach_id - DachID
 * @property {number} gid - GebäudeID
 * @property {number} st - Eignung für die Solarthermie.
 * @property {number} pv - Eignung für die Photovoltaik.
 * @property {number} tilt - Dachneigung in Grad.
 * @property {number} global - Einstrahlungswerte der Dachfläche.
 * @property {number[][]} the_geom - Array der Form [...[latitude, longitude],[latitude, longitude]...].
 */

/**
 * Gibt uns das Dachobjekt als Json zurück
 *
 * @return {DachJson} Dach als Json
 */
Roof.prototype.getAsJson = function () {
    var geom = [];
    for(var i = 0; i < this.points.length; i++) {
        geom.push({
            latitude: this.points[i].lat,
            longitude : this.points[i].lng
        })
    }

    return {
        dach_id : this.roofId,
        gid : this.gid,
        st : this.st,
        pv : this.pv,
        tilt : this.tilt,
        global : this.global,
        the_geom : geom
    }
};


/* Hilfsfunktion */
/**
 * Es wird aus den übergeben Punkten die konvexe Hülle erstellt.
 * @see {@link https://de.wikipedia.org/wiki/Graham_Scan}
 * @param {Array.<Array.<number, number>>} points - Alle Koordinaten der Dachfläche.
 * @return {Array.<Array.<number, number>>} Koordinaten der konvexen Hülle.
 */
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
