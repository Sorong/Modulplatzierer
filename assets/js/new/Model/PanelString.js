/**
 * @class PanelString
 *
 * @property {number} UNIFIER - Hauptzähler der einmaligen Zahl
 * @property {number} unifier - Hält die einmalige Zahl, die während einer Session zugeordnet wird.
 * @property {Controller} controller - Hauptcontroller um die richtige Darstellung auf der Karte zu garantieren
 * @property {Panel} masterPanel - Hauptpanel an dem sich die Childs ausrichten
 * @property {Panel[]} panels - Panels, die an den Hauptpanel angehängt werden
 */
var PanelString = (function () {
    /**
     * Erstellt ein PanelString Object. Das PanelString Object verwaltet die korrekte Aneinanderreihung der Panels.<br/>
     * Die Haupteinstellgungen werden am übergeben MaserPanel getätigt und anschließend an die Kinder vererbt.
     * @memberOf PanelString
     *
     * @param {Controller} controller - Der Hauptcontroller um den PanelString richtig darzustellen
     * @param {Panel} masterPanel - MasterPanel, an dem sich die Kinder anschließend orientieren werden.
     */
    function PanelString(controller, masterPanel) {
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
    PanelString.prototype.appendPanel = function (panel) {
        if (panel != undefined) {
            var master = this.masterPanel;
            panel.topLeft = master.topLeft;
            panel.pitch = master.pitch;
            panel.orientation = master.orientation;
            panel.frameWidth = master.frameWidth;
            panel.align(this.controller, master.width, master.height);
            this.panels.push(panel);
        }
    };
    /**
     * Wir delegieren die Funktion von 'align' an {@link Panel#align} um ein Neujustierung des Panels vorzunehmen.
     *
     * @memberOf PanelString
     * @param {Controller} controller - Hauptcontroller, damit die Anpassung Fehlerfrei verläuft
     * @param {number} width - Breite des Panels
     * @param {number} height - Höhe des Panels
     */
    PanelString.prototype.align = function (controller, width, height) {
        this.masterPanel.align(controller, width, height);
    };
    /**
     * Gibt die Liste aller Längen- und Breitendegraden eines PanelStrings wieder
     * @memberOf PanelString
     *
     * @returns {Array} Liste aller Längen- und Breitengrade
     */
    PanelString.prototype.getPointsAsList = function () {
        return this.getGeoJSON();
    };
    /**
     * Entfernt den zuletzt eingefügten Panel, bis auf den MasterPanel.
     * @memberOf PanelString
     *
     * @returns {string|number} Gibt die Id des entfernten Panel zurück.
     */
    PanelString.prototype.removePanel = function () {
        var removedPanelId = this.masterPanel.id;
        if (this.panels.length !== 0) {
            removedPanelId = this.panels[this.panels.length - 1].id;
            var removePosition = this.panels.length - 1;
            this.panels.splice(removePosition, 1);
        }
        return removedPanelId;
    };
    /**
     * Hier wird die Orientierung des PanelString gesetzt, hierbei setzten wir die Orientierung nur des MasterPanel,
     * anschließend werden die Kinder diese Einstellung bei {@link PanelString#refreshGeometrics} übernehmen und in
     * die gewünschte Richtung ausgerichtet.
     * @memberOf PanelString
     *
     * @param {number} orientation Orientierung von 0-360
     */
    PanelString.prototype.setOrientation = function (orientation) {
        var master = this.masterPanel;
        var o = orientation;
        if (o < 0) {
            o += 360;
        }
        master.setOrientation(this.controller, o);
    };
    /**
     * Die Panelbreite wird an {@link Panel#setFrameWidth} delegiert.
     *
     * @memberOf PanelString
     * @param {number} width - Rahmenbreite des Panels
     */
    PanelString.prototype.setFrameWidth = function (width) {
        this.masterPanel.setFrameWidth(this.controller, width);
    };
    /**
     * Die Panelneigung wird an {@link Panel#setPitch} delegiert.
     *
     * @memberOf PanelString
     * @param {number} pitch - Neigung des Panels
     */
    PanelString.prototype.setPitch = function (pitch) {
        this.masterPanel.setPitch(this.controller, pitch);
    };
    /**
     * Wir ändern die Position der oberen linken Ecke des MasterPanels.
     *
     * @memberOf PanelString
     * @param {L.latLngs} latlngs - Längen- und Breitengrad der neuen Position
     */
    PanelString.prototype.setPosition = function (latlngs) {
        var topLeft = latlngs[0][0];
        var master = this.masterPanel;
        master.setTopLeft(this.controller, topLeft);
    };
    /**
     * Gibt die Rahmenbreite in Pixel wieder
     *
     * @memberOf PanelString
     * @returns {number} Gibt die Rahmenbreite in Pixel wieder
     */
    PanelString.prototype.getFrameWidth = function () {
        return this.masterPanel.getFrameWidthInPixel(this.controller);
    };
    /**
     * Ermittelt die Position, wo das anliegende Panel als nächstes angesetzt wird.
     * Wir erhalten die Position der oben-rechten Ecke, welches die obere-linke Ecke des Nachfolgers ist.
     *
     * @memberOf PanelString
     * @private
     * @param {Panel} panel - Aktuelles Panel
     * @returns {L.latLngs} Die obere-rechte Ecke des Panels
     */
    PanelString.prototype.getNextPoint = function (panel) {
        return panel.getPointsAsList()[1];
    };
    /**
     * Aktuallisiert die Position der einzelnen Panels, hierbei orientieren wir uns am MasterPanel.
     * Die Einstellungen des MasterPanels werden an die Kinder weitergegeben, dabei dient die obere-rechte Ecke
     * des Vorgängers, als Ausgangspunkt (oben-links) für den Nachfolger
     *
     * @memberOf PanelString
     * @private
     */
    PanelString.prototype.refreshGeometrics = function () {
        var orientation = this.masterPanel.orientation;
        var pitch = this.masterPanel.pitch;
        var nextLatLng = this.getNextPoint(this.masterPanel);
        var height = this.masterPanel.height;
        var width = this.masterPanel.width;
        var frameWidth = this.masterPanel.frameWidth;
        for (var i = 0; i < this.panels.length; i++) {
            this.panels[i].setTopLeft(this.controller, nextLatLng);
            this.panels[i].setOrientation(this.controller, orientation);
            this.panels[i].setPitch(this.controller, pitch);
            this.panels[i].width = width;
            this.panels[i].height = height;
            this.panels[i].frameWidth = frameWidth;
            nextLatLng = this.getNextPoint(this.panels[i]);
        }
    };
    /**
     * Gibt einen Array aller Panels mit entsprechen Längen- und Breitengraden ({@link Panel#getLatLngsAsArray) wieder
     * @memberOf PanelString
     *
     * @returns {Array} Array der Längen- und Breitengraden aller Panels
     */
    PanelString.prototype.getGeoJSON = function () {
        this.refreshGeometrics();
        var polygonArray = [];
        polygonArray.push(this.masterPanel.getLatLngsAsArray());
        for (var i = 0; i < this.panels.length; i++) {
            polygonArray.push(this.panels[i].getLatLngsAsArray());
        }
        return polygonArray;
    };
    /**
     * Gibt ein Panel zurück mit Hilfe des Index
     *
     * @memberOf PanelString
     * @param {number} index - Index des gewünschten Panels
     * @returns {Panel} Gibt gewähltes Panel zurück
     */
    PanelString.prototype.get = function (index) {
        if (index === 0) {
            return this.masterPanel;
        }
        else {
            return this.panels[index - 1];
        }
    };
    /**
     * Gibt die Anzahl der Panels im PanelString zurück
     *
     * @memberOf PanelString
     * @returns {number} Anzahl der Panels
     */
    PanelString.prototype.size = function () {
        return this.panels.length + 1;
    };
    /**
     * Gibt die Id des MasterPanels zurück
     *
     * @memberOf PanelString
     * @returns {number} Id des MasterPanels
     */
    PanelString.prototype.getId = function () {
        return this.masterPanel.getId();
    };
    /**
     * Vergleicht aktuelles PanelString mit dem übergeben PanelString.
     *
     * @memberOf PanelString
     * @param {PanelString} panelstring - Anderer PanelString
     * @returns {boolean} Gibt an ob die Panels gleich sind.
     */
    PanelString.prototype.equals = function (panelstring) {
        if (panelstring.masterPanel === undefined) {
            return false;
        }
        return this.getId() === panelstring.getId() && this.size() === panelstring.size() && this.unifier === panelstring.unifier;
    };
    PanelString.UNIFIER = 0;
    return PanelString;
}());
