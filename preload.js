const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld("electronAPI", {
    hosts: {
    get: () => ipcRenderer.invoke("getHosts"),
    add: (name, host) => ipcRenderer.invoke("addHost", name,  host),
    connect: (name) => ipcRenderer.invoke("connect", name)
}})

contextBridge.exposeInMainWorld("DEV", {
    reloadCallback: (callback) => ipcRenderer.on("reload", callback)
})