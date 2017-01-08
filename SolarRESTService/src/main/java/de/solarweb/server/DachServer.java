package de.solarweb.server;


import com.sun.jersey.api.NotFoundException;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.io.ParseException;
import de.solarweb.datamodel.TblDach;
import de.solarweb.datamodel.TblCookie;
import de.solarweb.datamodel.TblTetraederBuilding;
import de.solarweb.datamodel.TblTetraederRoof;
import de.solarweb.helper.GeometryConverter;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


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


    Logger logger = LoggerFactory.getLogger(DachServer.class);


    public DachServer(){
    }

    @GET
    @Path("/getRoof/{dach_id}")
    @Produces({MediaType.APPLICATION_JSON})
    public ModelDach getRoof(@PathParam("dach_id") int id){
        TblDach tblDach = getRoofById(id);
        logger.info("Dach mit ID: " + id + "abgerufen");
        return new ModelDach(tblDach);
    }


    //CookieID ist im Moment immer Null, k.A. wie Dach Final realisiert werden soll
    @POST
    @Path("/postRoof")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    public ModelDach setRoof(ModelDach dach){
        TblCookie tblCookie = getCookieById(0);
        Geometry the_geom = null;
        try{
            GeometryConverter.ArrayLatLngToGeometry(dach.getThe_geom());
        }
        catch (ParseException e){
            logger.error("Dachgeometry konnte nicht geparsed werden");
            logger.error(e.getMessage());
            return new ModelDach();
        }
        TblDach tblDach = new TblDach();
        tblDach.setHausnummer(dach.getHausnummer());
        tblDach.setPlz(dach.getPostleitzahl());
        tblDach.setStrasse(dach.getStrasse());
        tblDach.setDachneigung(dach.getDachneigung());
        tblDach.setCookie(tblCookie);
        tblDach.setThe_geom(the_geom);

        try{
            utx.begin();
            em.persist(tblDach);
            utx.commit();
        }
        catch(Exception e){
            logger.error("Dach wurde nicht in der Datenbank gespeichert");
            logger.error(e.getMessage());
            return new ModelDach();
        }
        logger.info("Dach unter ID: " + tblDach.getDach_id() +"gespeichert");
        return new ModelDach(tblDach);
    }


    @POST
    @Path("/updateRoof")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    public ModelDach updateRoof(ModelDach dach){
        Geometry the_geom = null;
        try{
            GeometryConverter.ArrayLatLngToGeometry(dach.getThe_geom());
        }
        catch (ParseException e){
            logger.error("Dachgeometry des Daches " + dach.getDach_id() + " konnte nicht geparsed werden");
            logger.error(e.getMessage());
            return new ModelDach();
        }
        TblDach tblDach = getRoofById(dach.getDach_id());
        tblDach.setHausnummer(dach.getHausnummer());
        tblDach.setPlz(dach.getPostleitzahl());
        tblDach.setStrasse(dach.getStrasse());
        tblDach.setDachneigung(dach.getDachneigung());
        tblDach.setThe_geom(the_geom);
        try{
            utx.begin();
            em.merge(tblDach);
            utx.commit();
        }
        catch(Exception e){
            logger.error("Dach mit ID: " + dach.getDach_id() +" wurde nicht geupdatet");
            logger.error(e.getMessage());
            return new ModelDach();
        }

        logger.info("Dach mit ID:" + dach.getDach_id() + "geupdateted");
        return new ModelDach(tblDach);
    }

    @GET
    @Path("/getPredefinedRoof/{street}/{number}/{plz}")
    @Produces(MediaType.APPLICATION_JSON)
    public ModelTetraederBuilding getPredefinedRoof(@PathParam("street") String street,
                                                    @PathParam("number") String number, @PathParam("plz") Double plz){
        Query queryTetraederBuilding = em.createNamedQuery("tblTetraederBuildings.findByAddress");
        queryTetraederBuilding.setParameter(0, street);
        queryTetraederBuilding.setParameter(1, number);
        queryTetraederBuilding.setParameter(2, plz);
        List resultBuildings = queryTetraederBuilding.getResultList();
        if(resultBuildings.isEmpty()){
            return new ModelTetraederBuilding();
        }
        TblTetraederBuilding tblTetraederBuilding = (TblTetraederBuilding) resultBuildings.get(0);
        ModelTetraederBuilding modeltetraederBuilding = new ModelTetraederBuilding();
        try{
            modeltetraederBuilding = new ModelTetraederBuilding(tblTetraederBuilding);
        }
        catch(Exception e){
            logger.error("TetraederBuilding konnte nicht geladen werden, ParserError");
            logger.error(e.getMessage());
        }
        logger.info("Tetraeder Dach aus Datenbank gelesen");
        return modeltetraederBuilding;

    }

    @GET
    @Path("/getRoofParts/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public ArrayList<ModelTetraederRoof> getRoofParts(@PathParam("id") int id){
        ArrayList<ModelTetraederRoof> roofPartList = new ArrayList<ModelTetraederRoof>();
        Query queryTetraederRoofParts = em.createNamedQuery("tblTetraederRoof.findById");
        queryTetraederRoofParts.setParameter("id", id);
        List resultParts = queryTetraederRoofParts.getResultList();
        if(resultParts.isEmpty()){
            return null;
        }
        for(Object parts : resultParts){
            try{
                roofPartList.add(new ModelTetraederRoof((TblTetraederRoof)parts));
            }
            catch(Exception e){
                logger.error("Roofpart ID: " + ((TblTetraederRoof) parts).getCid() + "konnte nicht geparsed werden");
                logger.error(e.getMessage());
            }

        }
        logger.info("Dacheinheiten aus Tetaeder Datenbank gelesen");
        return roofPartList;
    }

    public TblDach getRoofById(int id) throws NotFoundException {
        Query queryRoofById = em.createNamedQuery("tblDach.findById");
        queryRoofById.setParameter("id", id);
        List resultRoofs = queryRoofById.getResultList();
        if(resultRoofs.isEmpty()){
            throw new NotFoundException();
        }
        TblDach tblDach = (TblDach) queryRoofById.getSingleResult();
        return tblDach;
    }

    public TblCookie getCookieById(int id) throws NotFoundException {
        Query queryCookieById = em.createNamedQuery("tblCookie.findById");
        queryCookieById.setParameter("id", id);
        List resultCookies = queryCookieById.getResultList();
        if(resultCookies.isEmpty()){
            throw new NotFoundException();
        }
        TblCookie tblCookie = (TblCookie) queryCookieById.getSingleResult();
        return tblCookie;
    }

}
