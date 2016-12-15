class PanelString {

    masterPanel;
    panels = [];

    constructor(panel) {
        this.masterPanel = panel;
        this.panels.push(this.masterPanel);
    }

    appendPanel() {
        this.panels.push(this.masterPanel)
    }

    removePanel() {
    }

    getGeoJSON() {
        let polygonArray = [];

        let p = this.masterPanel.getPointsAsList();
        let puff = 0.00015;
        for(let i = 0; i < this.panels.length; i++){
            let arr = [
                [p[0].lat, p[0].lng+puff*i],
                [p[1].lat, p[1].lng+puff*i],
                [p[2].lat, p[2].lng+puff*i],
                [p[3].lat, p[3].lng+puff*i]
            ];
            polygonArray.push(arr);
        }

        return polygonArray
    }

}