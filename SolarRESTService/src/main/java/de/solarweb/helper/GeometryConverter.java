package de.solarweb.helper;

import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.PrecisionModel;
import com.vividsolutions.jts.io.ParseException;
import com.vividsolutions.jts.io.WKTReader;
import com.vividsolutions.jts.io.WKTWriter;
import org.geotools.geometry.jts.JTS;
import org.geotools.referencing.CRS;
import org.opengis.referencing.FactoryException;
import org.opengis.referencing.crs.CoordinateReferenceSystem;
import org.opengis.referencing.operation.MathTransform;
import org.opengis.referencing.operation.TransformException;

import java.util.ArrayList;
import java.util.Scanner;
/**
 *Klasse zur Konvertierung von Geometrien zu Listen mit LatitudeLongitude Objekten und umgekehert
 */
public class GeometryConverter {

    /**
     * Konnvertiert den Geometry Datentyp in eine Liste mit Latitude Longitude Objekten.<br>
     * Intern wird die Geometry nach EPSG 4326 konvertiert. Falls die Geometry bereits im EPSG 4326<br>
     * ist, kann der epsg Parameter weggeleassen werden.
     * @param epsg EPSG Format der zu konvertierenden Geometry
     * @param geometry Die zu konvertierende Geometry
     * @return Liste mit LatitudeLongitude Objekten
     * @throws ParseException Geometry konnte nicht geparsed werden
     * @throws FactoryException Factory Klasse wurde nicht gefunden
     * @throws TransformException Das Koordinatenreferenzsystem konnte nicht transformiert werden
     */
    public static ArrayList<LatitudeLongitude> geometryToLatLngArray(int epsg, Geometry geometry)throws ParseException, FactoryException, TransformException{
        WKTReader wktReader = new WKTReader(new GeometryFactory(new PrecisionModel(PrecisionModel.FLOATING)));
        WKTWriter wktWriter = new WKTWriter(2);

        String geometry2dWKT = wktWriter.write(geometry);
        Geometry geometry2d = wktReader.read(geometry2dWKT);


        CoordinateReferenceSystem sourceCRS = CRS.decode("EPSG:" + epsg);
        CoordinateReferenceSystem targetCRS = CRS.decode("EPSG:4326");
        MathTransform transform = CRS.findMathTransform(sourceCRS, targetCRS);
        Geometry geometry4326 = JTS.transform( geometry2d, transform);

        return geometryToLatLngArray(geometry4326);
    }

    /**
     * Nimmt eine Liste mit LatitudeLongitude Objekten entgegen und returnt ein Geometry Objekt
     * im EPSG 4326 Format
     * @param latLngArray Liste mit LatitudeLongitude Objekten
     * @return Geometry im EPSG 4326 Format
     * @throws ParseException Liste konnte nicht geparsed werden
     */
    public static  Geometry ArrayLatLngToGeometry(ArrayList<LatitudeLongitude> latLngArray) throws ParseException{
        WKTReader wtkReader = new WKTReader(new GeometryFactory(new PrecisionModel(PrecisionModel.FLOATING)));
        String wtkGeometry = "LINESTRING (";
        for(LatitudeLongitude latitudeLongitude : latLngArray){
            wtkGeometry += latitudeLongitude.toString();
            wtkGeometry += ",";
        }
        wtkGeometry = wtkGeometry.substring(0, wtkGeometry.length()-1);
        wtkGeometry += ")";
        Geometry geometry = wtkReader.read(wtkGeometry);
        geometry.setSRID(4326);
        return geometry;
    }

    /**
     * Konvertiert eine Geometry im EPSG 4326 Format und erzeugt eine Liste<br>
     * mit LatitudeLongitude Objekten
     * @param geometry Geometry im EPSG 4326 Format
     * @return Liste mit LatitudeLongitude Objekten
     */
    public static ArrayList<LatitudeLongitude> geometryToLatLngArray(Geometry geometry){
        ArrayList<LatitudeLongitude> latLngArray = new ArrayList<LatitudeLongitude>();
        ArrayList<String> points = new ArrayList<String>();
        String buildingPolygon = geometry.toText().replace("MULTIPOLYGON ", "");
        buildingPolygon = buildingPolygon.replace("LINESTRING ", "");
        buildingPolygon = buildingPolygon.replace(",", "");
        buildingPolygon = buildingPolygon.replace("),", "");
        buildingPolygon = buildingPolygon.replace("(", "");
        buildingPolygon = buildingPolygon.replace(")", "");
        Scanner s = new Scanner(buildingPolygon).useDelimiter(" ");

        while(s.hasNext()){
            points.add(s.next());
        }

        for(int i = 0; i < points.size(); i += 2){
            LatitudeLongitude latLng = new LatitudeLongitude();
            latLng.setLatitude(Double.parseDouble(points.get(i+1)));
            latLng.setLongitude(Double.parseDouble(points.get(i)));
            latLngArray.add(latLng);
        }

        return latLngArray;
    }








}
