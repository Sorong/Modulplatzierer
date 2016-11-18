# Modulplatzierer REST Api


So I herd U liek soloaerpnaol?

#Errorhandling
I will think about it

When the server is running, you can find it under 
IPAdress:Port/SolarRESTService_war_exploded/server
The follwing paths should be working:

#/getRoof/{id}
The {id} is the primary key for the specific roof in the database.
The finction returns a Roof JSON in the form of 
```json
{  
   "dach_id":0,
   "strasse":"Kohkamp",
   "hausnummer":"5",
   "postleitzahl":"32130",
   "dachneigung":90,
   "koord_dachmitte_lng":50.123456789,
   "koord_dachmitte_lat":50.987654321,
   "modelSolarpanelCollection":[  
      {  
         "panel_id":0,
         "obenLinks":[  
            12.0,
            234.0
         ],
         "obenRechts":[  
            45.0,
            45.0
         ],
         "untenRechts":[  
            45.0,
            35.0
         ],
         "untenLinks":[  
            4.0,
            335.0
         ],
         "laenge":1.20000005,
         "breite":1.20000005,
         "neigung":45,
         "ausrichtung":5,
         "rahmenbreite":0.200000003,
         "dach_id":0
      }
     ],
    "cookie": {
    "cookie_id": 0,
    "dach_ids": [
      0
    ],
    "ablaufdatum": 4070905200000
  }
}
```

The roof contains all solarpanels that are associated with that roof. The obenLinks, obenRechts etc are
the points that mark the corners of the solarpanel. First value is the latiture, secound the longitude.
If no roof is found, the returned value is null.


#/postRoof
Saves the given Roof in the database. The dach_id can be any Integer since it is
a new id will be generated. The 'modelSolarpanelCollection' is not used since the panels 
are saved and updated separately.
```json
{
  "dach_id": 2,
  "strasse": "Artelleristr",
  "hausnummer": "4",
  "postleitzahl": "56454",
  "dachneigung": 6,
  "koord_dachmitte_lng": 1,
  "koord_dachmitte_lat": 1,
  "cookie": {
    "cookie_id": 1,
    "dach_ids": [
      2
    ],
    "ablaufdatum": 32472140400000
  }
}
```
Will return 'ok' is the roof was successfully updated. Anything else
will yield in a '500 internal Error', so don't expect any error handling.

#/updateRoof
Takes the same JSON as 'postRoof', will return 'ok' if roof was updated.
Anything else will give a '500 internal Error'


#/postPanel
Takes a JSON file in the body of a post request. The panel is saved in the database.
Returns "ok" as a string if everything went fine.

The JSON to post should be in this form:
```json
{  
   "panel_id":1,
   "obenLinks":[  
      12.0,
      234.0
   ],
   "obenRechts":[  
      999.0,
      999.0
   ],
   "untenRechts":[  
      999.0,
      999.0
   ],
   "untenLinks":[  
      999,
      777
   ],
   "laenge":1.20000005,
   "breite":1.20000005,
   "neigung":45,
   "ausrichtung":5,
   "rahmenbreite":0.200000003,
   "dach_id":0
}
```

Any Integer can be used for panel_id can be used since it doesnt matter 
because is thrown away and a new id for the panel is generated.
Return 'ok' if Panel was added to the database successfully.



#/updatePanel
Wants the same JSON as postPanel, but needs a valid panel_id, since the
postet panel will override the panel in the database with the same panel_id.
Returns 'ok' if panel was updated.


#/getCookie{cookie}
Returns a Cookie, right now a stub with only an id and a timestamp.
Will the expanded soon™.
Right now, this will be return as a JSON:
```json
{
  "cookie_id": 0,
  "dach_ids": [
    0
  ],
  "ablaufdatum": 4070905200000
}
```

#/postCookie
Takes a Cookie in the following form:
```json
{
  "cookie_id": 0,
  "ablaufdatum": 4070905200000
}
```
Like about, the 'id' field can be anything, will be generated anyway.
'ablaufdatum' is in Unixtime. After posting a new Cookie, it can be uses to
identify a new roof. Returns 'ok'.
