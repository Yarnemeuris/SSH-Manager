const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')

const path = require('node:path')
const fs = require('node:fs')
const { spawn } = require('node:child_process')

var config = { hosts: {} }

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

function save() {
    fs.writeFileSync("./config.json", JSON.stringify(config));
}

app.whenReady().then(() => {
    ipcMain.handle("getHosts", () => config.hosts)
    ipcMain.handle("addHost", (event, name, host) => {
        config.hosts[name] = host;
        save();
    })
    ipcMain.handle("connect", (event, name) => {
        var host = config.hosts[name]

        if (host.password == "") {
            spawn("ssh", [`${host.user}@${host.IP}`], { shell: true, detached: true });
            return;
        }

        spawn("wsl", [`sshpass -p ${host.password} ssh ${host.user}@${host.IP}`], { shell: true, detached: true });
    })
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

if (fs.existsSync("./config.json")) {
    config = JSON.parse(fs.readFileSync("./config.json", { encoding: "utf8" }))
} else console.log("no config");
