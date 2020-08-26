const Discord = require('discord.js');
const config = require('./config.json');
const settings = require('./settings.json');
const client = new Discord.Client();

client.on('ready', () => {
    client.fetchUser(config.owner).then(owner => {
        client.owner = owner;
        console.log('Logged in as @' + client.user.tag + ', owned by @' + client.owner.tag);
    });

    let interval = settings.delay.h * 60 * 60 * 1000 + settings.delay.m * 60 * 1000 + settings.delay.s * 1000;
    setInterval(() => {
        client.channels.get(settings.channel).send(settings.message);
    }, interval);
});

client.on('message', message => {
    if (message.member.bot || !message.content.startsWith(config.prefix)) return;

    if (message.content.startsWith(config.prefix + 'ping')) {
        message.channel.send('**Ping:** `' + client.ping + 'ms`');
    }
});

client.login(config.token);
