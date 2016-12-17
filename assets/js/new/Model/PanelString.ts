class PanelString {

    masterPanel;
    panelCounter: number = 0;

    constructor(panel) {
        this.masterPanel = panel;
        this.panelCounter++
    }

    appendPanel() {
        this.panelCounter++
    }

    removePanel() {
        this.panelCounter--
    }

    getGeoJSON() {
        let polygonArray = [];
        console.log("GEO " + this.panelCounter);
        let p = this.masterPanel.getPointsAsList();
        let puff = 0.00015;
        for (let i = 0; i < this.panelCounter; i++) {
            let arr = [
                [p[0].lat, p[0].lng + puff * i],
                [p[1].lat, p[1].lng + puff * i],
                [p[2].lat, p[2].lng + puff * i],
                [p[3].lat, p[3].lng + puff * i]
            ];
            polygonArray.push(arr);
        }

        return polygonArray
    }

}