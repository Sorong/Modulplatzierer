serverURL = 'http://localhost:8080/SolarRESTService_war_exploded/server';

function createCookie(name,value, duedate) {
    if (duedate) {
        var date = new Date();
        date.setTime(duedate);
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires;
  //  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}


function getPanelsFromServer(id) {
	//var panelData;
    $.ajax({
   // 	async: false,
     	type: "GET",
        dataType: "json",
        url: serverURL + '/getRoof/' + id,
    }).done(function (data) {
        if(data === undefined) {
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
 //   return panelData;
}


function createCookieFromServer(dueDate) {
	//var cookieID;
    $.ajax({
    //	async: false,
        crossDomain: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        cors: "true",
        url: serverURL + '/postCookie/',
        data : JSON.stringify({
             cookie_id : 0,
             ablaufdatum : dueDate
        }),

        header : {
            "content-type": "application/json"
        }

    }).done(function (data) {
       // cookieID = data;
        setCookie(data, dueDate);
    }).fail(function () {
        console.log("Fehler beim Versuch mit dem Server zu kommunizieren");
    });
    //return cookieID;
}

function getCookieFromServer(id){
	var cookie;
    $.ajax({
    	async: false,
     	type: "GET",
        dataType: "json",
        url: serverURL + '/getCookie/' + id,
    }).done(function (data) {
        cookie = data;
    }).fail(function () {
        console.log("Fehler beim Versuch mit dem Server zu kommunizieren");
    });
    return cookie;
}

function postPanelToServer(panel) {

	$.ajax({
    	async: false,
        crossDomain: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        cors: "true",
        url: serverURL + '/postPanel/',
        data : JSON.stringify({
         	panel_id: panel.id,
         	obenLinks: panel.originTopLeft,
         	obenRechts: panel.originTopRight,
         	untenRechts: panel.originBottomRight,
         	untenLinks: panel.originBottomLeft,
         	laenge: 0,
         	breite: 0,
         	neigung: panel.pitch,
         	ausrichtung: panel.orientation,
         	rahmenbreite: 0
         }),
        
        header : {
            "content-type": "application/json",
        },

    }).done(function (data) {
        panel.id = data;
    }).fail(function () {
        console.log("Fehler beim Versuch mit dem Server zu kommunizieren");
    });
}

function updatePanelToServer(panel) {

	$.ajax({
    	async: false,
        crossDomain: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        cors: "true",
        url: serverURL + '/postPanel/',
        data : JSON.stringify({
         	panel_id: panel.panel_id,
         	obenlinks: panel.obenLinks,
         	obenRechts: panel.obenRechts,
         	untenRechts: panel.untenRechts,
         	untenLinks: panel.untenLinks,
         	laenge: panel.laenge,
         	breite: panel.breite,
         	neigung: panel.neigung,
         	ausrichtung: panel.ausrichtung,
         	rahmenbreite: panel.rahmenbreite
         }),
        
        header : {
            "content-type": "application/json",
        },

    }).done(function (data) {
    }).fail(function () {
        console.log("Fehler beim Versuch mit dem Server zu kommunizieren");
    });
}
    


function postRoofToServer(roof) {
	//var roofId;
	$.ajax({
    //	async: false,
        crossDomain: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        cors: "true",
        url: serverURL + '/postRoof/',
        data : JSON.stringify({
         	dach_id : roof.dach_id,
            strasse : roof.strasse,
            hausnummer : roof.hausnummer,
            postleitzahl : roof.postleitzahl,
            dachneigung : roof.dachneigung,
            koord_dachmitte_lng : roof.koord_dachmitte_lng,
            koord_dachmitte_lat : roof.koord_dachmitte_lat,
            cookie : {
                cookie_id : roof.cookie.cookie_id,
                dach_ids : [],
            ablaufdatum : roof.cookie.ablaufdatum
            }
        }),
        
        header : {
            "content-type": "application/json"
        }

    }).done(function (data) {
      //  roofId = data;
        setRoofId(data);
    }).fail(function () {
        console.log("Fehler beim Versuch mit dem Server zu kommunizieren");
    });
    //return roofId;
}
