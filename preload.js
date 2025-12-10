const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld("data", {
    getHosts: () => ipcRenderer.invoke("getHosts"),
})

contextBridge.exposeInMainWorld("DEV", {
    reloadCallback: (callback) => ipcRenderer.on("reload", callback)
})