import io from "socket.io-client";

const socket = io("https://word-war.herokuapp.com/", {
  // const socket = io("http://localhost:5000/", {
  "sync disconnect on unload": true,
});

export default socket;
