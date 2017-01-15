/**
 * EfficencyTabel //TODO weiß nicht genau was es macht
 * @type {[number]}
 */
var efficencyTabel = [
  [87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87],
  [93, 93, 93, 92, 92, 91, 90, 89, 88, 86, 85, 84, 83, 81, 81, 80, 79, 79, 79],
  [97, 97, 97, 96, 95, 93, 91, 89, 87, 85, 82, 80, 77, 75, 73, 71, 70, 70, 70],
  [100, 99, 99, 97, 96, 94, 91, 88, 85, 82, 79, 75, 72, 69, 66, 64, 62, 61, 61],
  [100, 99, 99, 97, 95, 93, 90, 86, 83, 79, 75, 71, 67, 63, 59, 56, 54, 52, 52],
  [98, 97, 96, 95, 93, 90, 87, 83, 79, 75, 70, 66, 61, 56, 52, 48, 45, 44, 43],
  [94, 93, 92, 91, 88, 85, 82, 78, 74, 70, 65, 60, 55, 50, 46, 41, 38, 36, 35],
  [88, 87, 86, 85, 82, 79, 76, 72, 68, 70, 58, 54, 49, 44, 39, 35, 32, 29, 28],
  [80, 79, 78, 77, 75, 72, 68, 65, 61, 56, 51, 47, 42, 37, 33, 29, 26, 24, 23],
  [69, 69, 69, 67, 65, 63, 60, 56, 53, 48, 44, 40, 35, 31, 27, 24, 21, 19, 18]  
];

// TODO entfernen?
//panellist ist eine Liste mit Panelobjekten mit {"height": int, "width": int}
//global ist die Einstallung auf des Dach, beim mehreren Dachflächen der Durchschnitt alle Flächen
//tilt gibt die Neigung der Panele in Grad an
//rotation in wie fern die Panele nach Süden ausgerichtet sind, wobei 0 Grad voll
//Süden und 180 Grad von Nord
//Nennleistung der Panele ist fest 1000 Watt

/**
 * @typedef {Object} Effizienz
 * @property {number} nominal - Nennleistung
 * @property {number} perYear - Leistung pro Jahr
 * @property {number} counter - Anzahl der Panels
 * @property {number} area - Fläche
 */

/**
 * TODO ausführlicher?
 * Wir berechnen die Effizienz der Panels anhand der eingebenen Einstellungen.
 *
 * @param {Panel[]} panels - Liste mit Panelobjekten mit {"height": int, "width": int}
 * @param {number} global - Einstrahlung auf des Dach, beim mehreren Dachflächen der Durchschnitt aller Flächen
 * @return {Effizienz} Gibt die Effizienz im Json Format zurück
 */
function evaluateEfficiency (panels, global){
	var panelarea = 0;
	var nominaloutput = 1000;
	var efficiency = 0.15;
	var KWPerYear = 0;
	var totalPanelarea = 0;
	var usedPanels = 0;
	
    for (var i in panels) {
        if(panels[i].pitch <= 90) {
            orientation = panels[i].orientation;
            if(orientation < 90) {
                orientation += 90;
            } else if(orientation > 180 && orientation < 270) {
                orientation-=180;
            } else if(orientation >= 270) {
                orientation-=270;
            }
            orientation = Math.round(orientation / 10);
            pitch = Math.round(panels[i].pitch / 10);
            panelarea = (panels[i].height * panels[i].width);
            totalPanelarea+=panelarea;
            KWPerYear += (nominaloutput * efficiency * panelarea * global) / 1000 * (efficencyTabel[pitch][orientation] / 100);
            usedPanels++;
        }
    }
	return {
        nominal: nominaloutput,
        perYear: parseFloat(KWPerYear.toFixed(2)),
        counter: usedPanels,
        area: totalPanelarea
    };
}	


	
	
		