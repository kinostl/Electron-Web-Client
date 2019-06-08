const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain

const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')

const net = require('net')

let mainWindow;
let client = new net.Socket()

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
     nodeIntegration: true
   }
  })
  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`).then(()=>{
    client.connect(4201, 'erebor.localecho.net')

    client.on('data', function(data){
      console.log(data.toString())
      mainWindow.webContents.send('telnet-data', data.toString())
    })

    ipcMain.on('send-message',(event, args)=>{
      console.log("Received message. Sending.")
      console.log(args)
      args = args+"\n\r"
      client.write(args)
    })
  })

  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
