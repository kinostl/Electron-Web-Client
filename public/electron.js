const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain

const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')

const net = require('net')

if (isDev) {
  const { default: installExtension, REACT_DEVELOPER_TOOLS, MOBX_DEVTOOLS } = require('electron-devtools-installer')

  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err))

  installExtension(MOBX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err))
}

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
  if (isDev) {
    mainWindow.webContents.openDevTools()
  }
  mainWindow.setMenuBarVisibility(false)
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

ipcMain.on('sendData', (event, world_id, data) => {
  let client = connections.get(world_id)
  data = data + "\n\r"
  client.write(data)
})

ipcMain.on('connectWorld', (event, world) => {
  console.log("Connecting world")
  console.log(world)
  let new_connection = new net.Socket()
  let world_id = world['_id']
  let world_port = world['server_port'] * 1
  new_connection.on('data',
    (data) => {
      mainWindow.webContents.send('dataReceived', {
        "world_id": world_id,
        "data": data.toString()
      })
    })

  new_connection.on('error', (err) => {
    console.log("Connection failed")
    console.log(err)
    mainWindow.webContents.send('connectionFailed', {
      "world_id": world_id,
      "error": "Connection error occured. Please check this world's settings."
    })
  })

  new_connection.on('end',
    () => {
      console.log("Closing connection")
      mainWindow.webContents.send('connectionClosed', {
        "world_id": world_id
      })
    })

  if (typeof world_port == 'number' && !isNaN(world_port)) {
    console.log("Sending connection request")
    new_connection.connect(
      world_port,
      world['server_address'],
      () => {
        console.log("Connected.")
        connections.set(world['_id'], new_connection)
        mainWindow.webContents.send('connectionOpened', world)
      })
  } else {
    mainWindow.webContents.send('connectionFailed', {
      "world_id": world_id,
      "error": "NaN error occured. Port needs to be a real number. You can change the port in the Settings."
    })
  }
})