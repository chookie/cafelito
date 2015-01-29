(function (){

    var coffeeApp = angular.module('coffeeApp',['ngResource']);

    var controller = function ($scope, $resource) {
        $scope.types = [
            {name: 'Americano', family: 'Coffee'},
            {name: 'Latte', family: 'Coffee'},
            {name: 'Cappuccino', family: 'Coffee'},
            {name: 'Tea', family: 'That Other Drink'}
        ];
        $scope.sizes = [ 'Small', 'Medium', 'Large'];

        $scope.sendMeCoffee = function () {
            $scope.drink.coffeeShopId = 1;
            // $resource is angular resource to send to backend.
            var CoffeeOrder = $resource('/api/coffeeshop/order');
            CoffeeOrder.save($scope.drink);
        };
    };

    coffeeApp.controller('OrderController', ['$scope','$resource', controller]);

}());
