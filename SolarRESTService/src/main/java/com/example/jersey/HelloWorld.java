package com.example.jersey;


import de.solarweb.datamodel.*;
import de.solarweb.models.*;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import javax.annotation.Resource;
import javax.transaction.UserTransaction;

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
    @Path("/db")
    @Produces(MediaType.APPLICATION_JSON)
    public ModelDach getRoof(){
        Query query = this.em.createQuery("SELECT i FROM TblDach AS i");
        TblDach tblDach = (TblDach) query.setMaxResults(1).getSingleResult();
        return new ModelDach(tblDach);
    }
}


