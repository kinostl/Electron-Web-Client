import React from 'react';
import AddWorld from './components/add_world'
import ListCharacters from './components/list_characters'
import ChatWindow from './components/chat_window'

class App extends React.Component{
  render(){
    return (
      <div className="App">
        <ChatWindow></ChatWindow>
        <ListCharacters></ListCharacters>
        <AddWorld></AddWorld>
      </div>
    )
  }
}

export default App;
