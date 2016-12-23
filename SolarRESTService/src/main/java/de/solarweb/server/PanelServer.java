package de.solarweb.server;


import de.solarweb.datamodel.*;
import de.solarweb.helper.GeometryConverter;
import de.solarweb.helper.LatitudeLongitude;
import de.solarweb.models.*;


import javax.persistence.*;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.transaction.UserTransaction;
import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import java.util.logging.Logger;


@Stateless
@TransactionManagement( TransactionManagementType.BEAN )
@Path("/panel")
public class PanelServer {
    @PersistenceContext(unitName = "SolarPersistence")
    private EntityManager em;
    @Resource
    private UserTransaction utx;

    Logger logger = Logger.getLogger(getClass().getName());


    public PanelServer(){

    }



    @POST
    @Path("/postPanel")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ModelSolarpanel setPanel(ModelSolarpanel panel) throws Exception{
        TblSolarpanel tblPanel = new TblSolarpanel();
        tblPanel.setAusrichtung(panel.getAusrichtung());
        tblPanel.setNeigung(panel.getNeigung());
        tblPanel.setBreite(panel.getBreite());
        tblPanel.setLaenge(panel.getLaenge());
        tblPanel.setRahmenbreite(panel.getRahmenbreite());
        logger.warning(panel.getThe_geom().toString());
        tblPanel.setThe_geom(GeometryConverter.ArrayLatLngToGeometry(panel.getThe_geom()));

        tblPanel.setCookie(getCookieById(panel.getCookie_id()));
        utx.begin();
        this.em.persist(tblPanel);
        utx.commit();
        logger.warning("Panel angelegt");
        logger.warning(tblPanel.getThe_geom().toText());
        return new ModelSolarpanel(tblPanel);
    }


    @POST
    @Path("/updatePanel")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ModelSolarpanel updatePanel(ModelSolarpanel panel) throws Exception{

        Query queryPanelById = this.em.createNamedQuery("tblSolarpanel.findById");
        queryPanelById.setParameter("id", panel.getPanel_id());
        TblSolarpanel tblPanel = (TblSolarpanel) queryPanelById.getSingleResult();

        utx.begin();
        tblPanel.setAusrichtung(panel.getAusrichtung());
        tblPanel.setNeigung(panel.getNeigung());
        tblPanel.setBreite(panel.getBreite());
        tblPanel.setLaenge(panel.getLaenge());
        tblPanel.setRahmenbreite(panel.getRahmenbreite());
        tblPanel.setThe_geom(GeometryConverter.ArrayLatLngToGeometry(panel.getThe_geom()));

        tblPanel.setCookie(getCookieById(panel.getCookie_id()));
        em.merge(tblPanel);

        utx.commit();
        logger.warning("Panel geupdated");
        return new ModelSolarpanel(tblPanel);
    }

    @GET
    @Path("/removePanel/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String removePanel(@PathParam("id") int id) throws Exception{
        Query queryPanelById = this.em.createNamedQuery("tblSolarpanel.findById");
        queryPanelById.setParameter("id", id);
        TblSolarpanel tblPanel = (TblSolarpanel) queryPanelById.getSingleResult();
        if(tblPanel != null) {
            utx.begin();
            TblSolarpanel pPanel = em.merge(tblPanel);
            em.remove(pPanel);
            utx.commit();
            logger.warning("Panel gelöscht");
            return "Deleted";
        }
        return "Not found";
    }


    private TblCookie getCookieById(int id){
        Query queryRoofById = em.createNamedQuery("tblCookie.findById");
        queryRoofById.setParameter("id", id);
        List resultRoofs = queryRoofById.getResultList();
        if(resultRoofs.isEmpty()){
            return null;
        }
        TblCookie tblCookie = (TblCookie) queryRoofById.getSingleResult();
        return tblCookie;
    }
}


