import React from 'react'
import { observer } from 'mobx-react'
import { NavLink } from 'react-router-dom'

import appState from '../store';

import './list_worlds.css'

class ListWorlds extends React.Component {
  async componentDidMount(){
    await appState.updateWorlds()
  }

  render() {
    let worlds = []

    appState.worlds.forEach((row) => {
      console.log(row)
      let world = row['world']
      let dest = `/${world['_id']}`
      let className=null
      if(row['connected']){
        className="connected"
      }

      worlds.push(<li key={world['_id']} className="world">
        <NavLink to={dest} activeClassName="selected" className={className}>
          <span>
            {world['label']}
          </span>
        </NavLink>
      </li>)
    })

    return worlds
  }
}

export default observer(ListWorlds);
