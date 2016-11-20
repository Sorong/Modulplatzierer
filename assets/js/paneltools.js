function PanelTools(panelpolygon) {

    this.selectedPanel = panelpolygon.panel;
    this.toolsContainer = $("#tools");
    this.toolsHeadline = $("#tools_headline").find(".headline");
    this.panelTilt = $("#panel_tilt");
    this.panelTiltValue = $("#panel_tilt_value");

    this.panelWidth = $("#panel_width");
    this.panelWidthValue = $("#panel_width_value");

    this.panelHeight = $("#panel_height");
    this.panelHeightValue = $("#panel_height_value");

    this.orientation = $("#roof_orientation");
    this.orientationValue = $("#roof_orientation_value");

    this.renderSolarPanelValues();
}

PanelTools.prototype.renderSolarPanelValues = function () {
    console.log("Render:" + this.selectedPanel.name);
    this.toolsHeadline.html(this.selectedPanel.name);

    var pitch = this.selectedPanel.pitch || 0;
    this.panelTilt.val(pitch);
    this.panelTiltValue.html(pitch + "°");

    var width = this.selectedPanel.width || 1;
    this.panelWidth.val(width);
    this.panelWidthValue.html(width + "m");

    var length = this.selectedPanel.length || 1;
    this.panelHeight.val(length);
    this.panelHeightValue.html(length + "m");

    var orientation = this.selectedPanel.orientation || 0;
    this.orientation.val(orientation);
    this.orientationValue.html(orientation + "°");
};

PanelTools.prototype.pitchSlider = function () {
    var degree = this.panelTiltValue;
    return this.panelTilt.on("change mousemove", function () {
        var val = $(this).val();
        degree.html(val + "°");
    });
};

PanelTools.prototype.widthSlider = function () {
    console.log("Width");
    var widthVal = this.panelWidthValue;
    return this.panelWidth.on("change mousemove", function () {
        var val = $(this).val();
        widthVal.html(val + "m");
    });
};

PanelTools.prototype.heightSlider = function () {
    var height = this.panelHeightValue;
    return this.panelHeight.on("change mousemove", function () {
        var val = $(this).val();
        height.html(val + "m");
    });
};

PanelTools.prototype.orientationSlider = function () {
    var degree = this.orientationValue;
    return this.orientation.on("change mousemove", function () {
        var val = $(this).val();
        degree.html(val + "°");
    });
};

