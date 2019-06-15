import React from 'react'
import { observer } from 'mobx-react'
import { NavLink } from 'react-router-dom'

import appState from '../store';

class ListWorlds extends React.Component {
  async componentDidMount(){
    await appState.updateWorlds()
  }

  render() {
    let worlds = []

    appState.worlds.forEach((world) => {
      world = world['world']
      let dest = `/${world['_id']}`
      let className=null
      if(world.connected){
        className="connected"
      }

      worlds.push(<li key={world['_id']}>
        <NavLink to={dest}>
          <span className={className}>
            {world['label']}
          </span>
        </NavLink>
      </li>)
    })

    return worlds
  }
}

export default observer(ListWorlds);
