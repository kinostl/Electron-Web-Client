import React from 'react'
import { observer } from 'mobx-react'
import { NavLink } from 'react-router-dom'

import appState from '../store';

class ListWorlds extends React.Component {
  constructor() {
    super()
    this.state = {
      "worlds": new Map()
    }
  }

  async updateList() {
    let worlds = await appState.worlds()
    this.setState({ "worlds": worlds })
  }

  async componentDidUpdate(){
    await this.updateList()
  }

  async componentDidMount() {
    await this.updateList()
  }

  render() {
    let worlds = []

    this.state.worlds.forEach((world) => {
      let dest = `/${world['_id']}`

      worlds.push(<li key={world['_id']}>
        <NavLink to={dest}>
          {world['label']}
        </NavLink>
      </li>)
    })

    return worlds
  }
}

export default observer(ListWorlds);
