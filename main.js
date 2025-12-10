const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')

const path = require('node:path')
const fs = require('node:fs')
//const { spawn } = require('node:child_process')
//const command = spawn("ssh", [], {shell: true, detached: true});

var config = {}

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    fs.watch(path.join(__dirname, "frontEnd"), (event) => {
        if (event != "change") return

        win.webContents.send("reload")
    })

    globalShortcut.register("F11", () => { win.webContents.toggleDevTools() })

    win.loadFile('frontEnd/index.html')
    win.removeMenu()
}

app.whenReady().then(() => {
    ipcMain.handle("getHosts", () => {return config.hosts})
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

if (fs.existsSync("./config.json")) {
    config = JSON.parse(fs.readFileSync("./config.json", { encoding: "utf8" }))
    console.log(config)
} else console.log("no config");
