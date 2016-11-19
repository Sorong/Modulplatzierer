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

function getPanelsFromServer() {

    $.ajax({
     type: "GET",
//  crossDomain: true,
        dataType: "json", // jsonp
       // jsonpCallback: 'callback',
        url: 'http://195.37.224.237:8080/SolarRESTService_war_exploded/server/getRoof/0',
    //    data: data,
//  success: 1,
    }).done(function (data) {
        var arr = [];
        data.modelSolarpanelCollection.forEach(getPanels);
        function getPanels(element, index, array) {
            arr.push(element);
        }
        alert(arr.length);
    }).fail(function () {
        console.log("Fehler beim Versuch mit dem Server zu kommunizieren");
    })
    ;
}

function getCookieFromServer(dueDate) {

    var formData = {"cookie_id":0,"ablaufdatum":dueDate}; 
 
$.ajax({
    url : "http://localhost:8080/SolarRESTService_war_exploded/server/postCookie",
    type: "POST",
    dataType: "json",
    contentType: "application/json",
    data : JSON.stringify(formData),
    success: function(data, textStatus, jqXHR)
    {
        alert(data)
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
 
    }
}); 
}

function postRoofToServer(roof) {

}