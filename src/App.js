import React from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import ChatView from './views/chat_view'
import SettingsView from './views/settings_view'

import './App.css'

class App extends React.Component {
  render() {
    return (
      <MemoryRouter>
          <Route exact path="/" component={ChatView} />
          <Route exact path="/settings" component={SettingsView} />
      </MemoryRouter>
    )
  }
}

export default App;
