/// <reference path="hapi.d.ts" />

import Hapi = require("hapi");

// Create a new server
var server: Hapi.Server = new Hapi.Server({
    load: {
        sampleInterval: 1000
    }
});

// app data
server.app.key = 'value';

// read ServerRealm property
var server_prefix: string = server.realm.modifiers.route.prefix;

//
server.after(function (plugin, next) {
    next();
});

//
server.on(Hapi.ServerEvents.LOG, function (e: Hapi.ServerEvent, tags: any): void {
    if (tags.error)
        console.log(e.timestamp + ' Server error: ' + (e.data || 'unspecified'));
});

// add a route
server.route({
    path: '/',
    method: 'GET',
    handler: function(request: Hapi.Request, reply: Hapi.reply): void {
        reply('hello world');
    }
});

//
server.start();