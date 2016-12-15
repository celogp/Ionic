(function () {
    "use strict";

    angular.module("myapp.services", [])
        .factory("myappService", ["$http", function ($http) {
            var myappService = {};
            var products = [{}];

            //starts and stops the application waiting indicator
            myappService.wait = function (show) {
                if (show)
                    $(".spinner").show();
                else
                    $(".spinner").hide();
            };

            myappService.listProducts = function () {
                return ($http({
                    method: 'GET',
                    url: 'http://localhost:53964/api/produto/ConsultarProdutos'
                }));
            };

            myappService.listProduct = function (id) {
                return ($http({
                    method: 'GET',
                    url: 'http://localhost:53964/api/produto/ConsultarProdutoPorCodigo',
                    params: { 'id': id }
                }));
            };

            myappService.saveProduct = function (product) {
                console.log('passou no servico de saveProduct');
                return ($http({
                    method: 'POST',
                    url: 'http://localhost:53964/api/produto/CadastrarProduto',
                    data: product
                }));

            };

            myappService.eraseProduct = function () {
                console.log('passou no servico de eraseProduct');
            };

            return myappService;
        }]);
})();