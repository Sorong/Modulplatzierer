package filter;

import com.sun.jersey.spi.container.ContainerRequest;
import com.sun.jersey.spi.container.ContainerResponse;
import com.sun.jersey.spi.container.ContainerResponseFilter;

import javax.ws.rs.ext.Provider;

/**
 * Created by Patrick Starzynski on 19.11.2016.
 */
@Provider
public class CrossDomainFilter implements ContainerResponseFilter {
    
    public ContainerResponse filter(ContainerRequest containerRequest, ContainerResponse containerResponse) {
        containerResponse.getHttpHeaders().add("Access-Control-Allow-Origin", "*");
        containerResponse.getHttpHeaders().add("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
        containerResponse.getHttpHeaders().add("Access-Control-Allow-Credentials", "true");
        containerResponse.getHttpHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        containerResponse.getHttpHeaders().add("Access-Control-Max-Age", "1209600");
        return containerResponse;
    }
}
