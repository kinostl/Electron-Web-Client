const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

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
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
  mainWindow.webContents.send('telnet-data', "CONNECTED")
  client.connect(4201, 'erebor.localecho.net',function(){
    console.log('Connected')
    mainWindow.webContents.send('telnet-data', "CONNECTED")
  })

  client.on('data', function(data){
    mainWindow.webContents.send('telnet-data', data.toString())
  })
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
