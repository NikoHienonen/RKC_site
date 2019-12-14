import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: ""
        }
    }
    validateForm = () => {
        return this.state.name.length > 0 && this.state.password.length > 0;
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
    }
    render() { 
        return (  
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Käyttäjä</label>
                    <input type="text" name="name"
                    value={this.state.name} onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label>Salasana</label>
                    <input type="text" name="password"
                    value={this.state.password} onChange={this.handleChange}/>
                </div>
                <input type="submit" value="Kirjaudu" />
            </form>
        );
    }
}
 
export default Login;
