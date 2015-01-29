package com.mechanitis.demo.coffee.api;

import org.mongodb.morphia.annotations.Id;

import java.util.Arrays;

/**
 * Created by Alison on 28/01/15
 */
public class Order {
    //    form = {
    //        "selectedOptions": [],
    //        "type": {
    //            "name": "Cappuccino",
    //            "family": "Coffee"
    //        },
    //        "size": "Small",
    //        "drinker": "Trisha"
    //    }
    private String[] selectedOptions;
    private DrinkType type;
    private String size;
    private String drinker;
    @Id
    private String id;

    public String[] getSelectedOptions() {
        return selectedOptions;
    }

    public DrinkType getType() {
        return type;
    }

    public String getSize() {
        return size;
    }

    public String getDrinker() {
        return drinker;
    }

    public String getId() {
        return id;
    }
}
