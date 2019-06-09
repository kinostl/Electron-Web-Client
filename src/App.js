import React from 'react';
import AddWorld from './components/add_world'
import ListWorlds from './components/list_worlds'
import ChatWindow from './components/chat_window'

class App extends React.Component{
  render(){
    return (
      <div className="App">
        <ChatWindow></ChatWindow>
        <ListWorlds></ListWorlds>
        <AddWorld></AddWorld>
      </div>
    )
  }
}

export default App;
