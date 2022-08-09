const {app, BrowserWindow} = require('electron')

function createwindow() {
    const win = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration:true
        }
    })
    win.loadFile("terminal-test.html")
}
app.whenReady().then(createwindow);
