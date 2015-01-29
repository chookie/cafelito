package com.mechanitis.demo.coffee.api;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by Alison on 28/01/15
 */
public class DrinkType {
    private String name;
    private String family;

    public String getName() {
        return name;
    }

    public String getFamily() {
        return family;
    }
}
