import io from 'socket.io-client';
<<<<<<< HEAD
const stream =  io('localhost:8080/');
=======
const stream =  io("localhost:8080/");
>>>>>>> chrome-ext

stream.on('error', (error)=>{
  console.log("Error occoured..", error);
});

export default stream;
