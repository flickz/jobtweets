import io from 'socket.io-client';
const stream =  io();

stream.on('error', (error)=>{
  console.log("Error occoured..", error);
});

export default stream;
