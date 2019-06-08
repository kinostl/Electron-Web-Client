import React from 'react'
import {observer} from 'mobx-react'
import appState from '../store'

import './chat_window.css'

import Ansi from 'ansi-to-react'

class ChatWindow extends React.Component{

  render(){
    let displayMessages = []
    for(let appMessage of appState.messages){
      console.log(appMessage)
      displayMessages.push(
        <Ansi className="message">
          {appMessage}
        </Ansi>
      )
    }
    return (
      <div>
        {displayMessages}
      </div>
    )
  }
}

export default observer(ChatWindow)
