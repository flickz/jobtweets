import io from 'socket.io-client';
const stream =  io();

stream.on('error', (error)=>{
  console.log("Error occoured..");
});

// stream.on('tweet', (event)=>{
//   console.log(event.text);
// })
export default stream;
