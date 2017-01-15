/**
 * @class PanelString
 *
 * @property {number} UNIFIER - unnniiinnn TODO
 * @property {number} unifier - unnniiinnn TODO
 * @property {Controller} controller - Hauptcontroller um die richtige Darstellung auf der Karte zu garantieren
 * @property {Panel} masterPanel - Hauptpanel an dem sich die Childs ausrichten
 * @property {Panel[]} panels - Panels, die an den Hauptpanel angehängt werden
 */
class PanelString {

    static UNIFIER = 0;
    unifier;
    controller;
    masterPanel;
    panels;

    /**
     * Erstellt ein PanelString Object. Das PanelString Object verwaltet die korrekte Aneinanderreihung der Panels.<br/>
     * Die Haupteinstellgungen werden am übergeben MaserPanel getätigt und anschließend an die Kinder vererbt.
     * @memberOf PanelString
     *
     * @param {Controller} controller - Der Hauptcontroller um den PanelString richtig darzustellen
     * @param {Panel} masterPanel - MasterPanel, an dem sich die Kinder anschließend orientieren werden.
     */
    constructor(controller, masterPanel) {
        this.controller = controller;
        this.masterPanel = masterPanel;
        this.panels = [];
        this.unifier = PanelString.UNIFIER++;
    }

    /**
     * Es wird ein erstelltes Panel übergeben, welches anschließend die Eigentschaften des MasterPanels übernimmt.
     * Und an den PanelString angehängt wird.
     *
     * @memberOf PanelString
     * @param {Panel} panel - Erstelltes Panel
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
     * Wir delegieren die Funktion von 'align' an {@link Panel#align} um ein Neujustierung des Panels vorzunehmen.
     *
     * @memberOf PanelString
     * @param {Controller} controller - Hauptcontroller, damit die Anpassung Fehlerfrei verläuft
     * @param {number} width - Breite des Panels
     * @param {number} height - Höhe des Panels
     */
    align(controller, width, height) {
        this.masterPanel.align(controller, width, height);
    }

    /**
     * Gibt die Liste aller Längen- und Breitendegraden eines PanelStrings wieder
     * @memberOf PanelString
     *
     * @returns {Array} Liste aller Längen- und Breitengrade
     */
    getPointsAsList() {
        return this.getGeoJSON();
    }

    /**
     * Entfernt den zuletzt eingefügten Panel, bis auf den MasterPanel.
     * @memberOf PanelString
     *
     * @returns {string|number} Gibt die Id des entfernten Panel zurück.
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
     * Hier wird die Orientierung des PanelString gesetzt, hierbei setzten wir die Orientierung nur des MasterPanel,
     * anschließend werden die Kinder diese Einstellung bei {@link PanelString#refreshGeometrics} übernehmen und in
     * die gewünschte Richtung ausgerichtet.
     * @memberOf PanelString
     *
     * @param {number} orientation Orientierung von 0-360
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
     * Die Panelbreite wird an {@link Panel#setFrameWidth} delegiert.
     *
     * @memberOf PanelString
     * @param {number} width - Rahmenbreite des Panels
     */
    setFrameWidth(width){
        this.masterPanel.setFrameWidth(this.controller, width);
    }

    /**
     * Die Panelneigung wird an {@link Panel#setPitch} delegiert.
     *
     * @memberOf PanelString
     * @param {number} pitch - Neigung des Panels
     */
    setPitch(pitch) {
        this.masterPanel.setPitch(this.controller, pitch);
    }

    /**
     * Wir ändern die Position der oberen linken Ecke des MasterPanels.
     *
     * @memberOf PanelString
     * @param {L.latLngs} latlngs - Längen- und Breitengrad der neuen Position
     */
    setPosition(latlngs) {
        let topLeft = latlngs[0][0];
        let master = this.masterPanel;
        master.setTopLeft(this.controller, topLeft);
    }

    /**
     * Gibt die Rahmenbreite in Pixel wieder
     *
     * @memberOf PanelString
     * @returns {number} Gibt die Rahmenbreite in Pixel wieder
     */
    getFrameWidth() {
        return this.masterPanel.getFrameWidthInPixel(this.controller);
    }

    /**
     * Ermittelt die Position, wo das anliegende Panel als nächstes angesetzt wird.
     * Wir erhalten die Position der oben-rechten Ecke, welches die obere-linke Ecke des Nachfolgers ist.
     *
     * @memberOf PanelString
     * @private
     * @param {Panel} panel - Aktuelles Panel
     * @returns {L.latLngs} Die obere-rechte Ecke des Panels
     */
    private getNextPoint(panel) {
        return panel.getPointsAsList()[1];
    }

    /**
     * Aktuallisiert die Position der einzelnen Panels, hierbei orientieren wir uns am MasterPanel.
     * Die Einstellungen des MasterPanels werden an die Kinder weitergegeben, dabei dient die obere-rechte Ecke
     * des Vorgängers, als Ausgangspunkt (oben-links) für den Nachfolger
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
     * Gibt einen Array aller Panels mit entsprechen Längen- und Breitengraden ({@link Panel#getLatLngsAsArray) wieder
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
     * Gibt ein Panel zurück mit Hilfe des Index
     *
     * @memberOf PanelString
     * @param {number} index - Index des gewünschten Panels
     * @returns {Panel} Gibt gewähltes Panel zurück
     */
    get(index) {
        if(index === 0) {
            return this.masterPanel;
        } else {
            return this.panels[index-1];
        }
    }

    /**
     * Gibt die Anzahl der Panels im PanelString zurück
     *
     * @memberOf PanelString
     * @returns {number} Anzahl der Panels
     */
    size() {
        return this.panels.length + 1;
    }

    /**
     * Gibt die Id des MasterPanels zurück
     *
     * @memberOf PanelString
     * @returns {number} Id des MasterPanels
     */
    getId() {
        return this.masterPanel.getId();
    }

    /**
     * Vergleicht aktuelles PanelString mit dem übergeben PanelString.
     *
     * @memberOf PanelString
     * @param {PanelString} panelstring - Anderer PanelString
     * @returns {boolean} Gibt an ob die Panels gleich sind.
     */
    equals(panelstring) {
        if(panelstring.masterPanel === undefined) {
            return false;
        }
        return this.getId() === panelstring.getId() && this.size() === panelstring.size() && this.unifier === panelstring.unifier;
    }
}