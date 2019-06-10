import React from 'react'

import ListWorlds from '../components/list_worlds'
import ChatWindow from '../components/chat_window'

class ChatView extends React.Component{
  render(){
    return (
        <div className="App">
        <div>
          <ListWorlds></ListWorlds>
        </div>
        <ChatWindow></ChatWindow>
      </div>
    )
  }
}

export default ChatView;
