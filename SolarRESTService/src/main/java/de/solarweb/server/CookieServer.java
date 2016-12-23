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
import java.util.logging.Logger;

/**
 * Created by Nils on 12.12.16.
 */
@Stateless
@TransactionManagement( TransactionManagementType.BEAN )
@Path("/cookie")
public class CookieServer {


    @PersistenceContext(unitName = "SolarPersistence")
    private EntityManager em;
    @Resource
    private UserTransaction utx;

    Logger logger = Logger.getLogger(getClass().getName());


    public CookieServer(){
    }

    @GET
    @Path("/getCookie/{cookie}")
    @Produces(MediaType.APPLICATION_JSON)
    public ModelCookie getCookie(@PathParam("cookie") int id){
        Query queryCookieById = em.createNamedQuery("tblCookie.findById");
        queryCookieById.setParameter("id", id);
        List resultRoofs = queryCookieById.getResultList();
        if(resultRoofs.isEmpty()){
            logger.warning("Kein Cookie gefunden");
            return new ModelCookie(-1, new java.sql.Timestamp(0));
        }
        TblCookie tblCookie = (TblCookie) queryCookieById.getSingleResult();
        logger.warning("Cookie mit ID: " + id + " abgerufen");
        return new ModelCookie(tblCookie);
    }


    @POST
    @Path("/postCookie")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces({"application/javascript"})
    public ModelCookie postCookie(ModelCookie cookie) throws Exception{
        TblCookie tblCookie = new TblCookie();
        tblCookie.setAblaufdatum(cookie.getAblaufdatum());
        utx.begin();
        em.persist(tblCookie);
        utx.commit();
        logger.warning("TEST");
        logger.warning("Cookie angelegt");
        return new ModelCookie(tblCookie);
    }
}
