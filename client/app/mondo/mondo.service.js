'use strict';

angular.module('mondularApp')
    .service('mondo', function ($http, $filter) {
        // AngularJS will instantiate a singleton by calling "new" on this function

        this.getAccount = function (token) {
            return $http({
                method: 'GET',
                url: 'https://api.getmondo.co.uk/accounts',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
        };

        this.getTransactions = function (token, accountId) {
            return $http({
                method: 'GET',
                url: 'https://api.getmondo.co.uk/transactions',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    'expand[]': 'merchant',
                    'account_id': accountId
                }
            })
        };

        this.getBalance = function (token, accountId) {
            return $http({
                method: 'GET',
                url: 'https://api.getmondo.co.uk/balance',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    'account_id': accountId
                }
            })
        };

        this.transform = function(transactions){
            transactions = $filter('orderBy')(transactions, 'created', true);

            var transformedArray = [];
            var tempArray = [];
            var transformedDay = [];
            var lastDay = 'pants';
            var length = transactions.length -1;

            angular.forEach(transactions, function(transaction, index){

                var date = new Date(transaction.created);
                var day = date.getDay();

                if(lastDay == 'pants'){
                    lastDay = day;
                }

                if(transaction.is_load == true){
                    transaction.merchant = {};
                    transaction.merchant.name = 'Top Up';
                    transaction.merchant.logo = 'https://pbs.twimg.com/profile_images/659396800143454208/hMnU5vkB.png';
                }

                if(!transaction.merchant.logo && !transaction.merchant.emoji){
                    transaction.merchant.logo = 'http://altcoindb.com/images/mariobroscoin.png';
                }


                console.log(transaction.merchant.name, day, lastDay);

                if(day == lastDay){
                    transformedDay.push(transaction);
                }else{
                    lastDay = day;
                    tempArray.push(transformedDay);
                    transformedDay = [];
                    transformedDay.push(transaction);
                }

                if(index == length){
                    lastDay = day;
                    tempArray.push(transformedDay);
                    transformedDay = [];
                }
            });

            angular.forEach(tempArray, function(day){
                var tempDay = {
                    'spent':0,
                    'date':'',
                    'transactions':[]
                };

                angular.forEach(day, function(transaction){
                    var day = new Date(transaction.created).toString().split(' ');
                    day = day[2] + ' ' + day [1];
                    tempDay.date = day;
                    if(transaction.is_load != true){
                        tempDay.spent += transaction.amount;
                    }

                    tempDay.transactions.push(transaction);
                });

                transformedArray.push(tempDay);
            });
            console.log(transformedArray);
            return transformedArray;
        };

    });
