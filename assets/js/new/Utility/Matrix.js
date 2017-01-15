/**
 * Konstruiert ein Matrix-Objekt.
 * Das Matrix-Objekt ist eine Hilfsklasse, die Rotationsmatrizen zur Rotation entlang der X-/Z-Achse liefert.
 * Bei den Matrizen handelt es sich um 3x3-Matrizen.
 * Außerdem stellt das Objekt die Funktionalität zur Verfügung eine 3x3 Matrix mit einem Vektor (x,y,z) zu multiplizieren.
 * @class
 * @constructor
 * @property {number} lastOrientation Der zuletzt berechnte Rotationswinkel der Z-Rotationsmatrix.
 * @property {number[][]} lastOrientationMatrix Die der zuletzt berechneten Z-Rotationsmatrix in Relation zum zuletzt berechnten Rotationswinkel.
 * @property {number} lastPitch Der zuletzt berechnte Rotationswinkel der X-Rotationsmatrix.
 * @property {number[][]} lastPitchMatrix Die der zuletzt berechneten X-Rotationsmatrix in Relation zum zuletzt berechneten Rotationswinkel.
 */
function Matrix() {
    this.lastOrientation = null;
    this.lastOrientationMatrix = null;
    this.lastPitch = null;
    this.lastPitchMatrix = null;
}
/**
 * Berechnet die Rotationsmatrix zur Rotation entlang der Z-Achse.
 * Berechnungen werden gespeichert um ggf. identische Berechnungen, die nacheinander durchgeführt werden, zu verhindern.
 * @param {number} orientation Der Drehwinkel der zur Berechnung der Matrix genutzt wird.
 * @returns {number[][]|null} Die Rotationsmatrix 3x3 die berechnet oder aus dem Speicher gelesen wird.
 * Gibt die zuletzt gespeicherte Matrix zurück wenn "null" übergeben wird.
 */
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
/**
 * Berechnet die Rotationsmatrix zur Rotation entlang der X-Achse.
 * Berechnungen werden gespeichert um ggf. identische Berechnungen, die nacheinander durchgeführt werden, zu verhindern.
 * @param {number} pitch Der Drehwinkel der zur Berechnung der Matrix genutzt wird.
 * @returns {number[][]|null} Die Rotationsmatrix 3x3 die berechnet oder aus dem Speicher gelesen wird.
 * Gibt die zuletzt gespeicherte Matrix zurück wenn "null" übergeben wird.
 */
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
/**
 * Multipliziert eine 3x3 Matrix mit einem Vektor (x,y,z).
 * @param {number[][]} matrix Matrix der Form 3x3.
 * @param {number[]} vector Vektor aus drei Komponenten.
 * Bei Vektoren, die aus mehr Komponenten bestehen werden die weiteren Komponenten ignoriert und es wird so verfahren,
 * als ob der Vektor nur drei Komponenten hätte.
 * @returns {number[]} Das Ergebnis der Multiplikation, ein Vektor aus drei Komponenten.
 */
Matrix.prototype.matrixMultiplyVector = function (matrix, vector) {
    var newVector = [
        matrix[0][0] * vector[0] + matrix[0][1] * vector[1] + matrix[0][2] * vector[2],
        matrix[1][0] * vector[0] + matrix[1][1] * vector[1] + matrix[1][2] * vector[2],
        matrix[2][0] * vector[0] + matrix[2][1] * vector[1] + matrix[2][2] * vector[2]
    ];
    return newVector;
};