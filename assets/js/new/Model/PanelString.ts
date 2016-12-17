class PanelString {

    controller;
    masterPanel;
    panels;

    constructor(controller, panel) {
        this.controller = controller;
        this.masterPanel = panel;
        this.panels = []
    }

    appendPanel(panel) {
        if (panel != undefined) {
            let master = this.masterPanel;

            panel.topLeft = master.topLeft;
            panel.pitch = master.pitch;
            panel.orientation = master.orientation;
            panel.id = master.id;
            panel.align(this.controller, master.width, master.height);

            this.panels.push(panel);
        }
    }

    removePanel(panel) {

    }

    removePanelById(panelId) {

    }

    private getNextPoint(panel) {
        return panel.getPointsAsList()[1];
    }

    private refreshGeometrics() {
        console.log("Master:")
        console.log(this.masterPanel);
        let orientation = this.masterPanel.orientation;
        let nextLatLng = this.getNextPoint(this.masterPanel);
        console.log(nextLatLng);
        let height = this.masterPanel.height;
        let width = this.masterPanel.width;
        for (let i = 0; i < this.panels.length; i++) {
            this.panels[i].topLeft = nextLatLng;
            this.panels[i].orientation = orientation;
            this.panels[i].align(this.controller, height, width);
            console.log("I:" + i);
            console.log(this.panels[i]);
            nextLatLng = this.getNextPoint(this.panels[i]);
        }
    }

    getGeoJSON() {
        this.refreshGeometrics();
        let polygonArray = [];
        polygonArray.push(this.masterPanel.getLatLngsAsArray());
        for (let i = 0; i < this.panels.length; i++) {
            polygonArray.push(this.panels[i].getLatLngsAsArray());
        }
        return polygonArray
    }

}