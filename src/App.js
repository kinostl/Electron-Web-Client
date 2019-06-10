import React from 'react'
import { Link, Switch, MemoryRouter, Route } from 'react-router-dom'
import ChatView from './views/chat_view'
import SettingsView from './views/settings_view'

class App extends React.Component {
  render() {
    return (
      <MemoryRouter>
        <nav>
          <li><Link to="/">Worlds</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </nav>
          <Route exact path="/" component={ChatView} />
          <Route path="/settings" component={SettingsView} />
      </MemoryRouter>
    )
  }
}

export default App;
