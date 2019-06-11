import React from 'react'

import AddWorld from '../components/add_world'
import EditWorld from '../components/edit_world'

import { Link, Switch, MemoryRouter, Route } from 'react-router-dom'

import appState from '../store'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            "worlds": []
        }
    }
    componentDidMount() {
        let worlds = []
        appState.getAllWorlds().then((results) => {
            for (let world of results['rows']) {
                worlds.push(world['doc'])
            }

            this.setState({
                "worlds": worlds
            })
        })
    }
    render() {
        let worldOptions = [<li>
            <Link to="/settings/add_world">Add World</Link>
        </li>]
        
        this.state.worlds.forEach((value) => {
            let destination = `/settings/${value['_id']}`
            worldOptions.push(<li key={value['_id']}>
                <Link to={destination}>{value['label']}</Link>
            </li>
            )
        })

        return (
            <MemoryRouter>
                <ul>
                    {worldOptions}
                </ul>
                <Switch>
                    <Route path="/settings/add_world" component={AddWorld} />
                    <Route path="/settings/:world_id" component={EditWorld} />
                </Switch>
            </MemoryRouter>
        )
    }
}

export default App;
