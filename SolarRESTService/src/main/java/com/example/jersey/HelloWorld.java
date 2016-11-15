package com.example.jersey;


import de.solarweb.datamodel.*;
import de.solarweb.models.*;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import javax.transaction.UserTransaction;
import java.util.List;

@Path("/server")
public class HelloWorld {

    EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("SolarPersistence");
    private EntityManager em = entityManagerFactory.createEntityManager();
    //private String dbURL = "jdbc:postgresql://scl1-ifm-min.ad.fh-bielefeld.de/scl";



    public HelloWorld() throws Exception{
        Class.forName("org.postgresql.Driver");
    }

    @GET
    @Path("/hello")
    @Produces(MediaType.TEXT_PLAIN)
    public String getMessage() {
        return "Hello world!";
    }



    @GET
    @Path("/getRoof/{dach_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public ModelDach getRoof(@PathParam("dach_id") int id){
        Query queryRoofById = em.createNamedQuery("tblDach.findById");
        queryRoofById.setParameter("id", id);
        List resultRoofs = queryRoofById.getResultList();
        if(resultRoofs.isEmpty()){
            return null;
        }
        TblDach tblDach = (TblDach) queryRoofById.getSingleResult();
        return new ModelDach(tblDach);
    }


    @GET
    @Path("/getCookie/{cookie}")
    @Produces(MediaType.APPLICATION_JSON)
    public ModelCookie getCookie(@PathParam("cookie") int id){
        Query queryCookieById = em.createNamedQuery("tblCookie.findById");
        queryCookieById.setParameter("id", id);
        List resultRoofs = queryCookieById.getResultList();
        if(resultRoofs.isEmpty()){
            return null;
        }
        TblCookie tblCookie = (TblCookie) queryCookieById.getSingleResult();
        return new ModelCookie(tblCookie);
    }
}


