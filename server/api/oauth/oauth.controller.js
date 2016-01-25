'use strict';

var _ = require('lodash');
var https = require('https');
var http = require('http');
var querystring = require('querystring');
//var credentials = require('./credentials.js');
var credentials = {
    client: 'oauthclient_000094S7qhLsD1dGgZGVhh',
    secret: 'V+laHjZX8SgQ5D9eZB879tff3Rvr2rJrF0KMAAsNOl0PoK83qXHS2UOuZxB9YZvnTLGUxBREuIN0bw5HO4Gt'
};


exports.index = function (req, res) {
    var code = req.query.code;

    var post_data = querystring.stringify({
        'grant_type': 'authorization_code',
        'client_id': credentials.client,
        'client_secret': credentials.secret,
        'redirect_uri': 'http://' + req.get('host') + '/oauth/callback',
        'code': code
    });

    var post_options = {
        host: 'api.getmondo.co.uk',
        path: '/oauth2/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(post_data)
        }
    };

    var post_req = https.request(post_options, function (response) {
        response.setEncoding('utf8');
        response.on('data', function (data) {
            data = JSON.parse(data);
            res.cookie('token', data.access_token);
            res.redirect('/dashboard');
        });
    });

    post_req.write(post_data);
    post_req.end();
};
