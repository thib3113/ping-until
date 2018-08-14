# ping-until

[![Greenkeeper badge](https://badges.greenkeeper.io/thib3113/ping-until.svg)](https://greenkeeper.io/)

ping a domain until it answer

#installation
`npm -g i ping-until`

#usage
`ping-until github.com`

will produce

    14:53:48 : Domain github.com doesn't answer : getaddrinfo ENOENT
    14:53:49 : Domain github.com doesn't answer : getaddrinfo ENOENT
    14:53:51 : Domain github.com doesn't answer : getaddrinfo ENOENT
    14:53:52 : Domain github.com [192.30.253.112] respond with success
    
This program stop and produce a bell when the server answer .

###CLI arguments

**--time, -t** : select the time before next ping

**--no-bell**  : don't beep after ping respond