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
            panel.align(this.controller, master.width, master.height);

            this.panels.push(panel);
        }
    }

    /* Funktionen die bereitgestellt werden müssen um die Schnittstelle zu nutzen */
    align(controller, width, height) {
        this.masterPanel.align(controller, width, height);
    }

    getPointsAsList() {
        return this.getGeoJSON();
    }
    /* Schnittstellenende */

    removePanel(panel) {
        let removedPanelId = this.masterPanel.id;
        if(this.panels.length !== 0) {
            removedPanelId = this.panels[this.panels.length-1].id;
            let removePosition = this.panels.length - 1;
            this.panels.splice(removePosition, 1);
        }
        return removedPanelId;
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
    setPitch(pitch) {
        this.masterPanel.setPitch(this.controller, pitch);
    }

    setPosition(latlngs) {
        let topLeft = latlngs[0][0];
        let master = this.masterPanel;
        master.setTopLeft(this.controller, topLeft);
    }

    private getNextPoint(panel) {
        return panel.getPointsAsList()[1];
    }

    private refreshGeometrics() {
        let orientation = this.masterPanel.orientation;
        let pitch = this.masterPanel.pitch;
        let nextLatLng = this.getNextPoint(this.masterPanel);
        let height = this.masterPanel.height;
        let width = this.masterPanel.width;

        for (let i = 0; i < this.panels.length; i++) {
            this.panels[i].setTopLeft(this.controller, nextLatLng);
            this.panels[i].setOrientation(this.controller, orientation);
            this.panels[i].setPitch(this.controller, pitch);
            this.panels[i].width = width;
            this.panels[i].height = height;
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

    get(index) {
        if(index === 0) {
            return this.masterPanel;
        } else {
            return this.panels[index-1];
        }
    }

    size() {
        return this.panels.length + 1;
    }

    getId() {
        return this.masterPanel.getId();
    }
}