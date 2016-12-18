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
        let removePosition = this.panels.length - 1;
        this.panels.splice(removePosition, 1);
    }

    removePanelById(panelId) {
    }

    setOrientation(orientation) {
        let master = this.masterPanel;
        console.log(orientation);
        let o = orientation;
        if (o < 0) {
            o += 360;
        }
        master.setOrientation(this.controller, o);
    }

    setNewPosition(latlngs) {
        let topLeft = latlngs[0][0];
        let master = this.masterPanel;
        master.setTopLeft(this.controller, topLeft);
    }

    private getNextPoint(panel) {
        return panel.getPointsAsList()[1];
    }

    private refreshGeometrics() {
        let orientation = this.masterPanel.orientation;
        let nextLatLng = this.getNextPoint(this.masterPanel);

        for (let i = 0; i < this.panels.length; i++) {
            this.panels[i].setTopLeft(this.controller, nextLatLng);
            this.panels[i].setOrientation(this.controller, orientation);
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