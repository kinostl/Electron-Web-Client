import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { observer } from 'mobx-react'

import appState from '../store'

class EditWorld extends React.Component {
    constructor() {
        super()
        this.state = {
            "world": {
                "_deleted": false
            }
        }
        this.updateForm = this.updateForm.bind(this)
    }

    updateForm(props) {
        appState.getWorldById(props.match.params.world_id).then((world) => {
            world['_deleted'] = false
            this.setState({
                "world": world
            })
        })

    }

    componentDidMount() {
        this.updateForm(this.props)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.world_id !== this.props.match.params.world_id) {
            console.log("Clip clop")
            this.updateForm(this.props)
        }
    }

    render() {
        return (
            <div>
            <Formik initialValues={this.state.world}
                enableReinitialize={true}
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

                        <label htmlFor="_deleted">Delete World</label>
                        <Field name="_deleted" type="checkbox" />
                        <ErrorMessage name="_deleted" />

                        <button type="submit" disabled={isSubmitting}>
                            Save
            </button>
                    </Form>

                )} />
                </div>
        )
    }
}

export default observer(EditWorld);
