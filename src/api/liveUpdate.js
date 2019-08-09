import openSocket from "socket.io-client"
import md5 from "md5"

class Socket {
  constructor(port = 3333) {
    this.socket = openSocket(`http://localhost:${port}`, {
      "force new connection": true,
    })

  }
  
  getSubscriptionName(name) {
    return `update${md5(name)}`
  }

 subscribeTo(eventName, func) {
  console.log(eventName)
  const subName = this.getSubscriptionName(eventName)
  
  console.log(subName)
  this.socket.on(subName, newVal => func(null, newVal))
  this.socket.emit(subName, "HEY")
}

 unsubscribeTo(eventName) {
  this.socket.removeListener(eventName)
  this.socket.disconnect()
}

}
export default Socket
