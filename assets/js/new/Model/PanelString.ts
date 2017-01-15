/**
 * @class PanelString
 *
 * @static {number} UNIFIER - Statischer Zähler zur eindeutigen Identifizierung eines PanelString-Objektes während einer Session.
 * @property {number} unifier - Dem PanelString zugeordneter Zähler zur eindeutigen Identifizierung
 * @property {Controller} controller - Hauptcontroller um die richtige Darstellung auf der Karte zu gewährleisten.
 * @property {Panel} masterPanel - Hauptpanel an dem sich die Panels des PanelStrings ausrichten.
 * @property {Panel[]} panels - Panels, die an den Hauptpanel angehängt wurden.
 */
class PanelString {

    static UNIFIER = 0;
    unifier;
    controller;
    masterPanel;
    panels;

    /**
     * Erstellt ein PanelString Object. Das PanelString Object verwaltet die korrekte Aneinanderreihung der Panels.
     * Die Haupteinstellungen werden am übergeben MasterPanel getätigt und anschließend an die angehängten Panels weitergegeben.
     * Beim Anlegen eines neuen PanelStrings wird die statische UNIFIER-Variable inkrementiert.
     * @memberOf PanelString
     *
     * @param {Controller} controller - Der Hauptcontroller um den PanelString korrekt darzustellen.
     * @param {Panel} masterPanel - MasterPanel, an dem sich angehängte Panels ausrichten.
     */
    constructor(controller, masterPanel) {
        this.controller = controller;
        this.masterPanel = masterPanel;
        this.panels = [];
        this.unifier = PanelString.UNIFIER++;
    }

    /**
     * Es wird ein erstelltes Panel übergeben, welches anschließend die Eigenschaften des MasterPanels übernimmt.
     * Das angehängte Panel wird zusätzlich der Panelliste des PanelString hinzugefügt.
     *
     * @memberOf PanelString
     * @param {Panel} panel - Anzuhängendes Panel.
     */
    appendPanel(panel) {
        if (panel != undefined) {
            let master = this.masterPanel;
            panel.topLeft = master.topLeft;
            panel.pitch = master.pitch;
            panel.orientation = master.orientation;
            panel.frameWidth = master.frameWidth;
            panel.align(this.controller, master.width, master.height);

            this.panels.push(panel);
        }
    }

    /**
     * Der Aufruf der Funktion wird an die Ausrichtungfunktion {@link Panel#align} des Hauptpanels weitergeleitet.
     *
     * @memberOf PanelString
     * @param {Controller} controller - Hauptcontroller, zur Berechnung der Ausrichtung.
     * @param {number} width - Breite des Panels.
     * @param {number} height - Höhe/Länge des Panels.
     */
    align(controller, width, height) {
        this.masterPanel.align(controller, width, height);
    }

    /**
     * Gibt die Liste aller Längen- und Breitengrade eines PanelStrings wieder.
     * @memberOf PanelString
     *
     * @returns {Array} Liste aller Längen- und Breitengrade
     */
    getPointsAsList() {
        return this.getGeoJSON();
    }

    /**
     * Entfernt das zuletzt eingefügten Panel. Das MasterPanel kann so nicht entfernt werden.
     * @memberOf PanelString
     *
     * @returns {string|number} Gibt die Id des entfernten Panel zurück.
     * Wenn kein Panel gelöscht werden kann, wird die ID des MasterPanels zurückgegeben.
     */
    removePanel() {
        let removedPanelId = this.masterPanel.id;
        if(this.panels.length !== 0) {
            removedPanelId = this.panels[this.panels.length-1].id;
            let removePosition = this.panels.length - 1;
            this.panels.splice(removePosition, 1);
        }
        return removedPanelId;
    }

    /**
     * Hier wird die Orientierung des PanelString gesetzt, hierbei wird die Orientierung nur beim MasterPanel gesetzt,
     * um die Orientierung auf die angehängten Panele zu übertragen ist der Funktionsaufruf zur Aktualisierung der Geometrischen Eigenschaften
     * {@link PanelString#refreshGeometrics} notwendig.
     * @memberOf PanelString
     *
     * @param {number} orientation Orientierung von 0-360 Grad.
     */
    setOrientation(orientation) {
        let master = this.masterPanel;
        let o = orientation;
        if (o < 0) {
            o += 360;
        }
        master.setOrientation(this.controller, o);
    }

    /**
     * Der Aufruf der Funktion wird an die Setter-Funktion für die Rahmenbreite {@link Panel#setFrameWidth} des Hauptpanels weitergeleitet.
     * @memberOf PanelString
     * @param {number} width - Rahmenbreite des Panels.
     */
    setFrameWidth(width){
        this.masterPanel.setFrameWidth(this.controller, width);
    }

    /**
     * Der Aufruf der Funktion wird an die Setter-Funktion für die Neigung{@link Panel#setPitch} des Hauptpanels weitergeleitet.
     *
     * @memberOf PanelString
     * @param {number} pitch - Neigung des Panels.
     */
    setPitch(pitch) {
        this.masterPanel.setPitch(this.controller, pitch);
    }

    /**
     * Die Position des MasterPanels wird neu gesetzt.
     *
     * @memberOf PanelString
     * @param {L.latLng[][]} latlngs - Längen- und Breitengrade der neuen Koordinaten.
     */
    setPosition(latlngs) {
        let topLeft = latlngs[0][0];
        let master = this.masterPanel;
        master.setTopLeft(this.controller, topLeft);
    }

    /**
     * Gibt die Rahmenbreite in Pixel wieder.
     *
     * @memberOf PanelString
     * @returns {number} Gibt die Rahmenbreite in Pixel wieder
     */
    getFrameWidth() {
        return this.masterPanel.getFrameWidthInPixel(this.controller);
    }

    /**
     *Ermittelt die Position, wo das anliegende Panel als nächstes angesetzt wird.
     * @memberOf PanelString
     * @private
     * @param {Panel} panel - Das Panel, dessen Punkt den Anhängepunkt darstellt.
     * @returns {L.latLng} Die nordöstlichste Ecke des Quellpanels.
     */
    private getNextPoint(panel) {
        return panel.getPointsAsList()[1];
    }

    /**
     * Aktualisiert die Position der einzelnen Panels, die Orientierung erfolgt anhand der Attribute des MasterPanels.
     * Die Einstellungen des MasterPanels werden an die angehängten Panels weitergegeben.
     *
     * @memberOf PanelString
     * @private
     */
    private refreshGeometrics() {
        let orientation = this.masterPanel.orientation;
        let pitch = this.masterPanel.pitch;
        let nextLatLng = this.getNextPoint(this.masterPanel);
        let height = this.masterPanel.height;
        let width = this.masterPanel.width;
        let frameWidth = this.masterPanel.frameWidth;

        for (let i = 0; i < this.panels.length; i++) {
            this.panels[i].setTopLeft(this.controller, nextLatLng);
            this.panels[i].setOrientation(this.controller, orientation);
            this.panels[i].setPitch(this.controller, pitch);
            this.panels[i].width = width;
            this.panels[i].height = height;
            this.panels[i].frameWidth = frameWidth;
            nextLatLng = this.getNextPoint(this.panels[i]);
        }
    }


    /**
     * Gibt einen Array aller Panels mit entsprechen Längen- und Breitengraden ({@link Panel#getLatLngsAsArray}) wieder
     * @memberOf PanelString
     *
     * @returns {Array} Array der Längen- und Breitengraden aller Panels
     */
    getGeoJSON() {
        this.refreshGeometrics();
        let polygonArray = [];
        polygonArray.push(this.masterPanel.getLatLngsAsArray());
        for (let i = 0; i < this.panels.length; i++) {
            polygonArray.push(this.panels[i].getLatLngsAsArray());
        }
        return polygonArray
    }

    /**
     * Gibt das Panel entsprechenden Stelle aus.
     * Wobei 0 das erste Panel ist.
     *
     * @memberOf PanelString
     * @param {number} index - Index des gewünschten Panels.
     * @returns {Panel|null} Panel an der übergebenen Position. Bei ungültigen Indices wird null zurückgegeben.
     */
    get(index) {
        if(index < 0 || index > this.size()) { return null;}
        if(index === 0) {
            return this.masterPanel;
        } else {
            return this.panels[index-1];
        }
    }

    /**
     * Gibt die Anzahl der Panels im PanelString zurück.
     *
     * @memberOf PanelString
     * @returns {number} Anzahl der Panels.
     */
    size() {
        return this.panels.length + 1;
    }

    /**
     * Gibt die ID des MasterPanels zurück.
     *
     * @memberOf PanelString
     * @returns {number} ID des MasterPanels
     */
    getId() {
        return this.masterPanel.getId();
    }

    /**
     * Vergleicht aktuelles PanelString mit dem übergeben PanelString.
     *
     * @memberOf PanelString
     * @param {PanelString} panelstring - Ein PanelString.
     * @returns {boolean} Gibt an ob der übergebene PanelString der selbe PanelString ist wie dieser.
     */
    equals(panelstring) {
        if(panelstring.masterPanel === undefined) {
            return false;
        }
        return this.getId() === panelstring.getId() && this.size() === panelstring.size() && this.unifier === panelstring.unifier;
    }
}