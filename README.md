# Modulplatzierer REST Api


So I herd U liek soloaerpnaol?

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



#/updatePanel
Wants the same JSON as postPanel, but needs a valid panel_id, since the
postet panel will override the panel in the database with the same panel_id


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
  
