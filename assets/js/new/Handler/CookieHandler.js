/**
 * Konstruiert ein CookieHandler-Objekt, dass Cookies vom Benutzer lesen, schreiben und löschen kann.
 * @class
 * @constructor
 * @param {string} name Der Name des Cookies, der gelesen, geschrieben oder gelöscht werden soll.
 * @property {string} name Der gespeicherte Cookie-Name.
 */
function CookieHandler(name) {
    this.name = name;
}
/**
 * Erstellt einen Cookie mit dem Wert und Ablaufdatum.
 * @param {*}value Der Wert, der beim Nutzer geschrieben werden soll. Der Wert wird als String konvertiert (..." " + value +  " "...).
 * Somit ist grundsätzlich jeder Datentyp möglich, jedoch ist es sinnvoller nummerische Werte oder Strings statt Objekte zu nutzen.
 * @param {number} dueDate Ablaufdatum als UNIX-Zeitstempel. Negative Werte führen dazu, dass der Cookie vom Browser gelöscht wird.
 */
CookieHandler.prototype.createCookie = function (value, dueDate) {
    if (dueDate) {
        var date = new Date();
        date.setTime(dueDate);
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = this.name + "=" + value + expires;
};
/**
 * Liest einen Cookie vom Benutzer, der Cookie wird anhand des im CookieHandler gespeicherten Namen identifiziert.
 * @returns {string|null} Wenn ein Cookie mit dem gespeicherten Namen vorhanden ist wird der gespeicherte Wert zurückgegeben.
 * Wenn kein Cookie mit dem Namen gefunden wird, wird "null" zurückgegebeben.
 */
CookieHandler.prototype.readCookie = function () {
    var nameEQ = this.name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

/**
 * Löscht ein existierenden Cookie.
 */
CookieHandler.prototype.eraseCookie = function () {
    this.createCookie("", -1);
};
