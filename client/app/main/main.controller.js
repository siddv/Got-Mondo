'use strict';

angular.module('mondularApp')
    .controller('MainCtrl', function ($scope, mondo, $cookies) {

        var token = $cookies.get('token');

        $scope.myUrl = mondo.myUrl;
        $scope.oAuthClient = mondo.oAuthClient;

        mondo.getAccount(token).then(function () {
            window.location = '/dashboard';
        })
    });
