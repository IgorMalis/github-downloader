'use strict';

var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var cors = require('cors');

import path from 'path';

import Websocket from '../api/websocket';

import Downloader from './downloader';

import {
  WS_PORT,
} from '../env';

import {
  loadPreferences,
  savePreferences,
} from './preferences';




let _ws = null;

export default function init() {

    app.use(express.static('src_server/public'))
      .use(bodyParser.json())
      .use(cors());



    app.get('/', function(req, res){
      res.sendFile(__dirname + '/index.html');
    });


    // Setup preferences API
    var router = express.Router();
    router.get('/preferences', function(req, res) {

        const preferences = loadPreferences();
        res.json({ preferences: preferences });
    });
    router.post('/preferences', function(req, res) {
        const body = req.body;

        const preferences = body.preferences;
        savePreferences(preferences);

        res.json({ status: 'ok' });
    });

    
    app.use('/api', router);


    // Setup downloader service
    const downloader = new Downloader();


    // Setup websocket for live communication with client (2-way)
    const ws = new Websocket(downloader);
    downloader.init(ws);
    ws.init(http);
    _ws = ws;

    http.listen(WS_PORT, function() {
      console.log('listening on *:' + WS_PORT);
    });

}


export function getWebsocket() {
  return _ws;
}
