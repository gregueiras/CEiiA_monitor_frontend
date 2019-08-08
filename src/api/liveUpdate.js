import openSocket from "socket.io-client";
const port = 3333;
const socket = openSocket(`http://localhost:${port}`);
const eventName = "timer";

function subscribeToTimer(cb) {
  socket.on(eventName, timestamp => cb(null, timestamp));
  socket.emit("subscribeToTimer", 1000);
}

function unsubscribeToTimer() {
  socket.removeListener(eventName);
}

export { subscribeToTimer, unsubscribeToTimer };
