package com.mechanitis.demo.coffee.api;

@SuppressWarnings("ALL")
public class CoffeeShop {
    private Point location;
    private String name;
    private Long openStreetMapId;

    public Point getLocation() {
        return location;
    }

    public Long getOpenStreetMapId() {
        return openStreetMapId;
    }

    public String getName() {
        return name;
    }

    static class Point {
        private double[] coordinates;

        public double[] getCoordinates() {
            return coordinates;
        }
    }
}
