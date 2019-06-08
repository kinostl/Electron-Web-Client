import {observable, action} from 'mobx'

let appState= observable({
  messages:[]
})

appState.addMessage = action(function addMessage(message){
    appState.messages.push(message)
})

export default appState