package de.solarweb.server;

import de.solarweb.datamodel.TblCookie;
import de.solarweb.models.ModelCookie;

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
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Restserverklasse, holt und speichert Cookies
 */
@Stateless
@TransactionManagement( TransactionManagementType.BEAN )
@Path("/cookie")
public class CookieServer {


    @PersistenceContext(unitName = "SolarPersistence")
    private EntityManager em;
    @Resource
    private UserTransaction utx;

    Logger logger = LoggerFactory.getLogger(CookieServer.class);


    public CookieServer(){
    }


    /**
     * Nimmt in der URL die CookieId entgegen und returned ein neues ModelCookie.<br>
     * Sollte die ID nicht gefunden werden, wir ein neues ModelCookie mit der ID -1
     * zurückgegeben.
     *
     * @param id CookieId
     * @return ModelCookie
     */
    @GET
    @Path("/getCookie/{cookie}")
    @Produces(MediaType.APPLICATION_JSON)
    public ModelCookie getCookie(@PathParam("cookie") int id){
        Query queryCookieById = em.createNamedQuery("tblCookie.findById");
        queryCookieById.setParameter("id", id);
        List resultRoofs = queryCookieById.getResultList();
        if(resultRoofs.isEmpty()){
            logger.info("Kein Cookie gefunden");
            return new ModelCookie(-1, new java.sql.Timestamp(0));
        }
        TblCookie tblCookie = (TblCookie) queryCookieById.getSingleResult();
        logger.info("Cookie mit ID: " + id + " abgerufen");
        return new ModelCookie(tblCookie);
    }

    /**
     * Legt einen neuen Cookie in der Datenbank an. Panellist im ModelCookie<br>
     * kann leer gelassen werden, das Feld ID im Model Cookie kann auf einen beliebiegen<br>
     * Wert gesetzt werden, da diese vom Server generiert wird.
     *
     * Returned wird der neu angelegt Cookie mit einer gültigen ID.
     * @param cookie ModelCookie
     * @return ModelCookie
     */
    @POST
    @Path("/postCookie")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces({"application/javascript"})
    public ModelCookie postCookie(ModelCookie cookie){
        TblCookie tblCookie = new TblCookie();
        tblCookie.setAblaufdatum(cookie.getAblaufdatum());
        try{
            utx.begin();
            em.persist(tblCookie);
            utx.commit();
        }
        catch (Exception e){
            logger.error("Cookie konnte nicht angelegt werden");
            logger.error("Failed", e);
            return new ModelCookie();
        }

        logger.info("Cookie angelegt");
        return new ModelCookie(tblCookie);
    }
}
