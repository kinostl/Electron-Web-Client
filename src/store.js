import { observable, action, decorate } from 'mobx'
import PouchDB from 'pouchdb-browser'
import shortid from 'shortid'

const { ipcRenderer } = window.require('electron')
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+-')

class AppState {
    selectedWorld
    worldDb

    constructor () {
        this.selectedWorld = null
        this.worldDb = new PouchDB('worlds')

        this.addWorld = this.addWorld.bind(this)
        this.editWorld = this.editWorld.bind(this)
    }

    async addMessage(args) {
        let world = await this.worldDb.get(args['world_id'])
        world.messages.unshift(args['data'])
        if (!world['connected']) {
            world['connected'] = true
        }
    }

    async world(world_id){
        let world = await this.worldDb.get(world_id)
        return world
    }

    async worlds(){
        let rows = await this.worldDb.allDocs({"include_docs":true})
        let worlds = []
        for(let row of rows['rows']){
            let world = row['doc']
            worlds.push(world)
        }

        return worlds
    }

    sendData(values, actions) {
        actions.resetForm()
        ipcRenderer.send('sendData',
            this.selectedConnection['world']['_id'],
            values['message']
        )
    }

    async editWorld(values, actions) {
        let world_id = values['_id']
        let new_world = values
        let world = await this.worldDb.get(world_id)
        new_world['_rev'] = world._rev
        try {
            await this.worldDb.put(new_world)
        } catch (err) {
            actions.setErrors(err)
        }
        actions.setSubmitting(false)
    }

    async addWorld(values, actions) {
        console.log(values)
        values['_id'] = shortid.generate()
        try {
            await this.worldDb.put(values)
        } catch (err) {
            console.log(err)
            actions.setErrors(err)
        }
        actions.selectConnection(false)
    }

    async closeConnection(args) {
        let world = await this.worldDb.get(args['world_id'])
        if (args['error']) {
            world.messages.unshift(args['error'])
        }
        world.connected = false
    }

    async selectWorld(world_id) {
        this.selectedWorld = await this.worldDb.get(world_id)
        if(!this.selectedWorld.connected){
            ipcRenderer.send('connectWorld', this.selectedWorld)
        }
    }
}

decorate(AppState, {
    selectedWorld: observable,
    worldDb: observable.ref,
    addMessage: action,
    addWorld: action,
    closeConnection: action,
    editWorld: action,
    selectWorld: action,
    sendData: action
})

let appState = new AppState()

export default appState