//Change world details
//Delete world

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import {observer} from 'mobx-react'

import appState from '../store'

class EditWorld extends React.Component{
  render(){
    return (
      <Formik initialValues={appState.selectedConnection}
      onSubmit={appState.editWorld}
      render={({errors, status, touched, isSubmitting})=>(
      <Form>
        <header className="App-header">
          Add Character
        </header>
        <label htmlFor="label">Label</label>
        <Field name="label" type="text"/>
        <ErrorMessage name="label" />

        <label htmlFor="name">Login Name</label>
        <Field name="name" type="text"/>
        <ErrorMessage name="name" />
        <label htmlFor="password">Password</label>
        <Field name="password" type="password"/>
        <ErrorMessage name="name" />

        <label htmlFor="server_address">Server Address</label>
        <Field name="server_address" type="text"/>
        <ErrorMessage name="server_url" />
        <label htmlFor="server_port">Server Port</label>
        <Field name="server_port" type="text"/>
        <ErrorMessage name="server_port" />

        <button type="submit" disabled={isSubmitting}>
          Save
        </button>
        </Form>
      )}/>
    )
  }
}

export default observer(EditWorld);
