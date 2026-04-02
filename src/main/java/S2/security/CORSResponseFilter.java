package S2.security;

import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.ext.Provider;

@Provider
public class CORSResponseFilter implements ContainerResponseFilter {

    @Override
    public void filter(ContainerRequestContext requestContext,
                       ContainerResponseContext responseContext) {
        //reflect the origin back. * is not allowed with authentication like JWT or cookies
        String origin = requestContext.getHeaderString("Origin");
        if (origin != null) {
            responseContext.getHeaders().add("Access-Control-Allow-Origin", origin);
        }
        // production:
        // responseContext.getHeaders().add("Access-Control-Allow-Origin", "https://your-frontend.com");
        responseContext.getHeaders().add("Access-Control-Allow-Credentials", "true");
        responseContext.getHeaders().add("Access-Control-Allow-Headers","origin, content-type, accept, authorization");
        responseContext.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
    }
}