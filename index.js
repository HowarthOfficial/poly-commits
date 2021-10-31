var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/webhook', secret: 'ffqwfok21rfio12j904euj89012jr9012jr9012r' })

var ex = require('express')
var si = require('serve-index')
const fdl = ex()

const { MessageEmbed, WebhookClient } = require('discord.js');
const serveIndex = require('serve-index')
const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/898633189902393355/rjPaEg1nnepbrwUmZYaDPyUjWpsD1Re6hF0umZA-L-4OJuOJ1IPjTxPe2Q6qGaIRtTf4' });

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

  // const embed = new MessageEmbed()
  //   .setTitle( 'Поправки в ' + event.payload.repository.full_name )
  //   .setURL( event.payload.head_commit.url )
  //   .setAuthor( event.payload.head_commit.author.username, event.payload.sender.avatar_url )
  //   .setDescription( '`'+event.payload.before_commit.modified+'`' + ' — ' + event.payload.before_commit.message + '\n')
  //   .setFooter( event.payload.repository.language )
  //   .setTimestamp()
  //   .setColor('#0099ff');

  // webhookClient.send({
  //   username: 'Поли',
  //   avatarURL: 'https://cdn.discordapp.com/avatars/892908621514559498/e86b070810f4dd83aca2e2571c39b920.webp',
  //   embeds: [embed],
  // });

  var commitList = event.payload.commits

  for (var i = 0; i  < commitList.length; i++) {

    const embed = new MessageEmbed()
      .setTitle( 'Поправки в ' + event.payload.repository.full_name )
      .setURL( commitList[i].url )
      .setAuthor( commitList[i].author.username, event.payload.sender.avatar_url )
      .setDescription( '`branch:` ' + event.payload.repository.master_branch + ' | `size:` ' + event.payload.repository.size + 'mb.' )
      .setFooter( event.payload.repository.language )
      .addFields(
        { name: ':scroll: desctiption', value: '**`' + commitList[i].message + '`**', inline: false },
        { name: ':pencil: edited files', value: '`'+commitList[i].modified+'\n`', inline: false },
      )
      .setTimestamp()
      .setColor('#d47b00');

    webhookClient.send({
      username: 'Поли',
      avatarURL: 'https://cdn.discordapp.com/avatars/892908621514559498/e86b070810f4dd83aca2e2571c39b920.webp',
      embeds: [embed],
    });

  }

  console.log( event.payload )

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

