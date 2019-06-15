import React from 'react'
import { observer } from 'mobx-react'
import { Formik, Form, Field } from 'formik'
import Ansi from 'ansi-to-react'

import appState from '../store'

import './chat_window.css'

class ChatWindow extends React.Component {
  componentDidMount() {
    console.log(this.props)
    appState.selectWorld(this.props.match.params.world_id)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.world_id !== this.props.match.params.world_id) {
      appState.selectWorld(this.props.match.params.world_id)
    }
  }

  render() {
    let displayMessages = []
    if (appState.selectedWorld) {
      console.log(appState.selectedWorld.messages)
      for (let appMessage of appState.selectedWorld.messages) {
        console.log(appMessage)
        displayMessages.push(
          <Ansi>
            {appMessage}
          </Ansi>
        )
      }
    }

    return (
      <div className="chatWindow">
        <div className="chatMessages">
          {displayMessages}
        </div>
        <div className="chatInput">
          <Formik
            initialValues={{ "message": "" }}
            onSubmit={appState.sendData}
            render={({ errors, status, touched, isSubmitting }) => (
              <Form>
                <Field name="message" type="text" />
              </Form>
            )}
          />
        </div>
      </div>
    )
  }
}

export default observer(ChatWindow)
