/**
 * Die Toolbar dient dazu Einstellungen an einem {@link PanelString} oder {@link Panel} vorzunehmen,
 * hierbei können wir zum Beispiel die Breite, Höhe, Orientierung und weiteres einstellen.
 *
 * @param {Panel|PanelString} model - Model, welches bearbeitet werden soll.
 * @constructor
 *
 * @property {boolean} isPanelString - Hält die Information ob es sich hierbei um einem {@link PanelString} oder {@link Panel} handelt.
 * @property {Panel} selectedModel - Ausgewähltes Panel
 * @property {jQuery} toolsContainer - Der Hauptkontainer für die Tools
 * @property {jQuery} toolsHeadline - Html Element für die Überschrift
 * @property {jQuery} modelTilt - Slider für die Einstellung der Neigung
 * @property {jQuery} modelTiltValue - Html Element für den Wert der Neigung
 * @property {jQuery} modelWidth - Slider für die Einstellung der Breite
 * @property {jQuery} modelWidthValue - Html Element für die Anzeige der Breite
 * @property {jQuery} modelHeight - Slider für die EInstellung der Höhe
 * @property {jQuery} modelHeightValue - Html Element für die Anzeige der Höhe
 * @property {jQuery} modelOrientation - Slider für die Einstellung der Orientierung
 * @property {jQuery} modelOrientationValue - Html Element für die Anzeige der Orientierung
 * @property {jQuery} modelFrame - Slider für die Einstellung der Rahmenbreite
 * @property {jQuery} modelFrameValue - Html Element für die Anzeige der Rahmenbreite
 * @property {jQuery} modelDelete - Button für die Löschung des Panels
 * @property {jQuery} moreContent - Html Kontainer der weitere Einstellungsmöglichkeiten versteckt
 * @property {jQuery} showMoreButton - Button für die Klickevents von moreContent
 */
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


/**
 * Zeigt die weiteren Einstellungen und passt die entsprechenden Elemente an
 */
Toolbar.prototype.showMore = function () {
    this.showMoreButton.html("weniger");
    this.moreContent.show();
};

/**
 * Versteckt die weiteren Einstellungen und passt die entsprechenden Elemente an
 */
Toolbar.prototype.hideMore = function () {
    this.showMoreButton.html("mehr");
    this.moreContent.hide();
};

/**
 * Aktuallisiert die Slider und Werte in der Toolbar anhand des übergeben PanelStrings oder Panels.
 */
Toolbar.prototype.renderModelValues = function () {
    if (this.selectedModel === undefined) {
        return;
    }
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

    var framewidth = (this.selectedModel.frameWidth * 100) || 0;
    this.modelFrame.val(framewidth);
    this.modelFrameValue.html(framewidth + "cm");
};

/**
 * Gewährt uns den Zugriff auf das Slider Element für die Neigung und gleichzeitig werden
 * die Werte bei einer Änderung in der Ansicht aktualisiert.
 *
 * @return {jQuery} Slider für die Neigung
 */
Toolbar.prototype.pitchSlider = function () {
    var degree = this.modelTiltValue;
    return this.modelTilt.on("change mousemove", function () {
        var val = $(this).val();
        degree.html(val + "°");
    });
};


/**
 * Gewährt uns den Zugriff auf das Slider Element für die Breite und gleichzeitig werden
 * die Werte bei einer Änderung in der Ansicht aktualisiert.
 *
 * @return {jQuery} Slider für die Breite
 */
Toolbar.prototype.widthSlider = function () {
    var widthVal = this.modelWidthValue;
    return this.modelWidth.on("change mousemove", function () {
        var val = $(this).val();
        widthVal.html(val + "m");
    });
};

/**
 * Gewährt uns den Zugriff auf das Slider Element für die Höhe und gleichzeitig werden
 * die Werte bei einer Änderung in der Ansicht aktualisiert.
 *
 * @return {jQuery} Slider für die Höhe
 */
Toolbar.prototype.heightSlider = function () {
    var height = this.modelHeightValue;
    return this.modelHeight.on("change mousemove", function () {
        var val = $(this).val();
        height.html(val + "m");
    });
};

/**
 * Gewährt uns den Zugriff auf das Slider Element für die Orientierung und gleichzeitig werden
 * die Werte bei einer Änderung in der Ansicht aktualisiert.
 *
 * @return {jQuery} Slider für die Orientierung
 */
Toolbar.prototype.orientationSlider = function () {
    var self = this;
    return this.modelOrientation.on("change mousemove", function () {
        self.setOrientation($(this).val(), true)
    });
};

/**
 * Setzen der Orientierung.
 * Sollten wir die Orientierung innerhalb des Sliders setzen, muss dies angegeben werden, damit der Slider bei der
 * Aktuallisierung nicht doppelt aktuallisiert wird.
 *
 * @public
 * @param {number} orientation - Orientierung die eingestellt werden soll
 * @param {boolean} isSlider - Ob die Eingabe über einen Slider erfolgt oder nicht
 */
Toolbar.prototype.setOrientation = function (orientation, isSlider) {
    var slider = isSlider || false;
    this.modelOrientationValue.html(orientation + "°");
    if (!slider) this.modelOrientation.val("" + orientation)
};

/**
 * Gewährt uns den Zugriff auf das Slider Element für die Rahmenbreite und gleichzeitig werden
 * die Werte bei einer Änderung in der Ansicht aktualisiert.
 *
 * @return {jQuery} Slider für die Rahmenbreite
 */
Toolbar.prototype.frameWidthSlider = function () {
    var frameWidth = this.modelFrameValue;
    return this.modelFrame.on("change mousemove", function () {
        var val = $(this).val();
        frameWidth.html(val + "cm");
    });
};

/**
 * Wir entkoppeln alle Eventlistener und die Ansicht wird auf ihren Ursprungswert gesetzt.
 */
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