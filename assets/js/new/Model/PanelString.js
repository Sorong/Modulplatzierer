var PanelString = (function () {
    function PanelString(panel) {
        this.panels = [];
        this.masterPanel = panel;
        this.panels.push(this.masterPanel);
    }
    PanelString.prototype.appendPanel = function () {
        this.panels.push(this.masterPanel);
    };
    PanelString.prototype.removePanel = function () {
    };
    PanelString.prototype.getGeoJSON = function () {
        var polygonArray = [];
        var p = this.masterPanel.getPointsAsList();
        var puff = 0.00015;
        for (var i = 0; i < this.panels.length; i++) {
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
