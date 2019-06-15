import React from 'react'

import ListWorlds from '../components/list_worlds'
import ChatWindow from '../components/chat_window'

import {observer} from 'mobx-react'

import { Link, MemoryRouter, Route } from 'react-router-dom'

import "./chat_view.css"

class ChatView extends React.Component {
    render() {
        return (
            <div className="chatView">
                <nav>
                    <Link to="/settings">Settings</Link>
                </nav>
                <main>
                    <MemoryRouter>
                        <ul className="worldsList">
                            <ListWorlds ></ListWorlds>
                        </ul>
                        <div className="chatWindow">
                            <Route path="/:world_id" component={ChatWindow} />
                        </div>
                    </MemoryRouter>
                </main>
            </div>
        )
    }
}

export default observer(ChatView)
