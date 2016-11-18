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

    this.renderSolarPanelValues();
}

PanelTools.prototype.renderSolarPanelValues = function () {
    console.log("Render:" + this.selectedPanel.name);
    this.toolsHeadline.html(this.selectedPanel.name);
    this.panelTilt.val(this.selectedPanel.orientation);
    this.panelTiltValue.html(this.selectedPanel.orientation + "°");
};

PanelTools.prototype.tilt = function () {
    var degree = this.panelTiltValue;
    return this.panelTilt.on("change mousemove", function () {
        var val = $(this).val();
        degree.html(val + "°");
    });
};

PanelTools.prototype.width = function () {
    console.log("Width");
    var widthVal = this.panelWidthValue;
    return this.panelWidth.on("change mousemove", function () {
        var val = $(this).val();
        widthVal.html(val + "m");
    });
};

PanelTools.prototype.height = function () {
    var height = this.panelHeightValue;
    return this.panelHeight.on("change mousemove", function () {
        var val = $(this).val();
        height.html(val + "m");
    });
};

