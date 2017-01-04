(function () {
    "use strict";

    angular.module("myapp.services", [])
        .factory("myappService", ["$http", "$ionicPopup", function ($http, $ionicPopup) {
            var myappService = {};

            myappService.showAlert = function (titulo, mensagem) {
                var alertPopup = $ionicPopup.alert({
                    title: titulo,
                    template: mensagem
                });

                alertPopup.then(function (res) {
                    console.log('Thank you for not eating my delicious ice cream cone');
                });
            };


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
                return ($http({
                    method: 'POST',
                    url: 'http://localhost:52426/Api/Produtos/IncluirProduto/',
                    data: product
                }).then(
                    function success(response) {
                        if (response.data.Message != '') {
                            myappService.showAlert('Atenção', response.data.Message);
                        }
                    },
                    function error(response) {
                        if (response.data.Message != '') {
                            myappService.showAlert('Atenção', response.data.Message);
                        }
                })
                );
            };

            myappService.saveProduct = function (product) {
                return ($http({
                    method: 'PUT',
                    url: 'http://localhost:52426/Api/Produtos/AlterarProduto/' + product.Id,
                    data: product
                }));

            };

            myappService.eraseProduct = function (id) {
                return ($http({
                    method: 'DELETE',
                    url: 'http://localhost:52426/Api/Produtos/ExcluirProduto/'+id
                }));

            };

            return myappService;
        }]);
})();