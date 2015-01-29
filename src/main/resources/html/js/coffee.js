(function (){

    var coffeeApp = angular.module('coffeeApp',['ngResource','ui.bootstrap']);

    var controller = function ($scope, $resource) {
        $scope.types = [
            {name: 'Americano', family: 'Coffee'},
            {name: 'Latte', family: 'Coffee'},
            {name: 'Cappuccino', family: 'Coffee'},
            {name: 'Tea', family: 'That Other Drink'}
        ];
        $scope.sizes = [ 'Small', 'Medium', 'Large'];
        $scope.messages = [];

        $scope.sendMeCoffee = function () {
            $scope.drink.coffeeShopId = 1;
            // $resource is angular resource to send to backend.
            var CoffeeOrder = $resource('/api/coffeeshop/order');
            CoffeeOrder.save($scope.drink, function (order) {
                $scope.messages.push({type: 'success', msg: 'Order Sent'});
            });
        };

        $scope.closeAlert = function (index){
            $scope.messages.splice(index,1);
        };
    };

    coffeeApp.controller('OrderController', ['$scope','$resource', controller]);

}());
