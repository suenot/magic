var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require("path");
var nodemailer = require('nodemailer');
var wellknown = require('nodemailer-wellknown');

app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));

// settings server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().portk;
  console.log('Example app listening at http://%s:%s', host, port);
});

// settings email
var transporter = nodemailer.createTransport({
  service: 'Yandex',
  auth: {
    user: 'dfsdf@df.ru',
    pass: 'sdfsdfsd'
  }
});

// routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
})
app.post('/mail', function(req, res) {
  var htmlEmail = '';
  req.body.data.forEach(function(item){
    htmlEmail += item.question + ' — ' + item.answer + '<br />';
  });
  var mailOptions = {
    from: 'sdfsdfsdfd ✔ <tesdfsdfst@sdfsdf.rsdfsdfu>', // sender address
    to: 'ssdfsdf@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: htmlEmail // html body
  };
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
  res.sendStatus(200);
});
