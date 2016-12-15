function ServerHandler(url) {
    this.serverURL = url;
    this.errorFunction = function () {
        console.log("Fehler beim Versuch mit dem Server zu kommunizieren");
    }
}

ServerHandler.prototype.getCookie = function (id, callback) {
    var serverFunction = "/getRoof/" + id;
    this._get(serverFunction, function (data) {
        callback(data);
    });
};

ServerHandler.prototype.getPredefinedRoof = function (street, nr, citycode, callback) {
    var serverFunction = "/getPredefinedRoof/" + street + "/" + nr + "/" + citycode;
    this._get(serverFunction, function (data) {
        callback(data);
    });
};

ServerHandler.prototype.getRoofParts = function (gid, callback) {
    var serverFunction = "/getRoofParts/" + gid;
    this._get(serverFunction, function (data) {
        callback(data);
    });
};

ServerHandler.prototype.postCookie = function (duedate, callback) {
    
};

ServerHandler.prototype.postPanel = function (cookieid, panel, callback) {
    
};

ServerHandler.prototype.updatePanel = function () {

};

ServerHandler.prototype._get = function (serverFunction, successCallback) {

};

ServerHandler.prototype._post = function (objAsJson, serverFunction, successCallback) {

};