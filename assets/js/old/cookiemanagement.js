/* CookieHandler */
function CookieHandler(name) {
    this.name = name;
}

CookieHandler.prototype.createCookie = function (value, dueDate) {
    if (dueDate) {
        var date = new Date();
        date.setTime(dueDate);
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = this.name + "=" + value + expires;
};

CookieHandler.prototype.readCookie = function () {
    var nameEQ = this.name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.height; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.height);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.height, c.height);
    }
    return null;
};

CookieHandler.prototype.eraseCookie = function () {
    this.createCookie("", -1);
};

/* ServerHandler */
function ServerHandler(url) {
    this.serverURL = url;
    this.default_error_function = function () {
        console.log("Fehler beim Versuch mit dem Server zu kommunizieren");
    }
}

ServerHandler.prototype.getPanelsFromServer = function (id, callback) {
    var server_fun = "/getRoof/" + id;
    this._get(server_fun, function (data) {
        callback(data);
    });
};


ServerHandler.prototype.getCookieFromServer = function (id, callback) {
    var server_fun = "/getCookie/" + id;
    this._get(server_fun, function (data) {
        callback(data);
    });
};

ServerHandler.prototype.getPredefinedRoof = function (street, nr, citycode, callback) {
  var server_fun = "/getPredefinedRoof/" + street + "/" + nr + "/" + citycode;
    this._get(server_fun, function (data) {
        callback(data)
    });
};

ServerHandler.prototype.getRoofParts = function (gid, callback) {
  var server_fun = "/getRoofParts/" + gid;
    this._get(server_fun, function (data) {
        callback(data);
    });
};

ServerHandler.prototype.createCookieFromServer = function (dueDate, callback) {
    var dataString = JSON.stringify({
        cookie_id: 0,
        ablaufdatum: dueDate
    });
    this._post(dataString, "postCookie", function (data) {
         callback(data, dueDate);
    });
};

ServerHandler.prototype.postPanelToServer = function (roofid, panel, callback) {
    var dataString = JSON.stringify({
        cookie_id: roofid,
        panel_id: panel.id,
        obenLinks: [panel.originTopLeft.lat, panel.originTopLeft.lng],
        obenRechts: [panel.originTopRight.lat, panel.originTopRight.lng],
        untenRechts: [panel.originBotRight.lat, panel.originBotRight.lng],
        untenLinks: [panel.originBotLeft.lat, panel.originBotLeft.lng],
        laenge: panel.height,
        breite: panel.width,
        neigung: panel.pitch,
        ausrichtung: panel.orientation,
        rahmenbreite: 0
    });
    this._post(dataString, "postPanel", function (data) {
        panel.id = data;
        callback(data, panel);
    });
};

ServerHandler.prototype.updatePanelToServer = function (roofid, panel, callback) {
    var dataString = JSON.stringify({
        cookie_id: roofid,
        panel_id: panel.id,
        obenLinks: [panel.originTopLeft.lat, panel.originTopLeft.lng],
        obenRechts: [panel.originTopRight.lat, panel.originTopRight.lng],
        untenRechts: [panel.originBotRight.lat, panel.originBotRight.lng],
        untenLinks: [panel.originBotLeft.lat, panel.originBotLeft.lng],
        laenge: panel.height,
        breite: panel.width,
        neigung: panel.pitch,
        ausrichtung: panel.orientation,
        rahmenbreite: 0
    });
    this._post(dataString, "updatePanel", function (data) {
        //TODO: Callback bei Erfolg?
    });
};


ServerHandler.prototype.postRoofToServer = function (roof, callback) {
    var dataString = JSON.stringify({
        dach_id: roof.dach_id,
        strasse: roof.strasse,
        hausnummer: roof.hausnummer,
        postleitzahl: roof.postleitzahl,
        dachneigung: roof.dachneigung,
        koord_dachmitte_lng: roof.koord_dachmitte_lng,
        koord_dachmitte_lat: roof.koord_dachmitte_lat,
        cookie: {
            cookie_id: roof.cookie.cookie_id,
            dach_ids: [],
            ablaufdatum: roof.cookie.ablaufdatum
        }
    });
    this._post(dataString, "postRoof", function (data) {
        callback(data);
    });
};

ServerHandler.prototype._get = function (serverfunc, success, error) {
    var error_fun;
    if (error === undefined) {
        error_fun = this.default_error_function;
    } else {
        error_fun = error;
    }

    $.ajax({
        type: "GET",
        dataType: "json",
        url: this.serverURL + serverfunc
    }).done(success).fail(error_fun);
};

ServerHandler.prototype._post = function (json, serverfunc, success, error) {
    var error_fun;
    if (error === undefined) {
        error_fun = this.default_error_function;
    } else {
        error_fun = error;
    }
    $.ajax({
        crossDomain: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        cors: "true",
        url: this.serverURL + '/' + serverfunc + '/',
        data: json,
        header: {
            "content-type": "application/json"
        }
    }).done(success).fail(error_fun);
};

