import React, { Component } from 'react';
import './App.css';

class App extends Component {
    state = {
        name: "",
        email: "",
        message: "",
        subject: "", 
        error: null,
        submitted: null
    }
    post = async (data) => {
        const { url } = data
        delete data.url
        const params = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        const response = await fetch(url, params);
        const res = await response.json()
        return res
    }
    insertFields = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submitForm = (e) => {
        e.preventDefault()
        const payload = {
            url: 'http://localhost:5000/api/contact',
            name: this.state.name,
            email: this.state.email,
            message: this.state.message,
            subject: this.state.subject
        }
        this.post(payload)
            .then(() => {
                this.setState({
                    error: null,
                    submitted: true
                })
            })
            .catch((err) => {
                this.setState({
                    error: err,
                    submitted: false
                })
            })
    }
    render() {
        return (
            <div className="App">
                <form method="POST" onSubmit={this.submitForm} >
                    <input type="text" value={this.state.name} placeholder="Name" onChange={this.insertFields} name="name" />
                    <input type="text" value={this.state.subject} placeholder="Subject" onChange={this.insertFields} name="subject" />
                    <input type="email" value={this.state.email} placeholder="Email" onChange={this.insertFields} name="email" />
                    <input type="textarea" value={this.state.message} placeholder="Message" onChange={this.insertFields} name="message" />
                    <input type="submit" name="submitform"/>
                </form>
            </div>
        );
    }
}

export default App;
