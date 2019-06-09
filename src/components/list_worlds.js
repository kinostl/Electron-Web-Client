import React from 'react'
import {observer} from 'mobx-react'

import appState from '../store';

class ListWorlds extends React.Component{



  render(){
    let worlds = []
    let connections = []

    appState.connections.forEach((connection)=>{
      connections.push(<li key={connection['world']['_id']}>
        <button onClick={(e)=>appState.selectConnection(connection)}>
          {connection['world']['label']} [Connected]
        </button>
      </li>)
    })

    appState.worlds.forEach((world)=>{
      worlds.push(<li key={world['_id']}>
          <button onClick={(e)=> appState.connectWorld(world)}>
            {world['label']}
          </button>
      </li>)
    })

    return (
      <div>
        <ul>
          {connections}
        </ul>
        <ul>
          {worlds}
        </ul>
      </div>
    )
  }
}

export default observer(ListWorlds);
