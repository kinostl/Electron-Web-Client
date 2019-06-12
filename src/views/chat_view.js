import React from 'react'

import ListWorlds from '../components/list_worlds'
import ChatWindow from '../components/chat_window'

import { Link } from 'react-router-dom'

import "./chat_view.css"

class ChatView extends React.Component {
    render() {
        return (
            <div className="chatView">
                <nav>
                    <Link to="/settings">Settings</Link>
                </nav>
                <main>
                    <div className="worldsList">
                        <ListWorlds ></ListWorlds>
                    </div>
                    <div className="chatViewWindow">
                        <ChatWindow></ChatWindow>
                    </div>

                </main>
            </div>
        )
    }
}

export default ChatView;
