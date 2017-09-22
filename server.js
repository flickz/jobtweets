require('dotenv').config();
const express = require('express');
const Twitter = require('twitter');
const app = express();
const server = require('https').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');

server.listen(process.env.PORT||8000, ()=>{console.log("Server listening...")});

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(cors());
  app.use(express.static('client/build'));
}

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
}); 

const searchOptions = {
  track: 'we are hiring, looking for interns, we are employing, vacancy!, we have job available',
  filter_level: 'low'
}

const stream = client.stream('statuses/filter', searchOptions);

stream.on('error', (error)=>{
  console.log("Twitter error occoured..", error);
});

io.on('connection', (socket)=>{
  socket.on('error', (error)=>{
    console.error("New socket Error", error);
  });
  
  stream.on('data', function(event) {
    socket.emit('tweet', event); 
  });
});