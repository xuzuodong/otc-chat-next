export default (rawMsg: Blob): Promise<Object> => {
    return new Promise((resolve, reject) => {
        rawMsg.arrayBuffer().then((msg: any) => {
            console.log(new Uint8Array(msg))
            resolve({})
        })
    })
}
