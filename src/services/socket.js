import io from "socket.io-client";

const socket = io("https://word-war.herokuapp.com/", {
  "sync disconnect on unload": true,
});

export default socket;
