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
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

CookieHandler.prototype.eraseCookie = function () {
    createCookie(this.name, "", -1);
};

/* ServerHandler */
function ServerHandler(url) {
    this.serverURL = url;
}

ServerHandler.prototype.getPanelsFromServer = function (id) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: this.serverURL + '/getRoof/' + id
    }).done(function (data) {
        if (data === undefined) {
            return;
        }
        var arr = [];
        data.modelSolarpanelCollection.forEach(getPanels);
        function getPanels(element, index, array) {
            arr.push(element);
        }

        updateFromServer(arr);
    }).fail(function () {
        console.log("Fehler beim Versuch mit dem Server zu kommunizieren");
    });
};

ServerHandler.prototype.createCookieFromServer = function (dueDate) {
    $.ajax({
        crossDomain: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        cors: "true",
        url: this.serverURL + '/postCookie/',
        data: JSON.stringify({
            cookie_id: 0,
            ablaufdatum: dueDate
        }),

        header: {
            "content-type": "application/json"
        }

    }).done(function (data) {
        setCookie(data, dueDate);
    }).fail(function () {
        console.log("Fehler beim Versuch mit dem Server zu kommunizieren");
    });
};

ServerHandler.prototype.getCookieFromServer = function (id) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: this.serverURL + '/getCookie/' + id
    }).done(function (data) {
        loadCookieContent(data);
        //  cookie = data;
    }).fail(function () {
        console.log("Fehler beim Versuch mit dem Server zu kommunizieren");
    });
};

ServerHandler.prototype.postPanelToServer = function (roofid, panel) {
    var dataString = JSON.stringify({
        dach_id: roofid,
        panel_id: panel.id,
        obenLinks: [panel.originTopLeft.lat, panel.originTopLeft.lng],
        obenRechts: [panel.originTopRight.lat, panel.originTopRight.lng],
        untenRechts: [panel.originBotRight.lat, panel.originBotRight.lng],
        untenLinks: [panel.originBotLeft.lat, panel.originBotLeft.lng],
        laenge: panel.length,
        breite: panel.width,
        neigung: panel.pitch,
        ausrichtung: panel.orientation,
        rahmenbreite: 0
    });

    $.ajax({
        //	async: false,
        crossDomain: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        cors: "true",
        url: this.serverURL + '/postPanel/',
        data: dataString,
        header: {
            "content-type": "application/json"
        }

    }).done(function (data) {
        panel.id = data;

    }).fail(function () {
        console.log("Fehler beim Versuch mit dem Server zu kommunizieren");
    });
};

ServerHandler.prototype.updatePanelToServer = function (roofid, panel) {
    var dataString = JSON.stringify({
        dach_id: roofid,
        panel_id: panel.id,
        obenLinks: [panel.originTopLeft.lat, panel.originTopLeft.lng],
        obenRechts: [panel.originTopRight.lat, panel.originTopRight.lng],
        untenRechts: [panel.originBotRight.lat, panel.originBotRight.lng],
        untenLinks: [panel.originBotLeft.lat, panel.originBotLeft.lng],
        laenge: panel.length,
        breite: panel.width,
        neigung: panel.pitch,
        ausrichtung: panel.orientation,
        rahmenbreite: 0
    });
    $.ajax({
        crossDomain: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        cors: "true",
        url: this.serverURL + '/updatePanel/',
        data: dataString,

        header: {
            "content-type": "application/json"
        }

    }).done(function (data) {
        //TODO: Callback bei Erfolg?
    }).fail(function () {
        console.log("Fehler beim Versuch mit dem Server zu kommunizieren");
    });
};


ServerHandler.prototype.postRoofToServer = function (roof) {
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

    $.ajax({
        crossDomain: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        cors: "true",
        url: this.serverURL + '/postRoof/',
        data: dataString,

        header: {
            "content-type": "application/json"
        }

    }).done(function (data) {
        setRoofId(data);
    }).fail(function () {
        console.log("Fehler beim Versuch mit dem Server zu kommunizieren");
    });
};
