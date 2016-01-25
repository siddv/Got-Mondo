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
      link: function (scope) {

        var run = function(){
          var money = (scope.money/100).toFixed(2).toString().split('.');

          scope.pounds = money[0];
          scope.pence = money[1];
          scope.class = 'negative';

          if(scope.pounds.indexOf('-') > -1){
            scope.pounds = scope.pounds.replace('-','');
          }else if(scope.money == 0) {
            scope.class = 'neutral';
          }else{
            scope.class = 'positive';
            if(scope.hasPlus){
              scope.plus = '+';
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