/**
 * Konstruiert ein ServerHandler-Objekt, dass die Kommunikation
 * mit der REST-Schnittstelle des als Parameter angegebenen Servers übernimmt.
 * @class
 * @constructor
 * @param {string} url Die URL des Servers mit dem kommuniziert werden soll.
 * @property {string} serverUrl Die URL des Servers.
 * @property {function} errorFunction Eine Standardfunktion, die im Fehlerfall ausgeführt wird.
 */
function ServerHandler(url) {
    this.serverURL = url;
    this.errorFunction = function () {
        console.log("Fehler beim Versuch mit dem Server zu kommunizieren");
    }
}
/**
 * Löst den GET-Request cookie/getCookie/, des in der URL des ServerHandlers gespeicherten Servers, aus.
 * Die Anfrage hat die Form "URL/cookie/getCookie/id"
 * @param {number} id Die ID, die der Serverfunktion übergeben wird.
 * @param {function} callback Die Funktion, die im Erfolgfall aufgerufen werden soll. Die Funktion erhält den vom Server enhaltende Response.
 */
ServerHandler.prototype.getCookie = function (id, callback) {
    var serverFunction = "cookie/getCookie/" + id;
    this._get(serverFunction, function (data) {
        callback(data);
    });
};
/**
 * Löst den GET-Request dach/getPredefinedRoof/ des in der URL des ServerHandlers gespeicherten Servers aus.
 * Die Anfrage hat die Form "URL/dach/getPredefinedRoof/street/nr/citycode"
 * @param {string} street Der Straßenname, der dem Server übergeben wird.
 * @param {number} nr Die Hausnummer, die dem Server übergeben wird.
 * @param {number} citycode Die Postleitzahl, die dem Server übergeben wird.
 * @param {function} callback Die Funktion, die im Erfolgfall aufgerufen werden soll. Die Funktion erhält den vom Server enhaltenen Response.
 */
ServerHandler.prototype.getPredefinedRoof = function (street, nr, citycode, callback) {
    var serverFunction = "dach/getPredefinedRoof/" + street + "/" + nr + "/" + citycode;
    this._get(serverFunction, function (data) {
        callback(data);
    });
};
/**
 * Löst den GET-Request dach/getRoofParts/ ,des in der URL des ServerHandlers gespeicherten Servers, aus.
 * Die Anfrage hat die Form "URL/dach/getRoofParts/gid"
 * @param {number} gid Die GebäudeID, die dem Server übergeben wird.
 * @param {function} callback Die Funktion, die im Erfolgfall aufgerufen werden soll. Die Funktion erhält den vom Server erhaltende Response.
 */
ServerHandler.prototype.getRoofParts = function (gid, callback) {
    var serverFunction = "dach/getRoofParts/" + gid;
    this._get(serverFunction, function (data) {
        callback(data);
    });
};
/**
 * Löst den GET-Request panel/removePanel/, des in der URL des ServerHandlers gespeicherten Servers, aus.
 * Die Anfrage hat die Form "URL/panel/removePanel/id"
 * @param {number} id Die PanelID, die dem Server übergeben wird.
 * @param {function} callback Die Funktion, die im Erfolgfall aufgerufen werden soll. Die Funktion erhält den vom Server erhaltende Response.
 */
ServerHandler.prototype.removePanel = function (id, callback) {
    var serverFunction = "panel/removePanel/" + id;
    this._get(serverFunction, function (data) {
        callback(data);
    })
};
/**
 * Löst den POST-Request, des in der URL des ServerHandlers gespeichtern Servers, aus.
 * Die Server-Funktion "cookie/postCookie" wird genutzt.
 * @param {string} json Das JSON-Objekt, als String, welches dem Server übermittelt wird.
 * @param {function} callback Die Funktion, die im Erfolgfall aufgerufen werden soll. Die Funktion erhält den vom Server erhaltende Response.
 */
ServerHandler.prototype.postCookie = function (json, callback) {
    this._post(json, "cookie/postCookie", function (data) {
        callback(data);
    });
};
/**
 * Löst den POST-Request, des in der URL des ServerHandlers gespeichtern Servers, aus.
 * Die Server-Funktion "panel/postPanel" wird genutzt.
 * @param {string} json Das JSON-Objekt, als String, welches dem Server übermittelt wird.
 * @param {Panel} model Das Panel, welches im Erfolgsfall der Callbackfunktion übergeben wird.
 * @param {function} callback Die Funktion, die im Erfolgfall aufgerufen werden soll.
 * Die Funktion erhält den vom Server enhaltenen Response und das Model welches postPanel-Funktion übergeben wurde.
 */

ServerHandler.prototype.postPanel = function (json, model, callback) {
    this._post(json, "panel/postPanel", function (data) {
        callback(data, model);
    })
};
/**
 *  Löst den POST-Request, des in der URL des ServerHandlers gespeicherten Servers, aus.
 *  Die Server-Funktion "panel/updatePanel" wird genutzt.
 * @param {string} json Das JSON-Objekt, als String, welches dem Server übermittelt wird.
 * @param {function} callback Die Funktion, die im Erfolgfall aufgerufen werden soll. Die Funktion erhält den vom Server enhaltenen Response.
 */

ServerHandler.prototype.updatePanel = function (json, callback) {
    this._post(json, "panel/updatePanel", function (data) {
        callback(data);
    })
};
/**
 * Löst den POST-Request, des in der URL des ServerHandlers gespeicherten Servers, aus.
 * Die Server-Funktion "dach/postRoof" wird genutzt.
 * @param {string} json Das JSON-Objekt, als String, welches dem Server übermittelt wird.
 * @param {function} callback Die Funktion, die im Erfolgfall aufgerufen werden soll. Die Funktion erhält den vom Server enhaltenen Response.
 */
ServerHandler.prototype.postRoof = function (json, callback) {
    this._post(json, "dach/postRoof", function (data) {
        callback(data);
    })
};


/**
 * Generalisierung aller GET-Funktionen.
 * Hier wird die AJAX-Anfrage durchgeführt und im Erfolgsfall die übergebene Callbackfunktion ausgelöst,
 * ansonsten die Error-Funktion, die im ServerHandler gespeichert ist.
 * @param {string} serverFunction Name/Pfad der Serverfunktion die angesprochen werden soll.
 * @param {function} successCallback Funktion, die als Callback im Erfolgsfall aufgerufen werden soll.
 * @example _get("cookie/getCookie/1", function(data) { } );
 * @private
 */

ServerHandler.prototype._get = function (serverFunction, successCallback) {
    var errorFunction = this.errorFunction;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: this.serverURL + serverFunction,
        timeout: 3000
    }).done(successCallback).fail(errorFunction);
};
/**
 * Generalisieurng aller POST-Funktionen.
 * Hier wird die AJAX-Anfrage durchgeführt und im Erfolgsfall die übergebene Callbackfunktion ausgelöst,
 * ansonsten die Error-Funktion, die im ServerHandler gespeichert ist.
 * @param {string} objAsJson Das JSON-Objekt als String, dass dem Server übermittelt werden soll.
 * @param {string} serverFunction Name/Pfad der Serverfunktion die angesprochen werden soll.
 * @param {function} successCallback Funktion, die als Callback im Erfolgsfall aufgerufen werden soll.
 * @example _get(JSON-String, "cookie/postCookie", function(data) { } );
 * @private
 */

ServerHandler.prototype._post = function (objAsJson, serverFunction, successCallback) {
    var errorFunction = this.errorFunction;
    $.ajax({
        crossDomain: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        cors: "true",
        url: this.serverURL + serverFunction + '/',
        data: objAsJson,
        header: {
            "content-type": "application/json"
        }
    }).done(successCallback).fail(errorFunction);
};