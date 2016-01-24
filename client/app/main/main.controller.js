'use strict';

angular.module('mondularApp')
    .controller('MainCtrl', function ($scope, $http) {
        $scope.leadText = 'Mongular';

        $scope.myUrl = 'http://' + location.host;
        $scope.oAuthClient = 'oauthclient_000094S7qhLsD1dGgZGVhh';
    });
