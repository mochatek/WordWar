import io from "socket.io-client";

const socket = io("http://localhost:5000", {
  "sync disconnect on unload": true,
});

export default socket;
