const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld("data", {
    getHosts: () => ipcRenderer.invoke("getHosts"),
    addHost: (host) => ipcRenderer.invoke("addHost", host)
})

contextBridge.exposeInMainWorld("DEV", {
    reloadCallback: (callback) => ipcRenderer.on("reload", callback)
})