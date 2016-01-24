'use strict';

angular.module('mondularApp')
  .directive('currency', function () {
    return {
      templateUrl: 'app/currency/currency.html',
      restrict: 'EA',
      scope: {
        money: '=',
        hasPlus: '='
      },
      link: function (scope, element, attrs) {

        var run = function(){
          var money = (scope.money/100).toFixed(2).toString().split(".");

          scope.pounds = money[0];
          scope.pence = money[1];
          scope.positive = true;

          if(scope.pounds.indexOf('-') > -1){
            scope.positive = false;
            scope.pounds = scope.pounds.replace('-','');
          }else{
            if(scope.hasPlus){
              scope.plus = '+'
            }
          }
        };
        run();

        scope.$watch('money', function(){
          run();
        });
      }
    };
  });