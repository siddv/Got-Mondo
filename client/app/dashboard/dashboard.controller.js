'use strict';

angular.module('mondularApp')
    .controller('DashboardCtrl', function ($scope, $cookies, $http, $filter, mondo) {

        var token = $cookies.get('token');
        var account = {};

        $scope.mondo = {
            user: '...',
            balance: '0',
            transactions: []
        };

        mondo.getAccount(token).then(function (response) {

            account.id = response.data.accounts[0].id;
            $scope.mondo.user = response.data.accounts[0].description;

            mondo.getTransactions(token, account.id).then(function (response) {
                $scope.mondo.transactions = mondo.transform(response.data.transactions);
            });

            mondo.getBalance(token, account.id).then(function (response) {
                $scope.mondo.balance = response.data.balance;
            });
        }).catch(function () {

            var myUrl = 'http://' + location.host;
            var oAuthClient = 'oauthclient_000094S7qhLsD1dGgZGVhh';
            window.location = 'https://auth.getmondo.co.uk/?client_id=' +
                oAuthClient +
                '&redirect_uri=' +
                myUrl +
                '/oauth/callback&response_type=code&state=jjHwiXGC7zSIa0sUhN0U';
        });

    });
