package filter;

import com.sun.jersey.spi.container.ContainerRequest;
import com.sun.jersey.spi.container.ContainerRequestFilter;

/**
 * Created by Patrick Starzynski on 19.11.2016.
 */
public class RequestFilter implements ContainerRequestFilter{
    public ContainerRequest filter(ContainerRequest containerRequest) {
        return containerRequest;
    }
}
