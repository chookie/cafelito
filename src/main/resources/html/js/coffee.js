(function (){

    var coffeeApp = angular.module('coffeeApp',['ngResource','ui.bootstrap']);

    var orderController = function ($scope, $resource, LocalCoffeeShop) {
        $scope.types = [
            {name: 'Americano', family: 'Coffee'},
            {name: 'Latte', family: 'Coffee'},
            {name: 'Cappuccino', family: 'Coffee'},
            {name: 'Tea', family: 'That Other Drink'}
        ];
        $scope.sizes = [ 'Small', 'Medium', 'Large'];
        $scope.messages = [];

        $scope.sendMeCoffee = function () {
            //noinspection JSUnresolvedVariable
            $scope.drink.coffeeShopId = LocalCoffeeShop.getShop().openStreetMapId;
            // $resource is angular resource to send to backend.  Subclasses http and tailored for rest more than just straight http.
            var CoffeeOrder = $resource('/api/coffeeshop/order');
            CoffeeOrder.save($scope.drink, function () {
                $scope.messages.push({type: 'success', msg: 'Order Sent'});
            });
        };

        $scope.closeAlert = function (index){
            $scope.messages.splice(index,1);
        };
    };
    coffeeApp.controller('OrderController', ['$scope','$resource', 'LocalCoffeeShop', orderController]);

    var localCoffeeShopService = function () {
        var localCoffeeShop;

        this.setShop = function (shop){
            localCoffeeShop = shop;
        };

        this.getShop = function (){
            return localCoffeeShop;
        };
    };
    coffeeApp.service('LocalCoffeeShop', localCoffeeShopService);

    var coffeeShopController = function ($scope, $resource, $window, LocalCoffeeShop){
        var CoffeeShopLocator = $resource('/api/coffeeshop/nearest/:latitude/:longitude',
            // Default params.  @ means take from model when get is called. {} is actions, can create custom verbs.
            { latitude: '@latitude', longitude: '@longitude'},{});

        $scope.findNearestCoffeeshopToMe = function (){
            window.navigator.geolocation.getCurrentPosition( function (position){
                CoffeeShopLocator.get( { latitude: position.coords.latitude, longitude: position.coords.longitude}, function (foundCoffeeShop) {
                    $scope.nearestCoffeeShop = foundCoffeeShop;
                    LocalCoffeeShop.setShop(foundCoffeeShop);
                });
            });
        };
        // automatcically find
        $scope.findNearestCoffeeshopToMe();
    };
    coffeeApp.controller('CoffeeShopController', ['$scope', '$resource','$window', 'LocalCoffeeShop', coffeeShopController]);

}());
