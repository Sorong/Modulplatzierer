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
        url: 'http://localhost:8080/SolarRESTService_war_exploded/server/getRoof/0',
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

    // xhr = new XMLHttpRequest();
    // var url = "http://localhost:8080/SolarRESTService_war_exploded/server/postCookie";
    // xhr.open("POST", url, true);
    // xhr.setRequestHeader("Content-type", "application/json");
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState == 4 && xhr.status == 200) {
    //         var json = JSON.parse(xhr.responseText);
    //         console.log(json);
    //     }
    // };
    // var data = JSON.stringify({
    //     cookie_id: 0,
    //     ablaufdatum: dueDate
    // });
    //
    // xhr.send(data);



    $.ajax({
        crossDomain: true,
        type: "POST",
        dataType: "json",
        url: 'http://localhost:8080/SolarRESTService_war_exploded/server/postCookie/',
        // data : JSON.stringify({
        //     cookie_id : 0,
        //     ablaufdatum : dueDate
        // }),
        data : {
            cookie_id : 0,
            ablaufdatum : dueDate
        },
        header : {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "fb4915c3-a458-2a90-714d-fbe37aa3a27b"
        },

    }).done(function (data) {
        console.log(data);
        alert(data);
    }).fail(function () {
        console.log("Fehler beim Versuch mit dem Server zu kommunizieren");
    });


}

function postRoofToServer(roof) {

}
