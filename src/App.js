import React from 'react'
import {MemoryRouter, Route} from 'react-router-dom'
import ChatView from './views/chat_view'
import SettingsView from './views/settings_view'

class App extends React.Component{
  render(){
    return (
      <MemoryRouter>
        <Route path="/" component={ChatView}/>
        <Route path="/settings" component={SettingsView}/>
      </MemoryRouter>
      
    )
  }
}

export default App;
