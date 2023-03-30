// Imports
const express = require('express')
const app = express()
const port = 5000


// Static Files
app.use(express.static('public'));
// Specific folder example
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// Set View's
app.set('views', './views');
app.set('view engine', 'ejs');

// Navigation
app.get('', (req, res) => {
    res.render('index', { text: 'Hey' })
})

app.get('/about', (req, res) => {
   res.sendFile(__dirname + '/views/about.html')
})

app.listen(port, () => console.info(`App listening on port ${port}`))




// DISCORD.JS
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

let defaultPrefix = '!';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    let args = message.content.slice(guildPrefix.length).split(' ');
    if (!message.content.startsWith(guildPrefix)) return;
    if (args[0].toLowerCase() === 'ping') {
        return message.channel.send('Pong!');
    }
});

client.login("MTA1MzM4MjIzMTE1MTg3ODE5NA.GuMmkL.5OJutsY-elJgiYi_4RygkSAGqj6MgijttIxS9Y");