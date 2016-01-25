'use strict';

angular.module('mondularApp')
    .service('mondo', function ($http, $filter) {
        // AngularJS will instantiate a singleton by calling "new" on this function

        this.myUrl = 'http://' + location.host;
        this.oAuthClient = 'oauthclient_000094S7qhLsD1dGgZGVhh';


        this.getAccount = function (token) {
            return $http({
                method: 'GET',
                url: 'https://api.getmondo.co.uk/accounts',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
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
            });
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
            });
        };

        this.transform = function (transactions) {

            console.log(window.moment());

            transactions = $filter('orderBy')(transactions, 'created', true);

            var transformedArray = [];
            var tempArray = [];
            var transformedWeek = [];
            var transformedDay = [];
            var lastDay = 'pants';
            var lastWeek = 'pants';
            var length = transactions.length - 1;

            angular.forEach(transactions, function (transaction, index) {

                var date = moment(transaction.created);
                var week = date.format('W');
                var day = date.format('LL');

                if (lastDay === 'pants') {
                    lastDay = day;
                }

                if (lastWeek === 'pants') {
                    lastWeek = week;
                }

                /*jshint camelcase: false */
                if (transaction.is_load === true) {
                    transaction.merchant = {};
                    transaction.merchant.name = 'Top Up';
                    transaction.merchant.logo = 'https://pbs.twimg.com/profile_images/659396800143454208/hMnU5vkB.png';
                }

                if (!transaction.merchant.logo && !transaction.merchant.emoji) {
                    transaction.merchant.logo = 'http://altcoindb.com/images/mariobroscoin.png';
                }


                console.log(transaction.merchant.name, day, lastDay);

                if (day === lastDay) {
                    transformedDay.push(transaction);
                } else {
                    lastDay = day;
                    tempArray.push(transformedDay);
                    transformedDay = [];
                    transformedDay.push(transaction);
                }

                if (index === length) {
                    lastDay = day;
                    tempArray.push(transformedDay);
                    transformedDay = [];
                }
            });

            angular.forEach(tempArray, function (day) {
                var tempDay = {
                    'spent': 0,
                    'date': '',
                    'transactions': []
                };

                angular.forEach(day, function (transaction) {

                    var day = moment(transaction.created).format('ddd Do MMM YYYY');
                    var today = moment().format('ddd Do MMM YYYY');
                    var yesterday = moment().subtract(1, 'days').format('ddd Do MMM YYYY');

                    tempDay.uDate = day;

                    if (day == today) {
                        tempDay.date = "Today";
                        tempDay.show = true;
                    } else if (day==yesterday) {
                        tempDay.date = "Yesterday";
                        tempDay.show = false;
                    } else {
                        tempDay.date = moment(transaction.created).format('ddd Do');
                        tempDay.show = false;
                    }

                    /*jshint camelcase: false */
                    if (transaction.is_load !== true) {
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
