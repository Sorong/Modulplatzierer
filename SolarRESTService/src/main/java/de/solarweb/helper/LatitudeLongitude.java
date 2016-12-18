package de.solarweb.helper;

import java.io.Serializable;

/**
 * Created by Nils on 06.12.16.
 */
public class LatitudeLongitude implements Serializable{

    private double latitude;
    private double longitude;

    public LatitudeLongitude(){

    }

    public LatitudeLongitude(double latitude, double longitude){
        this.latitude = latitude;
        this.longitude = longitude;
    }


    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    @Override
    public String toString(){
        return "" +longitude + " " + latitude;
    }
}
