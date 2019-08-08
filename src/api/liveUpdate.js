import openSocket from "socket.io-client"
import md5 from "md5"

const port = 3333
const socket = openSocket(`http://localhost:${port}`)

function getSubscriptionName(name) {
  return `update${md5(name)}`
}

function subscribeTo(eventName, wantedData, func) {
  const subName = getSubscriptionName(eventName)

  console.log(subName)
  socket.on(subName, newVal => func(null, newVal))
  socket.emit(subName, JSON.stringify(wantedData))
}

function unsubscribeTo(eventName) {
  socket.removeListener(eventName)
}

export { subscribeTo, unsubscribeTo }
