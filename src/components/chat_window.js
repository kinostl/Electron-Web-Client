import React from 'react'
import {observer} from 'mobx-react'
import { Formik, Form, Field } from 'formik'
import Ansi from 'ansi-to-react'

import appState from '../store'

import './chat_window.css'

class ChatWindow extends React.Component{

  render(){
    let displayMessages = []
    if(appState.selectedConnection){
      console.log(appState.selectedConnection.messages)
      for(let appMessage of appState.selectedConnection.messages){
        console.log(appMessage)
        displayMessages.push(
          <Ansi>
            {appMessage}
          </Ansi>
        )
      }
    }

    return (
      <div>
        <div className="message">
          {displayMessages}
        </div>
        <Formik initialValues={{ "message": "" }}
          onSubmit={appState.sendData}
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
