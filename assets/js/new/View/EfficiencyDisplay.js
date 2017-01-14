var EfficiencyDisplay = (function () {

    /**
     * Repräsentiert die Anzeige für die Effizienz
     * @constructor
     */
    function EfficiencyDisplay() {

        this.panelCounter = $('#panel_counter');
        this.panelArea = $('#panel_area');
        this.panelNominal = $('#panel_nominal');
        this.panelPerYear = $('#panel_per_year');

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
     * @return {number}
     */
    EfficiencyDisplay.prototype.getPanelCounter = function () {
        return this.panel.counter;
    };

    /**
     * Setzt die Anzahl der Panels zurück
     * @param {number} counter - Anzahl der Panels
     */
    EfficiencyDisplay.prototype.setPanelCounter = function (counter) {
        this.panel.counter = counter;
        this.panelCounter.html(counter);
    };

    /**
     *
     * @returns {number}
     */
    EfficiencyDisplay.prototype.getPanelArea = function () {
        return this.panel.area;
    };

    /**
     *
     * @param squareMeter
     */
    EfficiencyDisplay.prototype.setPanelArea = function (squareMeter) {
        this.panel.area = squareMeter;
        this.panelArea.html(squareMeter + " m²");
    };

    /**
     *
     * @returns {number}
     */
    EfficiencyDisplay.prototype.getPanelNominal = function () {
        return this.panel.nominal;
    };


    /**
     *
     * @param nominal
     */
    EfficiencyDisplay.prototype.setPanelNominal = function (nominal) {
        this.panel.nominal = nominal;
        this.panelNominal.html(nominal + " kWh");
    };

    /**
     *
     * @returns {number}
     */
    EfficiencyDisplay.prototype.getPerYear = function () {
        return this.panel.perYear
    };

    /**
     *
     * @param perYear
     */
    EfficiencyDisplay.prototype.setPerYear = function (perYear) {
        this.panel.perYear = perYear;
        this.panelPerYear.html(perYear + " kWH/Jahr")
    };

    /**
     *
     * @param warning
     */
    EfficiencyDisplay.prototype.showWarning = function (warning) {
        this.warningContainer.removeClass('hidden');
        this.warningMessage.html(warning);
    };

    /**
     */
    EfficiencyDisplay.prototype.hideWarning = function () {
        this.warningContainer.addClass('hidden');
    };

    return EfficiencyDisplay;
}());
