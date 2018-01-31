import * as domainPing from "domain-ping";
import * as yargs from "yargs";
import * as beeper from "beeper";
import * as clc from "cli-color";

const argv = yargs
    .usage('usage: $0 <command>')
    .command('[options] <domain>', 'ping a domain until it respond')
    .option('no-beep',{
        describe:"don't beep after ping respond",
        boolean:true,
        default:false
    })
    .option('time',{
        alias : "t",
        describe:"seconds before next ping",
        default:1
    })
    .help('help')
    .alias("h", "help")
    .wrap(null)
    .argv;

let timeBetweenPings = argv.t*1000;
let domain = argv._[0];

function ping(){
    clearTimeout(pingTimeout);

    domainPing(domain)
        .then((res) => {
            beeper();
            console.log(clc.green("Domain "+res.domain+" ["+res.ip+"] respond with success"));
        })
        .catch((error) => {
            console.error(error.error);
            setTimeout(ping, timeBetweenPings);
        });
}

let pingTimeout = setTimeout(ping, timeBetweenPings);