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
                    url: 'http://localhost:52426/Api/Produtos/ConsultarProdutos'
                }));
            };

            myappService.listProduct = function (id) {
                return ($http({
                    method: 'GET',
                    url: 'http://localhost:52426/Api/Produtos/ConsultarProdutoPorCodigo/'+id
                }));
            };

            myappService.addProduct = function (product) {
                console.log('passou no servico de addProduct', product.Id);
                return ($http({
                    method: 'POST',
                    url: 'http://localhost:52426/Api/Produtos/IncluirProduto/',
                    data: product
                }));

            };

            myappService.saveProduct = function (product) {
                console.log('passou no servico de saveProduct', product.Id);
                return ($http({
                    method: 'PUT',
                    url: 'http://localhost:52426/Api/Produtos/AlterarProduto/' + product.Id,
                    data: product
                }));

            };

            myappService.eraseProduct = function (id) {
                console.log('passou no servico de eraseProduct');
                return ($http({
                    method: 'DELETE',
                    url: 'http://localhost:52426/Api/Produtos/ExcluirProduto/'+id
                }));

            };

            return myappService;
        }]);
})();