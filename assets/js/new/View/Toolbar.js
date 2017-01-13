function Toolbar(model) {

    this.isPanelString = false;

    if (model.constructor == PanelString) {
        this.selectedModel = model.masterPanel;
        this.isPanelString = true;
    } else {
        this.selectedModel = model;
    }

    this.toolsContainer = $("#tools");
    this.toolsContainer.removeClass("hidden");
    $("#map_container").removeClass().addClass("col-sm-6");
    this.toolsHeadline = $("#tools_headline").find(".headline");
    this.modelTilt = $("#model_tilt");
    this.modelTiltValue = $("#model_tilt_value");

    this.modelWidth = $("#model_width");
    this.modelWidthValue = $("#model_width_value");

    this.modelHeight = $("#model_height");
    this.modelHeightValue = $("#model_height_value");

    this.modelOrientation = $("#model_orientation");
    this.modelOrientationValue = $("#model_orientation_value");

    this.modelFrame = $("#model_frame");
    this.modelFrameValue = $("#model_frame_value");

    this.modelDelete = $("#delete_panel");

    var self = this;
    this.moreContent = $("#toolbar_more");
    this.showMoreButton = $("#show_more");
    this.showMoreButton.on('click', function () {
        var isVisible = self.moreContent.is(':visible');
        if (isVisible) {
            self.hideMore();
        } else {
            self.showMore();
        }
    });
    this.renderModelValues();
}

Toolbar.prototype.showMore = function () {
    this.showMoreButton.html("weniger");
    this.moreContent.show();
};

Toolbar.prototype.hideMore = function () {
    this.showMoreButton.html("mehr");
    this.moreContent.hide();
};

Toolbar.prototype.renderModelValues = function () {
    if (this.selectedModel === undefined) {
        return;
    }
    console.log("Render:" + this.selectedModel.name);
    this.toolsHeadline.html(this.selectedModel.name);

    var pitch = this.selectedModel.pitch || 0;
    this.modelTilt.val(pitch);
    this.modelTiltValue.html(parseFloat(pitch).toFixed(0) + "°");

    var width = this.selectedModel.width || 1;
    this.modelWidth.val(width);
    this.modelWidthValue.html(width + "m");

    var length = this.selectedModel.height || 1;
    this.modelHeight.val(length);
    this.modelHeightValue.html(length + "m");

    var orientation = this.selectedModel.orientation || 0;
    this.modelOrientation.val(orientation);
    this.modelOrientationValue.html(parseFloat(orientation).toFixed(0) + "°");
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

Toolbar.prototype.frameWidthSlider = function () {
    var frameWidth = this.modelFrameValue;
    return this.modelFrame.on("change mousemove", function(){
       var val = $(this).val();
       frameWidth.html(val + "cm");
    });
};

Toolbar.prototype.unbindEvents = function () {
    this.modelTilt.off();
    this.modelHeight.off();
    this.modelWidth.off();
    this.modelOrientation.off();
    this.modelDelete.off();
    this.modelFrame.off();
    this.toolsContainer.addClass("hidden");
    $("#map_container").removeClass().addClass("col-sm-9");

};