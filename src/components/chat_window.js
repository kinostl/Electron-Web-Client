import React from 'react'
import {observer} from 'mobx-react'
import { Formik, Form, Field } from 'formik'
import Ansi from 'ansi-to-react'

import appState from '../store'

import './chat_window.css'

const {ipcRenderer} = window.require('electron')

class ChatWindow extends React.Component{

  render(){
    let displayMessages = []
    for(let appMessage of appState.messages){
      displayMessages.push(
        <Ansi>
          {appMessage}
        </Ansi>
      )
    }
    return (
      <div>
        <div className="message">
          {displayMessages}
        </div>
        <Formik initialValues={{ "message": "" }}
          onSubmit={(values, actions) => {
            ipcRenderer.send('send-message',values['message'])
          }}
          render={({errors, status, touched, isSubmitting})=>(
            <Form>
              <Field name="message" type="text"/>
            </Form>
          )}
        />
      </div>
    )
  }
}

export default observer(ChatWindow)
