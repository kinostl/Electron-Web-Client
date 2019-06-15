import React from 'react'

import AddWorld from '../components/add_world'
import EditWorld from '../components/edit_world'
import ListWorlds from '../components/list_worlds'

import { observer } from 'mobx-react'

import { Link, NavLink, Switch, MemoryRouter, Route } from 'react-router-dom'

class App extends React.Component {
    render() {
        return (
            <div>
                <Link to="/">Worlds</Link>
                <MemoryRouter>
                    <ul>
                        <li><NavLink to="/add_world">Add World</NavLink></li>
                        <ListWorlds></ListWorlds>
                    </ul>
                    <Switch>
                        <Route path="/add_world" component={AddWorld} />
                        <Route path="/:world_id" component={EditWorld} />
                    </Switch>
                </MemoryRouter>
            </div>
        )
    }
}

export default observer(App);
