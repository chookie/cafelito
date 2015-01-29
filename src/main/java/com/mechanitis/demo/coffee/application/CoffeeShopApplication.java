package com.mechanitis.demo.coffee.application;

import com.mechanitis.demo.coffee.resources.CoffeeShopResource;
import com.mechanitis.demo.coffee.resources.MongoClientManager;
import com.mongodb.MongoClient;
import io.dropwizard.Application;
import io.dropwizard.Configuration;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

/**
 * Created by Alison on 26/01/15
 */
public class CoffeeShopApplication extends Application<Configuration> {
    public static void main(String[] args) throws Exception {
        new CoffeeShopApplication().run(args);
    }

    @Override
    public void initialize(Bootstrap<Configuration> bootstrap) {
        AssetsBundle bundle = new AssetsBundle("/html", "/","coffee.html");
        bootstrap.addBundle(bundle);
    }

    @Override
    public void run(Configuration configuration, Environment environment) throws Exception {
        // Bug in 0.7.0 http://stackoverflow.com/questions/24822939/dropwizard-serving-assets-help-needed
        // need to set path to / in config
        environment.jersey().setUrlPattern("/api/*");
        MongoClient mongoClient = new MongoClient();
        environment.lifecycle().manage(new MongoClientManager(mongoClient));
        environment.jersey().register(new CoffeeShopResource(mongoClient));
    }
}
