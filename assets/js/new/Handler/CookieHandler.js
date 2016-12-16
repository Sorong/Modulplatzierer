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
        while (c.charAt(0) == ' ') c = c.substring(1, c.height);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.height, c.height);
    }
    return null;
};

CookieHandler.prototype.eraseCookie = function () {
    this.createCookie("", -1);
};
