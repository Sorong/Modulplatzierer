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
        let o = orientation - 45;
        if (o < 0) {
            o += 360;
        }
        master.setOrientation(this.controller, o);
    }

    setNewPosition(latlngs) {
        let topLeft = latlngs[0][0];
        let topRight = latlngs[0][1];
        let master = this.masterPanel;

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
    }

    private getNextPoint(panel) {
        return panel.getPointsAsList()[1];
    }

    private refreshGeometrics() {
        let orientation = this.masterPanel.orientation;
        let nextLatLng = this.getNextPoint(this.masterPanel);

        let height = this.masterPanel.height;
        let width = this.masterPanel.width;
        for (let i = 0; i < this.panels.length; i++) {
            this.panels[i].topLeft = nextLatLng;
            this.panels[i].orientation = orientation;
            // TODO selfAlign macht leider nicht das was gewünscht ist
            // this.panels[i].selfAlign(this.controller)
            this.panels[i].align(this.controller);
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