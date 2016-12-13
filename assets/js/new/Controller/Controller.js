const HOST = "localhost";

const DAYS_TILL_COOKIE_EXPIRE = 30;
const COOKIENAME = "Modulplatzierer";
const SERVER_URL = "http://" + HOST + ":8080/SolarRESTService_war_exploded/server";


function Controller() {
    this.serverstatus = true;
}

Controller.prototype.init = function () {

};

Controller.prototype.disableServer = function () {

};

Controller.prototype.enableServer = function () {

};

Controller.prototype.loadFromServer = function () {

};

Controller.prototype.saveToServer = function(panel) {

};

Controller.prototype.createUserCookie = function (cid, duedate) {
    this.cookieId = cid;
    this.cookieHandler.createCookie(cid, duedate);
};

Controller.prototype.updateModel = function(polygon) {

};

Controller.prototype.getLatLngAsPoint = function() {
    return this.mapContainer.latLngToLayerPoint();
};






/* Callbackfunktionen */

function swapServerstatus() {
    if(controller !== undefined) {
        controller.serverstatus ? controller.disableServer() : controller.enableServer();
    }
}

function getPanelsFromCookieData(data) {
    var arr = [];
    data.solarpanelList.forEach(getPanels);
    function getPanels(element) {
        arr.push(element);
    }
    /*TODO: cs.updateLoadedFromServer(arr);
    Das Pushen in das Array könnte überflüssig sein.

     */
}

function createUserCookie(cid, duedate) {
    controller.createUserCookie(cid, duedate);
}

function weissnochnicht() {
    
}