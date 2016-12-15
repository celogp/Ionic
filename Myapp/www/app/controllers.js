(function () {
    "use strict";

    angular.module("myapp.controllers", [])

        .controller("appCtrl", ["$scope", function ($scope) {
        }])

        //homeCtrl provides the logic for the home screen
        .controller("homeCtrl", ["$scope", "$state", function ($scope, $state) {
            $scope.refresh = function () {
                //refresh binding
                $scope.$broadcast("scroll.refreshComplete");
            };
        }])

        //errorCtrl managed the display of error messages bubbled up from other controllers, directives, myappService
        .controller("errorCtrl", ["$scope", function ($scope) {
            //public properties that define the error message and if an error is present
            $scope.error = "";
            $scope.activeError = false;

            //function to dismiss an active error
            $scope.dismissError = function () {
                $scope.activeError = false;
            };

            //broadcast event to catch an error and display it in the error section
            $scope.$on("error", function (evt, val) {
                //set the error message and mark activeError to true
                $scope.error = val;
                $scope.activeError = true;

                //stop any waiting indicators (including scroll refreshes)
                myappService.wait(false);
                $scope.$broadcast("scroll.refreshComplete");

                //manually apply given the way this might bubble up async
                $scope.$apply();
            });
        }])

        .controller('crudCtrl', ["$scope", "myappService", function ($scope, myappService) {
            $scope.product = { Id: 0, Name: '', Category: '', Price: 0.00 };
            $scope.products = [{}];
            initProducts();

            function initProducts() {
                myappService.listProducts().success(function (data) {
                    $scope.products = data;
                });
            };

            $scope.btnSalvar = function () {
                myappService.saveProduct($scope.product).success(function (data) {
                    $scope.product = {};
                });
                initProducts();
            };

            $scope.btnEditar = function (id) {
                console.log('passou no editar', id);
                myappService.listProduct(id).success(function (data) {
                    $scope.product = data;
                });

            };

            $scope.btnApagar = function (id) {
                console.log('passou no apagar', id);
                myappService.eraseProduct();
            };

        }])
        
})();