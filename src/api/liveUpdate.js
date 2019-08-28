import openSocket from "socket.io-client"
import md5 from "md5"

class Socket {
  constructor() {
    this.socket = openSocket(`${process.env.REACT_APP_BACKEND_API}/`, {
      "force new connection": true,
    })
  }

  subscribeTo(eventName, func) {
    const subName = this.getSubscriptionName(eventName)
    this.socket.on(subName, newVal => func(null, newVal))
    this.socket.emit(subName, "HEY")

    console.log(`Subscribed to ${eventName}`)
  }

  unsubscribeTo(eventName) {
    this.socket.removeListener(eventName)
    this.socket.disconnect()
  }

  getSubscriptionName(name) {
    return `update${md5(name)}`
  }
}
export default Socket
