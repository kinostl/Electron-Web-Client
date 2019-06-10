//Change world details
//Delete world

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { observer } from 'mobx-react'

import appState from '../store'

class EditWorld extends React.Component {

    constructor() {
        super()
        this.state = {
            "worlds": new Map([['add_world',{"label":'Add World'}]]),
            "selected_world": "add_world"
        }
    }

    componentDidMount() {
        appState.getAllWorlds().then((results) => {
            let rows = results['rows']
            let worlds = this.state.worlds
            worlds.set("add_world", "Add World")

            for (let row of rows) {
                let doc = row['doc']
                let id = doc['_id']
                worlds.set(id, doc)
            }

            this.setState({
                "worlds": worlds,
                "selected_world": "add_world"
            })
        })
    }

    render() {
        let worldOptions = []
        this.state.worlds.forEach((value) => {
            worldOptions.push(<option key={value['_id']}>{value['label']}</option>)
        })

        return (
            <div>
                <select>
                    {worldOptions}
                </select>
                <Formik initialValues={appState.selectedConnection}
                    onSubmit={appState.editWorld}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <header className="App-header">
                                Add Character
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
            </div>
        )
    }
}

export default observer(EditWorld);
