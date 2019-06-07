import React from 'react';
import AddCharacter from './components/add_character'
import ListCharacters from './components/list_characters'
import ChatWindow from './components/chat_window'

class App extends React.Component{
  render(){
    return (
      <div className="App">
        <ChatWindow></ChatWindow>
        <ListCharacters></ListCharacters>
        <AddCharacter></AddCharacter>
      </div>
    )
  }
}

export default App;
