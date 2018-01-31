#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var domainPing = require("domain-ping");
var yargs = require("yargs");
var beeper = require("beeper");
var clc = require("cli-color");
var argv = yargs
    .usage('usage: $0 <command>')
    .command('[options] <domain>', 'ping a domain until it respond')
    .option('no-beep', {
    describe: "don't beep after ping respond",
    boolean: true,
    default: false
})
    .option('time', {
    alias: "t",
    describe: "seconds before next ping",
    default: 1
})
    .help('help')
    .alias("h", "help")
    .wrap(null)
    .argv;
var timeBetweenPings = argv.t * 1000;
var domain = argv._[0];
function ping() {
    clearTimeout(pingTimeout);
    domainPing(domain)
        .then(function (res) {
        beeper();
        console.log(clc.green((new Date()).toLocaleTimeString() + " : Domain " + res.domain + " [" + res.ip + "] respond with success"));
    })
        .catch(function (error) {
        console.error((new Date()).toLocaleTimeString() + " : Domain " + error.domain + " doesn't answer : " + error.error);
        setTimeout(ping, timeBetweenPings);
    });
}
var pingTimeout = setTimeout(ping, timeBetweenPings);
