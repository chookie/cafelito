package com.mechanitis.demo.coffee.resources;

import com.mechanitis.demo.coffee.api.CoffeeShop;
import com.mechanitis.demo.coffee.api.Order;
import com.mongodb.MongoClient;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;

@Path("/coffeeshop")
@Produces(MediaType.APPLICATION_JSON)
public class CoffeeShopResource {

    private final Datastore datastore;

    public CoffeeShopResource(MongoClient mongoClient) {
        datastore = new Morphia().createDatastore(mongoClient, "Cafelito");
    }

    @Path("nearest/{latitude}/{longitude}")
    @GET()
    public Object getNearest(@PathParam("latitude") double latitude,
                             @PathParam("longitude") double longitude) {

        return datastore.find(CoffeeShop.class)
                        .field("location")
                        .near(longitude, latitude, true)
                        .get(); // Just get closest one
    }

    @Path("order")
    @POST()
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveOrder(Order order) {

        datastore.save(order);

        // This is saying create response with uri + id and the order entity in the body.
        return Response.created(URI.create(order.getId())).entity(order).build();
    }
}
