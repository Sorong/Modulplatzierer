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