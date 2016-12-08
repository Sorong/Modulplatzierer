package de.solarweb.de.soalarweb.helper;

import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.PrecisionModel;
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
import java.util.logging.Logger;
/**
 * Created by Nils on 06.12.16.
 */
public class GeometryConverter {



    Logger logger = Logger.getLogger(getClass().getName());

    public ArrayList<LatitudeLongitude> convertGeometry(int epsg, Geometry geometry) throws Exception{
        WKTReader wktReader = new WKTReader(new GeometryFactory(new PrecisionModel(epsg)));
        WKTWriter wktWriter = new WKTWriter(2);

        String geometry2dWKT = wktWriter.write(geometry);
        Geometry geometry2d = wktReader.read(geometry2dWKT);


        CoordinateReferenceSystem sourceCRS = CRS.decode("EPSG:" + epsg);
        CoordinateReferenceSystem targetCRS = CRS.decode("EPSG:4326");
        MathTransform transform = CRS.findMathTransform(sourceCRS, targetCRS);
        Geometry geometry4326 = JTS.transform( geometry2d, transform);

        ArrayList<String> points = new ArrayList<String>();
        logger.warning(geometry4326.toText());
        String buildingPolygon = geometry4326.toText().replace("MULTIPOLYGON (((", "");
        buildingPolygon = buildingPolygon.replace(")))", "");
        buildingPolygon = buildingPolygon.replace(",", " ");
        buildingPolygon = buildingPolygon.replace("),", "");
        buildingPolygon = buildingPolygon.replace("(", "");
        buildingPolygon = buildingPolygon.replace(")", "");
        Scanner s = new Scanner(buildingPolygon).useDelimiter(" ");

        while(s.hasNext()){
            points.add(s.next());
        }

        ArrayList<LatitudeLongitude> latLngArray = new ArrayList<LatitudeLongitude>();
        for(int i = 0; i < points.size(); i += 3){
            LatitudeLongitude latLng = new LatitudeLongitude();
            latLng.setLatitude(Double.parseDouble(points.get(i+1)));
            latLng.setLongitude(Double.parseDouble(points.get(i)));
            latLngArray.add(latLng);
        }

        return latLngArray;
    }






}
