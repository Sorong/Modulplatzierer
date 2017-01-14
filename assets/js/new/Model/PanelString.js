var PanelString = (function () {
    function PanelString(controller, panel) {
        this.controller = controller;
        this.masterPanel = panel;
        this.panels = [];
        this.unifier = PanelString.UNIFIER++;
    }
    PanelString.prototype.appendPanel = function (panel) {
        if (panel != undefined) {
            var master = this.masterPanel;
            panel.topLeft = master.topLeft;
            panel.pitch = master.pitch;
            panel.orientation = master.orientation;
            panel.frameWidth = master.frameWidth;
            panel.align(this.controller, master.width, master.height);
            this.panels.push(panel);
        }
    };
    /* Funktionen die bereitgestellt werden müssen um die Schnittstelle zu nutzen */
    PanelString.prototype.align = function (controller, width, height) {
        this.masterPanel.align(controller, width, height);
    };
    PanelString.prototype.getPointsAsList = function () {
        return this.getGeoJSON();
    };
    /* Schnittstellenende */
    PanelString.prototype.removePanel = function () {
        var removedPanelId = this.masterPanel.id;
        if (this.panels.length !== 0) {
            removedPanelId = this.panels[this.panels.length - 1].id;
            var removePosition = this.panels.length - 1;
            this.panels.splice(removePosition, 1);
        }
        return removedPanelId;
    };
    PanelString.prototype.removePanelById = function (panelId) {
    };
    /**
     *
     * @param orientation
     */
    PanelString.prototype.setOrientation = function (orientation) {
        var master = this.masterPanel;
        console.log(orientation);
        var o = orientation;
        if (o < 0) {
            o += 360;
        }
        master.setOrientation(this.controller, o);
    };
    PanelString.prototype.setFrameWidth = function (width) {
        this.masterPanel.setFrameWidth(this.controller, width);
    };
    PanelString.prototype.setPitch = function (pitch) {
        this.masterPanel.setPitch(this.controller, pitch);
    };
    PanelString.prototype.setPosition = function (latlngs) {
        var topLeft = latlngs[0][0];
        var master = this.masterPanel;
        master.setTopLeft(this.controller, topLeft);
    };
    PanelString.prototype.getFrameWidth = function () {
        var test = this.masterPanel.getFrameWidthInPixel(this.controller);
        return test;
    };
    PanelString.prototype.getNextPoint = function (panel) {
        return panel.getPointsAsList()[1];
    };
    PanelString.prototype.refreshGeometrics = function () {
        var orientation = this.masterPanel.orientation;
        var pitch = this.masterPanel.pitch;
        var nextLatLng = this.getNextPoint(this.masterPanel);
        var height = this.masterPanel.height;
        var width = this.masterPanel.width;
        var frameWidth = this.masterPanel.frameWidth;
        for (var i = 0; i < this.panels.length; i++) {
            this.panels[i].setTopLeft(this.controller, nextLatLng);
            this.panels[i].setOrientation(this.controller, orientation);
            this.panels[i].setPitch(this.controller, pitch);
            this.panels[i].width = width;
            this.panels[i].height = height;
            this.panels[i].frameWidth = frameWidth;
            nextLatLng = this.getNextPoint(this.panels[i]);
        }
    };
    PanelString.prototype.getGeoJSON = function () {
        this.refreshGeometrics();
        var polygonArray = [];
        polygonArray.push(this.masterPanel.getLatLngsAsArray());
        for (var i = 0; i < this.panels.length; i++) {
            polygonArray.push(this.panels[i].getLatLngsAsArray());
        }
        return polygonArray;
    };
    PanelString.prototype.get = function (index) {
        if (index === 0) {
            return this.masterPanel;
        }
        else {
            return this.panels[index - 1];
        }
    };
    PanelString.prototype.size = function () {
        return this.panels.length + 1;
    };
    PanelString.prototype.getId = function () {
        return this.masterPanel.getId();
    };
    PanelString.prototype.equals = function (panelstring) {
        if (panelstring.masterPanel === undefined) {
            return false;
        }
        return this.getId() === panelstring.getId() && this.size() === panelstring.size() && this.unifier === panelstring.unifier;
    };
    PanelString.UNIFIER = 0;
    return PanelString;
}());
