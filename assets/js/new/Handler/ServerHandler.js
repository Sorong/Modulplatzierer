function ServerHandler(url) {
    this.serverURL = url;
    this.errorFunction = function () {
        console.log("Fehler beim Versuch mit dem Server zu kommunizieren");
    }
}

ServerHandler.prototype.getCookie = function (id, callback) {
    var serverFunction = "cookie/getCookie/" + id;
    this._get(serverFunction, function (data) {
        callback(data);
    });
};

ServerHandler.prototype.getPredefinedRoof = function (street, nr, citycode, callback) {
    var serverFunction = "dach/getPredefinedRoof/" + street + "/" + nr + "/" + citycode;
    this._get(serverFunction, function (data) {
        callback(data);
    });
};

ServerHandler.prototype.getRoofParts = function (gid, callback) {
    var serverFunction = "dach/getRoofParts/" + gid;
    this._get(serverFunction, function (data) {
        callback(data);
    });
};

ServerHandler.prototype.removePanel = function (id, callback) {
    var serverFunction = "panel/removePanel/" + id;
    this._get(serverFunction, function (data) {
        callback(data);
    })
};

ServerHandler.prototype.postCookie = function (json, callback) {
    this._post(json, "cookie/postCookie", function (data) {
        callback(data);
    });
};

ServerHandler.prototype.postPanel = function (json, model, callback) {
    this._post(json, "panel/postPanel", function (data) {
        callback(data, model);
    })
};

ServerHandler.prototype.updatePanel = function (json, callback) {
    this._post(json, "panel/updatePanel", function (data) {
        callback(data);
    })
};




ServerHandler.prototype._get = function (serverFunction, successCallback) {
    var errorFunction = this.errorFunction;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: this.serverURL + serverFunction
    }).done(successCallback).fail(errorFunction);
};

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