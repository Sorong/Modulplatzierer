package de.solarweb.helper;

import java.io.Serializable;

/**
 * LatitudeLongitude Klasse, speichert die Latitude and Longitude Wertepaare.
 */
public class LatitudeLongitude implements Serializable{

    /**
     * Latitude Wert
     */
    private double latitude;

    /**
     * Longitude Wert
     */
    private double longitude;

    /**
     * Standartkonstruktor zu Serialisierung
     */
    public LatitudeLongitude(){

    }

    /**
     * Erstellt ein neues LatitudeLongitude Objekt
     * @param latitude Latitude Wert
     * @param longitude Longitude Wert
     */
    public LatitudeLongitude(double latitude, double longitude){
        this.latitude = latitude;
        this.longitude = longitude;
    }

    /**
     * Returnt den Latitude Wert
     * @return Latitude Wert
     */
    public double getLatitude() {
        return latitude;
    }

    /**
     * Setzt den Latitude Wert
     * @param latitude Latitude Wert
     */
    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    /**
     * Returnt den Longitude Wert
     * @return Longitude Wert
     */
    public double getLongitude() {
        return longitude;
    }

    /**
     * Setzt den Longitude Wert
     * @param longitude Longitude Wert
     */
    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    /**
     * Returnt den Latitude and Longitude Wert als Sting in der Form "longitude latitude"
     * @return Longitude Latitude als String
     */
    @Override
    public String toString(){
        return "" + longitude + " " + latitude;
    }
}
