const { app, BrowserWindow } = require('electron')
const { startServer } = require('./server')
const path = require('path')

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        fullscreen: true,
        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
    startServer()
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
