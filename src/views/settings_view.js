import React from 'react'

import AddWorld from '../components/add_world'
import EditWorld from '../components/edit_world'

import { observer } from 'mobx-react'

import { Link, Switch, MemoryRouter, Route } from 'react-router-dom'

import appState from '../store'

class App extends React.Component {
    render() {
        let worldOptions = [<li>
            <Link to="/add_world">Add World</Link>
        </li>]
        
        appState.allWorlds.forEach((value)=>{
            let destination = `/${value['_id']}`
            worldOptions.push(<li key={value['_id']}>
                <Link to={destination}>{value['label']}</Link>
            </li>
            )
        })

        return (
            <div>
            <Link to="/">Worlds</Link>
            <MemoryRouter>
                <ul>
                    {worldOptions}
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
