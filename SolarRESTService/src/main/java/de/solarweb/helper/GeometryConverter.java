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
 * Created by Nils on 06.12.16.
 */
public class GeometryConverter {


    public static ArrayList<LatitudeLongitude> geometryToLatLngArray(int epsg, Geometry geometry)throws ParseException, FactoryException, TransformException{
        WKTReader wktReader = new WKTReader(new GeometryFactory(new PrecisionModel(epsg)));
        WKTWriter wktWriter = new WKTWriter(2);

        String geometry2dWKT = wktWriter.write(geometry);
        Geometry geometry2d = wktReader.read(geometry2dWKT);


        CoordinateReferenceSystem sourceCRS = CRS.decode("EPSG:" + epsg);
        CoordinateReferenceSystem targetCRS = CRS.decode("EPSG:4326");
        MathTransform transform = CRS.findMathTransform(sourceCRS, targetCRS);
        Geometry geometry4326 = JTS.transform( geometry2d, transform);

        return geometryToLatLngArray(geometry4326);
    }

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
