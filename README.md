# Installationsanleitung Modulplazierer auf einem Luftbild für Kleinanlagen


### Einrichtung der Datenbank
Zunächst muss dafür die Postgresql Datenbank installiert werden. Unter Linux gibt es dazu dafür den Befehl
```sudo apt-get install postgresql-9.4```.
Als nächstes wird die Postgis Erweiterung benötig, welche mit
```sudo apt-get install postgis```
installiert werden kann. Mit dem Befehl ```psql``` kann der Postgresserver erstmalig konfiguriert werden.

Nun erstellt man mit dem Befehl ```CREATE DATABASE name ``` eine neue Datenbank mit dem Namen **scltest_sg_we2016_gr2a**. Der Name kann natürlich frei gewählt werden, nur muss er dann in den folgenden Schritten angepasst werden. Um die Tabellen zu generieren wird ebenfalls ```psql``` benutzt.
Mit ```psql -f create_db.sql -d scltest_sg_we2016_gr2a``` werden die Tabellen in der Datenbank erzeugt.
Als nächsten muss ein Benutzer erzeugt werden, welcher die Datenbank verwalten soll.

Dazu den Befehl ```CREATE USER -p scltest_sg_we2016_gr2a``` ausführen und anschließend ein neues Passwort vergeben. In diesem Fall wurde ein Nutzer mit dem Namen **scltest_sg_we2016_gr2a** erstellt. Zuletzt muss der neue User der Datenbank zugeordnet werden.

Dazu den Befehl ```GRANT ALL PRIVILEGES ON DATABASE scltest_sg_we2016_gr2a to scltest_sg_we2016_gr2a```. 
Die Datenbank ist nun eingerichtet und kann verwendet werden.


### Erstellung des RESTApi Web Archives
In dem Ordner **SolarRESTService** befindet sich ein Maven Projekt, welches mit der IntelliJ IDEA Entwicklungsumgebung erstellt worden ist. Dieser Ordner kann mit IntelliJ geöffnet werden. Anschließend muss unter File -> Project Structure ein neues Artefakt vom Type **Web Application: Archive** erstellt werden. Der Name kann frei gewählt werden. Nun muss der Haken bei **Build on make** gesetzt werden. Danach mit einem Rechtsklick auf **SolarRESTService** und **Put into Output Root** auswählen. Mit einem Klick auf **Apply** werden die Einstellungen übernommen. Als letzten Schritt muss noch Build -> Make Project ausgewählt werden und das Web Archive wird erstellt. Diese kann nur auf einem Server deployed werden.

### Einrichtung des Servers
Bei dem verwendeten Server handelt es sich um Payarafish 4.1. Dieser kann auf der Internetseite http://www.payara.fish/ kostenlos heruntergeladen werden. Nach dem Download muss die Zip-Datei entpackt werden und in den /bin Ordner navigiert werden. Dort befindet sich die asadmin Datei, mit welcher der Server gestartet werden kann.
```./asadmin start-domain payaradomain```
Nach dem Start des Server ist das Administratorinterface unter http://localhost:4848 erreichbar.

Nun muss die Verbindung zur Datenbank hergestellt werden. Unter dem Reiter **JDBC** kann die Verbindung zur Datenbank konfiguriert werden.
1. Klick auf JDBC Connection Pool
2. Klick auf New
3. Pool Name: SolarDB
4. Resoruce Type: Javax.sql.ConnectionPoolDataSource
5. Database Driver Vendor: Postgres
6. Klick auf Next
7. Nach Additional Properties scrollen
8. Username: Der eingerichtete Username welcher die Datenbank verwaltet
9. Port: Port auf dem die Datenbank erreichbar ist
10. Password: Passwort des Users
11. Databasename: Name der eingerichteten Datenbank
12. Servername: Hostname der Datenbank
13. Klick auf Finish

Der Connection Pool für die Datenbank ist nun eingerichtet. Nun muss nur noch eine JDBC Resource eingerichtet werden. Dazu wieder auf den Reiter **JDBC**.

1. Klick auf JDBC Resources
2. Klick auf New
3. JNDI Name: SolarDBWeb
4. Pool Name: SolarDB auswählen
5. Klick auf Finish

Nun kann das SolarRESTService Archiv auf dem Server deplyed werden. Dazu einfach auf den Reiter **Commen Task** klicken und dann auf **Deploy an Application**. Nun eianfach die gewünscht .war Datei auswählen und sie wie auf dem Server deployen. Sie ist nun unter http://localhost:8080/Name_War/Pfad/ erreichbar.








