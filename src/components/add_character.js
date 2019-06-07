import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import PouchDB from 'pouchdb-browser'
let characters = new PouchDB('characters')

class AddCharacter extends React.Component{
  render(){
    return (
      <Formik initialValues={{"name":""}}
      onSubmit={(values, actions)=>{
        values['_id']=values['label']
        characters.put(values).then(function(response){
          console.log("Character added")
          console.log(response)
          actions.setSubmitting(false)
        }).catch(function(err){
          actions.setSubmitting(false)
          actions.setErrors(err)
        })
      }}
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

        <label htmlFor="server_url">Server URL</label>
        <Field name="server_url" type="url"/>
        <ErrorMessage name="server_url" />
        <label htmlFor="server_port">Server Port</label>
        <Field name="server_port" type="text"/>
        <ErrorMessage name="server_port" />

        <button type="submit" disabled={isSubmitting}>
          Add
        </button>
        </Form>
      )}/>
    )
  }
}

export default AddCharacter;
