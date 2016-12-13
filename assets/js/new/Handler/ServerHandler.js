function ServerHandler(url) {
    this.serverURL = url;
    this.default_error_function = function () {
        console.log("Fehler beim Versuch mit dem Server zu kommunizieren");
    }
}

ServerHandler.prototype.getCookie = function (id, callback) {
    
};

ServerHandler.prototype.getPredefinedRoof = function (street, nr, citycode, callback) {
    
};

ServerHandler.prototype.getRoofParts = function (gid, callback) {

};

ServerHandler.prototype.postCookie = function (duedate, callback) {
    
};

ServerHandler.prototype.postPanel = function (cookieid, panel, callback) {
    
};

ServerHandler.prototype.updatePanel = function () {

};

ServerHandler.prototype._get = function (serverfunc, success_cb, error_cb) {

};

ServerHandler.prototype._post = function (obj_as_json, serverfunc, success_cb, error_cb) {

};