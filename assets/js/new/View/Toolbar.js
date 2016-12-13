function Toolbar(model) {
    this.selectedModel = model;
    this.toolsContainer = $("#tools");
    this.toolsHeadline = $("#tools_headline").find(".headline");
    this.modelTilt = $("#model_tilt");
    this.modelTiltValue = $("#model_tilt_value");

    this.modelWidth = $("#model_width");
    this.modelWidthValue = $("#model_width_value");

    this.modelHeight = $("#model_height");
    this.modelHeightValue = $("#model_height_value");

    this.modelOrientation = $("#roof_orientation");
    this.modelOrientationValue = $("#roof_orientation_value");

    this.renderModelValues();
}


Toolbar.prototype.renderModelValues = function () {
    if(this.selectedModel === undefined) { return; }
    console.log("Render:" + this.selectedModel.name);
    this.toolsHeadline.html(this.selectedModel.name);

    var pitch = this.selectedModel.pitch || 0;
    this.modelTilt.val(pitch);
    this.modelTiltValue.html(parseFloat(pitch).toFixed(2) + "°");

    var width = this.selectedModel.width || 1;
    this.modelWidth.val(width);
    this.modelWidthValue.html(width + "m");

    var length = this.selectedModel.height || 1;
    this.modelHeight.val(length);
    this.modelHeightValue.html(length + "m");

    var orientation = this.selectedModel.orientation || 0;
    this.modelOrientation.val(orientation);
    this.modelOrientationValue.html(parseFloat(orientation).toFixed(2) + "°");
};

Toolbar.prototype.pitchSlider = function () {
    var degree = this.modelTiltValue;
    return this.modelTilt.on("change mousemove", function () {
        var val = $(this).val();
        degree.html(val + "°");
    });
};

Toolbar.prototype.widthSlider = function () {
    var widthVal = this.modelWidthValue;
    return this.modelWidth.on("change mousemove", function () {
        var val = $(this).val();
        widthVal.html(val + "m");
    });
};

Toolbar.prototype.heightSlider = function () {
    var height = this.modelHeightValue;
    return this.modelHeight.on("change mousemove", function () {
        var val = $(this).val();
        height.html(val + "m");
    });
};

Toolbar.prototype.orientationSlider = function () {
    var degree = this.modelOrientationValue;
    return this.modelOrientation.on("change mousemove", function () {
        var val = $(this).val();
        degree.html(val + "°");
    });
};