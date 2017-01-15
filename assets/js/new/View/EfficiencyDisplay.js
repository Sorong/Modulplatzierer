var EfficiencyDisplay = (function () {

    /**
     * Repräsentiert die Anzeige für die Effizienz
     * @class
     * @constructor EfficiencyDisplay
     * @property {jQuery} panelCounter Html Element für die Anzeige der Panelanzahl
     * @property {jQuery} panelArea Html Element für die Anzeige der Quatratmeter
     * @property {jQuery} panelNominal Html Element für die Anzeige der Nennleistung
     * @property {jQuery} panelPerYear Html Element für die Anzeige den Stromertrag pro Jahr
     * @property {jQuery} warningContainer Html Element für die Warnung
     * @property {jQuery} warningMessage Html Element für die Anzeige der Warnung
     * @property {object} panel Panel hält die Daten für die Anzeige
     * @property {number} panel.counter Hält die Anzahl der Panels
     * @property {number} panel.area Hält die Anzahl der Panels
     * @property {number} panel.nominal Hält die Anzahl der Panels
     * @property {number} panel.perYear Hält die Anzahl der Panels
     */
    function EfficiencyDisplay() {
        this.panelCounter   = $('#panel_counter');
        this.panelArea      = $('#panel_area');
        this.panelNominal   = $('#panel_nominal');
        this.panelPerYear   = $('#panel_per_year');
        this.warningContainer = $('#panel_efficiency_error');
        this.warningMessage = $('#panel_efficiency_error').find('.warningMessage');
        this.panel = {
            counter: 0,
            area: 0,
            nominal: 0,
            perYear: 0
        }
    }

    /**
     * Gibt die Anzahl der Panels zurück
     * @memberOf EfficiencyDisplay
     * @return {number} Anzahl der Panels
     */
    EfficiencyDisplay.prototype.getPanelCounter = function () {
        return this.panel.counter;
    };

    /**
     * Setzt die Anzahl der Panels und zeigt die an.
     * @memberOf EfficiencyDisplay
     * @param {number} counter - Anzahl der Panels
     */
    EfficiencyDisplay.prototype.setPanelCounter = function (counter) {
        this.panel.counter = counter;
        this.panelCounter.html(counter);
    };

    /**
     * Gibt die gesetzten Quadratmeter des Panelstrings wieder
     * @memberOf EfficiencyDisplay
     * @returns {number} Quadratmeter
     */
    EfficiencyDisplay.prototype.getPanelArea = function () {
        return this.panel.area;
    };

    /**
     * Setzt die Quadratmeter der Panelstring Fläche und zeigt diese an
     * @memberOf EfficiencyDisplay
     * @param {number} squareMeter - Quadratmeter
     */
    EfficiencyDisplay.prototype.setPanelArea = function (squareMeter) {
        this.panel.area = squareMeter;
        this.panelArea.html(squareMeter + " m²");
    };

    /**
     * Gibt die gesetzte Nennleistung zurück
     * @memberOf EfficiencyDisplay
     * @returns {number} Nennleistung
     */
    EfficiencyDisplay.prototype.getPanelNominal = function () {
        return this.panel.nominal;
    };

    /**
     * Setzt die Nennleistung und zeigt diese an
     * @memberOf EfficiencyDisplay
     * @param {number} nominal - Nennleistung
     */
    EfficiencyDisplay.prototype.setPanelNominal = function (nominal) {
        this.panel.nominal = nominal;
        this.panelNominal.html(nominal + " kWh");
    };

    /**
     * Gibt den gesetzten Stromertrag zurück
     * @memberOf EfficiencyDisplay
     * @returns {number} Stromertrag
     */
    EfficiencyDisplay.prototype.getPerYear = function () {
        return this.panel.perYear
    };

    /**
     * Setzt den Stromertrag pro Jahr und zeigt diesen an
     * @memberOf EfficiencyDisplay
     * @param {number} perYear - Stromertrag
     */
    EfficiencyDisplay.prototype.setPerYear = function (perYear) {
        this.panel.perYear = perYear;
        this.panelPerYear.html(perYear + " kWH/Jahr")
    };

    /**
     * Zeigt den Warnhinweis, mit der übergeben Warnung, an.
     * @memberOf EfficiencyDisplay
     * @param {string} warning - Warnung
     */
    EfficiencyDisplay.prototype.showWarning = function (warning) {
        this.warningContainer.removeClass('hidden');
        this.warningMessage.html(warning);
    };

    /**
     * Verbirgt den Warnhinweis
     * @memberOf EfficiencyDisplay
     */
    EfficiencyDisplay.prototype.hideWarning = function () {
        this.warningContainer.addClass('hidden');
    };

    return EfficiencyDisplay;
}());
