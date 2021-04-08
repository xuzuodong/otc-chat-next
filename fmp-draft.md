```typescript
const fmp = new FzmMessageProtocol('ws://172.16.101.126:8888/sub/')

const connection = {
  debug: process.env.NODE_ENV === 'development',

  state: reactive({
    connection: null
  }),

  fetch(newValue) {
    if (this.debug) {
      console.log('FzmMessageProtocol： 已连接上')
    }

    this.state.connection = newValue
  },
}

fmp.authorize({
  token: '1', 
  appId: 'zb_otc'
}).then((conn) => {
 	connectionStore.fetch(conn)
  // conn.sendHeartBeat()
  // connection.disconnect()
  // connection.sendMessage()
  // connection.onReceiveMessage = () => {}
}
})
.catch((error) => {
	// 鉴权失败，无法进行接下来的操作
  
})

export default connection
```

