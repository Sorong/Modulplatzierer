var PanelString = (function () {
    function PanelString(controller, panel) {
        this.controller = controller;
        this.masterPanel = panel;
        this.panels = [];
    }
    PanelString.prototype.appendPanel = function (panel) {
        if (panel != undefined) {
            var master = this.masterPanel;
            panel.topLeft = master.topLeft;
            panel.pitch = master.pitch;
            panel.orientation = master.orientation;
            panel.id = master.id;
            panel.align(this.controller, master.width, master.height);
            this.panels.push(panel);
        }
    };
    PanelString.prototype.removePanel = function (panel) {
        var removePosition = this.panels.length - 1;
        this.panels.splice(removePosition, 1);
    };
    PanelString.prototype.removePanelById = function (panelId) {
    };
    PanelString.prototype.setOrientation = function (orientation) {
        var master = this.masterPanel;
        console.log(orientation);
        var o = orientation - 45;
        if (o < 0) {
            o += 360;
        }
        master.setOrientation(this.controller, o);
    };
    PanelString.prototype.setNewPosition = function (latlngs) {
        var topLeft = latlngs[0][0];
        var topRight = latlngs[0][1];
        var master = this.masterPanel;
        console.log("Before");
        console.log(topLeft);
        console.log(master.topLeft);
        console.log(topRight);
        console.log(master.topRight);
        master.setTopLeft(this.controller, topLeft);
        console.log("After");
        console.log(topLeft);
        console.log(master.topLeft);
        console.log(topRight);
        console.log(master.topRight);
    };
    PanelString.prototype.getNextPoint = function (panel) {
        return panel.getPointsAsList()[1];
    };
    PanelString.prototype.refreshGeometrics = function () {
        var orientation = this.masterPanel.orientation;
        var nextLatLng = this.getNextPoint(this.masterPanel);
        var height = this.masterPanel.height;
        var width = this.masterPanel.width;
        for (var i = 0; i < this.panels.length; i++) {
            this.panels[i].topLeft = nextLatLng;
            this.panels[i].orientation = orientation;
            // TODO selfAlign macht leider nicht das was gewünscht ist
            // this.panels[i].selfAlign(this.controller)
            this.panels[i].align(this.controller);
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
    return PanelString;
}());
