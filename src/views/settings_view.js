import React from 'react'

import AddWorld from '../components/add_world'
import EditWorld from '../components/edit_world'

//somehow get the list of pouchdb ones

class App extends React.Component{
  render(){
    return (
        <div className="App">
          <AddWorld></AddWorld>
          <EditWorld></EditWorld>
      </div>      
    )
  }
}

export default App;
