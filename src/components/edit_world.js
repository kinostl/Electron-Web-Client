import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { observer } from 'mobx-react'

import appState from '../store'

class EditWorld extends React.Component {
    constructor() {
        super()
        this.state={
            "loading":true,
            "world":{}
        }
    }

    componentDidMount(){
        console.log(this.props)
        if(this.state.loading){
            appState.getWorldById(this.props.match.params.world_id).then((world) => {
                console.log("Got world")
                this.setState({
                    "loading":false,
                    "world":world
                })
            })    
        }
    }

    render() {
        if(this.state.loading){
            return(
                <span>Loading world</span>
            )
        }else{
            return (
                <Formik initialValues={this.state.world}
                    onSubmit={appState.editWorld}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <header className="App-header">
                                Edit Character
            </header>
                            <label htmlFor="label">Label</label>
                            <Field name="label" type="text" />
                            <ErrorMessage name="label" />
    
                            <label htmlFor="name">Login Name</label>
                            <Field name="name" type="text" />
                            <ErrorMessage name="name" />
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" />
                            <ErrorMessage name="name" />
    
                            <label htmlFor="server_address">Server Address</label>
                            <Field name="server_address" type="text" />
                            <ErrorMessage name="server_url" />
                            <label htmlFor="server_port">Server Port</label>
                            <Field name="server_port" type="text" />
                            <ErrorMessage name="server_port" />
    
                            <button type="submit" disabled={isSubmitting}>
                                Save
            </button>
                        </Form>
    
                    )} />
            )
        }
    }
}

export default observer(EditWorld);
