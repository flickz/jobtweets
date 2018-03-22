import io from 'socket.io-client';
const stream =  io('localhost:8080/');

stream.on('error', (error)=>{
  console.log("Error occoured..", error);
});

export default stream;
