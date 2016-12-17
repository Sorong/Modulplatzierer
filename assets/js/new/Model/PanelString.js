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
    };
    PanelString.prototype.removePanelById = function (panelId) {
    };
    PanelString.prototype.getNextPoint = function (panel) {
        return panel.getPointsAsList()[1];
    };
    PanelString.prototype.refreshGeometrics = function () {
        console.log("Master:");
        console.log(this.masterPanel);
        var orientation = this.masterPanel.orientation;
        var nextLatLng = this.getNextPoint(this.masterPanel);
        console.log(nextLatLng);
        var height = this.masterPanel.height;
        var width = this.masterPanel.width;
        for (var i = 0; i < this.panels.length; i++) {
            this.panels[i].topLeft = nextLatLng;
            this.panels[i].orientation = orientation;
            this.panels[i].align(this.controller, height, width);
            console.log("I:" + i);
            console.log(this.panels[i]);
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
