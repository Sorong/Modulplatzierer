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
 * Restserverklasse, holt und speichert Dachdaten
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


    /**
     * Nimmt eine DachID entgegen und returned ein ModelDach.<br>
     *
     * @param id DachID
     * @return ModelDach
     */
    @GET
    @Path("/getRoof/{dach_id}")
    @Produces({MediaType.APPLICATION_JSON})
    public ModelDach getRoof(@PathParam("dach_id") int id){
        TblDach tblDach = getRoofById(id);
        logger.info("Dach mit ID: " + id + "abgerufen");
        return new ModelDach(tblDach);
    }

    /**
     * Nimmt ein ModelDach entgegen und returned das gepostet Dach.<br>
     * ID des ModelDaches kann beliebig gewählt werden, da diese vom <br>
     * Server generiert wird.
     *
     * @param dach ModelDach
     * @return ModelDach
     */
    @POST
    @Path("/postRoof")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public ModelDach setRoof(ModelDach dach){
        TblCookie tblCookie = getCookieById(dach.getCookie_id());
        Geometry the_geom = null;
        try{
            the_geom = GeometryConverter.ArrayLatLngToGeometry(dach.getThe_geom());
        }
        catch (ParseException e){
            logger.error("Dachgeometry konnte nicht geparsed werden");
            logger.error(e.getMessage());
            return new ModelDach();
        }

        if(tblCookie.getTblDach() == null){
            TblDach tblDach = new TblDach();
            tblDach.setPv(dach.getPv());
            tblDach.setSt(dach.getSt());
            tblDach.setCookie(tblCookie);
            tblDach.setThe_geom(the_geom);
            tblDach.setTilt(dach.getTilt());
            tblDach.setGlobal(dach.getGlobal());
            tblDach.setGid(dach.getGid());

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
        else{
            TblDach tblDach = tblCookie.getTblDach();
            tblDach.setPv(dach.getPv());
            tblDach.setSt(dach.getSt());
            tblDach.setCookie(tblCookie);
            tblDach.setThe_geom(the_geom);
            tblDach.setTilt(dach.getTilt());
            tblDach.setGlobal(dach.getGlobal());
            tblDach.setGid(dach.getGid());

            try{
                utx.begin();
                em.merge(tblDach);
                utx.commit();
            }
            catch(Exception e){
                logger.error("Dach wurde nicht in der Datenbank gemergt");
                logger.error(e.getMessage());
                return new ModelDach();
            }
            logger.info("Dach unter ID: " + tblDach.getDach_id() +"gespeichert");
            return new ModelDach(tblDach);
        }

    }

    @GET
    @Path("/removeDach/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String removePanel(@PathParam("id") int id){
        TblDach tblDach = (TblDach) getRoofById(id);
        if(tblDach == null) {
            return "Not found";
        }
        try{
            utx.begin();
            TblDach pDach = em.merge(tblDach);
            em.remove(pDach);
            utx.commit();
        }
        catch (Exception e){
            logger.error("Bei dem Versuch das Dach zu loeschen ist ein Fehler aufgetreten");
            logger.error(e.getMessage());
            return "error";
        }

        logger.info("Panel gelöscht");
        return "Deleted";
    }



    /**
     * Sucht ein Dach aus der Tetraeder Datenbank anhand der Adresse und returned dieses.<br>
     *
     * @param street Straß des Hauses
     * @param number Hausnummer
     * @param plz Postleitzahl
     * @return ModelTetraederbuilding
     */
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

    /**
     * Nimmt eine TetraderdachID entgegen und sucht alle Dachabschnitte raus, welche<br>
     * die jeweilige ID referenzieren.
     * @param id TetraederdachID
     * @return Liste Dachabschnitte
     */
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

    /**
     * Sucht in der Datenbank nach einem Dach zu der übergebenen ID und <br>
     * und retured das JPA Objekt des gefundenen Daches.
     * @param id DachID
     * @return JPA Dachobjekte TblDach
     * @throws NotFoundException Falls kein Dach gefunden
     */
    private TblDach getRoofById(int id) throws NotFoundException {
        Query queryRoofById = em.createNamedQuery("tblDach.findById");
        queryRoofById.setParameter("id", id);
        List resultRoofs = queryRoofById.getResultList();
        if(resultRoofs.isEmpty()){
            new TblDach();
        }
        TblDach tblDach = (TblDach) queryRoofById.getSingleResult();
        return tblDach;
    }

    /**
     * Sucht in der Datenbank nach einem Cookie zu der übergebenen ID und <br>
     * und retured das JPA Objekt des gefundenen Cookies.
     * @param id CookieID
     * @return JPA Cookieobjekte TblCookie
     * @throws NotFoundException Falls kein Cookie gefunden
     */
    private TblCookie getCookieById(int id) throws NotFoundException {
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
