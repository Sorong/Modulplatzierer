var PanelString = (function () {
    function PanelString(panel) {
        this.panelCounter = 0;
        this.masterPanel = panel;
        this.panelCounter++;
    }
    PanelString.prototype.appendPanel = function () {
        this.panelCounter++;
    };
    PanelString.prototype.removePanel = function () {
        this.panelCounter--;
    };
    PanelString.prototype.getGeoJSON = function () {
        var polygonArray = [];
        console.log("GEO " + this.panelCounter);
        var p = this.masterPanel.getPointsAsList();
        var puff = 0.00015;
        for (var i = 0; i < this.panelCounter; i++) {
            var arr = [
                [p[0].lat, p[0].lng + puff * i],
                [p[1].lat, p[1].lng + puff * i],
                [p[2].lat, p[2].lng + puff * i],
                [p[3].lat, p[3].lng + puff * i]
            ];
            polygonArray.push(arr);
        }
        return polygonArray;
    };
    return PanelString;
}());
