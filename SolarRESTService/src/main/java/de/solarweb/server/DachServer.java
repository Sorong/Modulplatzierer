package de.solarweb.server;

import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.PrecisionModel;
import com.vividsolutions.jts.io.WKTReader;
import de.solarweb.datamodel.TblDach;
import de.solarweb.datamodel.TblCookie;
import de.solarweb.datamodel.TblTetraederBuilding;
import de.solarweb.datamodel.TblTetraederRoof;
import de.solarweb.helper.GeometryConverter;
import de.solarweb.helper.LatitudeLongitude;
import de.solarweb.models.ModelDach;
import de.solarweb.models.ModelTetraederBuilding;
import de.solarweb.models.ModelTetraederRoof;

import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.UserTransaction;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

/**
 * Created by Nils on 10.12.16.
 */
@Stateless
@TransactionManagement( TransactionManagementType.BEAN )
@Path("/dach")
public class DachServer {
    @PersistenceContext(unitName = "SolarPersistence")
    private EntityManager em;
    @Resource
    private UserTransaction utx;


    Logger logger = Logger.getLogger(getClass().getName());


    public DachServer() throws Exception {
            Class.forName("org.postgresql.Driver");
    }

    @GET
    @Path("/getRoof/{dach_id}")
    @Produces({"application/javascript"})
    public ModelDach getRoof(@PathParam("dach_id") int id) throws Exception{
        TblDach tblDach = getRoofById(id);
        if (tblDach == null){
            new ModelDach();
        }
        logger.warning("Dach mit ID: " + id + "abgerufen");
        logger.warning(tblDach.getThe_geom().toText());
        return new ModelDach(tblDach);
    }



    @POST
    @Path("/postRoof")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    public ModelDach setRoof(ModelDach dach) throws Exception{
        logger.warning("Dach gepostet");
        Query getCookieById = em.createNamedQuery("tblCookie.findById");
        getCookieById.setParameter("id", 0);
        TblCookie tblCookie = (TblCookie) getCookieById.getSingleResult();
        TblDach tblDach = new TblDach();
        tblDach.setHausnummer(dach.getHausnummer());
        tblDach.setPlz(dach.getPostleitzahl());
        tblDach.setStrasse(dach.getStrasse());
        tblDach.setDachneigung(dach.getDachneigung());
        tblDach.setThe_geom(GeometryConverter.ArrayLatLngToGeometry(dach.getThe_geom()));
        tblDach.setCookie(tblCookie);
        utx.begin();
        em.persist(tblDach);
        utx.commit();
        logger.warning("Dach unter ID: " + tblDach.getDach_id() +"gespeichert");
        return new ModelDach(tblDach);
    }

    @POST
    @Path("/updateRoof")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    public ModelDach updateRoof(ModelDach dach) throws Exception{
        Query getRoofById = em.createNamedQuery("tblDach.findById");
        getRoofById.setParameter("id", dach.getDach_id());
        TblDach tblDach = (TblDach) getRoofById.getSingleResult();
        //Query getCookieById = em.createNamedQuery("tblCookie.findById");
        //getCookieById.setParameter("id", dach.getCookie().getCookie_id());
        //TblCookie tblCookie = (TblCookie) getCookieById.getSingleResult();
        tblDach.setHausnummer(dach.getHausnummer());
        tblDach.setPlz(dach.getPostleitzahl());
        tblDach.setStrasse(dach.getStrasse());
        tblDach.setDachneigung(dach.getDachneigung());
        //tblDach.setCookie(tblCookie);
        utx.begin();
        em.merge(tblDach);
        utx.commit();
        logger.warning("Dach mit ID:" + dach.getDach_id() + "geupdateted");
        return new ModelDach(tblDach);
    }

    @GET
    @Path("/getPredefinedRoof/{street}/{number}/{plz}")
    @Produces(MediaType.APPLICATION_JSON)
    public ModelTetraederBuilding getPredefinedRoof(@PathParam("street") String street,
                                                    @PathParam("number") String number, @PathParam("plz") Double plz) throws Exception{
        Query queryTetraederBuilding = em.createNamedQuery("tblTetraederBuildings.findByAddress");
        queryTetraederBuilding.setParameter(0, street);
        queryTetraederBuilding.setParameter(1, number);
        queryTetraederBuilding.setParameter(2, plz);
        List resultBuildings = queryTetraederBuilding.getResultList();
        if(resultBuildings.isEmpty()){
            return new ModelTetraederBuilding();
        }
        TblTetraederBuilding tblTetraederBuilding = (TblTetraederBuilding) resultBuildings.get(0);
        logger.warning("Tetraeder Dach aus Datenbank gelesen");
        logger.warning((tblTetraederBuilding.getThe_geom().toString()));
        return new ModelTetraederBuilding(tblTetraederBuilding);

    }

    @GET
    @Path("/getRoofParts/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public ArrayList<ModelTetraederRoof> getRoofParts(@PathParam("id") int id) throws Exception{
        ArrayList<ModelTetraederRoof> roofPartList = new ArrayList<ModelTetraederRoof>();
        Query queryTetraederRoofParts = em.createNamedQuery("tblTetraederRoof.findById");
        queryTetraederRoofParts.setParameter("id", id);
        List resultParts = queryTetraederRoofParts.getResultList();
        if(resultParts.isEmpty()){
            return null;
        }
        for(Object o : resultParts){
            roofPartList.add(new ModelTetraederRoof((TblTetraederRoof)o));
        }
        logger.warning("Dacheinheiten aus Tetaeder Datenbank gelesen");
        return roofPartList;
    }

    private TblDach getRoofById(int id){
        Query queryRoofById = em.createNamedQuery("tblDach.findById");
        queryRoofById.setParameter("id", id);
        List resultRoofs = queryRoofById.getResultList();
        if(resultRoofs.isEmpty()){
            return null;
        }
        TblDach tblDach = (TblDach) queryRoofById.getSingleResult();
        return tblDach;
    }
}
