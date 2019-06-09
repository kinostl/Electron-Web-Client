const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain

const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')

const net = require('net')
const { default: installExtension, REACT_DEVELOPER_TOOLS, MOBX_DEVTOOLS } = require('electron-devtools-installer')

installExtension(REACT_DEVELOPER_TOOLS)
  .then((name) => console.log(`Added Extension:  ${name}`))
  .catch((err) => console.log('An error occurred: ', err))

installExtension(MOBX_DEVTOOLS)
  .then((name) => console.log(`Added Extension:  ${name}`))
  .catch((err) => console.log('An error occurred: ', err))

let mainWindow
let connections = new Map()

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
     nodeIntegration: true
   }
  })
  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)

  mainWindow.on('closed', () => mainWindow = null)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('sendData',(event, world_id, data)=>{
  let client=connections.get(world_id)
  args = args+"\n\r"
  client.write(args)
})

ipcMain.on('connectWorld',(event, world)=>{
  console.log("Connecting world")
  console.log(world)
  let new_connection = new net.Socket()
  let world_id = world['_id']
  new_connection.on('data', 
  (data)=>{
    mainWindow.webContents.send('dataReceived', {
      "world_id": world_id,
      "data": data.toString()
    })
  })

  new_connection.on('end', 
  ()=>{
    mainWindow.webContents.send('connectionClosed', {
      "world_id": world_id
    })
  })

  console.log("Sending connection request")
  new_connection.connect(
    4201,
    'erebor.localecho.net',
    (err)=>{
      console.log("Connected.")
      if(err){
        console.log("Connection failed")
        console.log(err)
        mainWindow.webContents.send('connectionFailed', {
          "world_id": world_id,
          "error": err
        })
      }else{
        console.log("Connection successful")
        connections.set(world['_id'],new_connection)
        mainWindow.webContents.send('connectionOpened', world)
      }
    })
})