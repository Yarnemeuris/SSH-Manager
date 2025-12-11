const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld("data", {
    getHosts: () => ipcRenderer.invoke("getHosts"),
    addHost: (name, host) => ipcRenderer.invoke("addHost", name,  host)
})

contextBridge.exposeInMainWorld("DEV", {
    reloadCallback: (callback) => ipcRenderer.on("reload", callback)
})