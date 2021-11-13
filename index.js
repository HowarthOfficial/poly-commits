var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/webhook', secret: 'ffqwfok21rfio12j904euj89012jr9012jr9012r' })

var ex = require('express')
var si = require('serve-index')
const fdl = ex()

const { MessageEmbed, WebhookClient } = require('discord.js');
const serveIndex = require('serve-index')
const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/908802436943216671/tNgY88EN0WIFl9RPaX6ducrN2u2QIPEuKNssLri92trU23_NhezLpTMcqkP6ZVQyy06T' });

fdl.use(

  '/polyv',
  ex.static('polyv'),
  serveIndex('polyv', {icons: true})

)

fdl.listen( 5055 )

// const embed = new MessageEmbed()
// 	.setTitle('Some Title')
// 	.setColor('#0099ff');

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(5050)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})


handler.on('push', function (event) {

  let value = event.payload.commits 
    let embed = {
      color: [212,123,0],
      title: 'Поправки в ' + '`' + event.payload.repository.name + '`',
      url: value.url,
      description: '`branch:` ' + event.payload.repository.master_branch + ' | `size:` ' + event.payload.repository.size + 'mb.',
      fields: 
      [
      ],
      footer: {
        text: event.payload.repository.owner.name + ' | ' + event.payload.repository.language ,
        icon_url: event.payload.repository.owner.avatar_url,
      },
    }

    for (let v of Object.values( event.payload.commits )) {
      embed.fields.push({
        name: ':bust_in_silhouette:  ' + v.author.username,
        value: v.message,
        inline: false,
      })
    }
      
    webhookClient.send({
      username: 'Поли',
      avatarURL: 'https://cdn.discordapp.com/attachments/907683880360878191/909120492651315220/1612345389_12-p-anime-programmist-art-kartinki-13.png',
      embeds: [embed],
    });

  console.log( value )
  console.log( "------------------------------------------------------------" )
  console.log( event )

})

handler.on('issues', function (event) {
  console.log('Received an issue event for %s action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title)
})

// handler.on('push', function (event) {
//   console.log('Received a push event for %s',
//     event.payload.head_commit.author.name )
// })

