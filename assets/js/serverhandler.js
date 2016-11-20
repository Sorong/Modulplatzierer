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
	//var cookie;
    $.ajax({
  //  	async: false,
     	type: "GET",
        dataType: "json",
        url: serverURL + '/getCookie/' + id,
    }).done(function (data) {
        loadCookieContent(data);
      //  cookie = data;
    }).fail(function () {
        console.log("Fehler beim Versuch mit dem Server zu kommunizieren");
    });
    //return cookie;
}

function postPanelToServer(roofid, panel) {

	$.ajax({
    //	async: false,
        crossDomain: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        cors: "true",
        url: serverURL + '/postPanel/',
        data : JSON.stringify({
            dach_id: roofid,
         	panel_id: panel.id,
         	obenLinks: [panel.originTopLeft.lat, panel.originTopLeft.lng],
         	obenRechts: [panel.originTopRight.lat, panel.originTopRight.lng],
         	untenRechts: [panel.originBottomRight.lat, panel.originBottomRight.lng],
         	untenLinks: [panel.originBottomLeft.lat, panel.originBottomLeft.lng],
         	laenge: panel.length,
         	breite: panel.width,
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

function updatePanelToServer(roofid, panel) {
    var json = JSON.stringify({
        dach_id: roofid,
        panel_id: panel.id,
        obenLinks: [panel.originTopLeft.lat, panel.originTopLeft.lng],
        obenRechts: [panel.originTopRight.lat, panel.originTopRight.lng],
        untenRechts: [panel.originBottomRight.lat, panel.originBottomRight.lng],
        untenLinks: [panel.originBottomLeft.lat, panel.originBottomLeft.lng],
        laenge: panel.length,
        breite: panel.width,
        neigung: panel.pitch,
        ausrichtung: panel.orientation,
        rahmenbreite: 0
    });
	$.ajax({
    	//async: false,
        crossDomain: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        cors: "true",
        url: serverURL + '/updatePanel/',
        data : json,
        
        header : {
            "content-type": "application/json",
        },

    }).done(function (data) {
        console.log("Update zum Server" + data);
        console.log( "Obenlinks Nachher" + d3Overlay.projection.latLngToLayerPoint(L.latLng(data.obenLinks)));
        console.log("Obenrechts Nachher" + d3Overlay.projection.latLngToLayerPoint(L.latLng(data.obenRechts)));
        console.log("Untenlinks Nachher" + d3Overlay.projection.latLngToLayerPoint(L.latLng(data.untenLinks)));
        console.log("Untenrechts Nachher"+ d3Overlay.projection.latLngToLayerPoint(L.latLng(data.untenRechts)));
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
