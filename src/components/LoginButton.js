import React, { Component } from 'react'
import { Button } from 'react-bootstrap'; 

export class LoginButton extends Component {
    render() {
        return (
            <div>
                <Button variant='primary' href='http://localhost:5000/sign-up'>Login</Button>
            </div>
        )
    }
}

export default LoginButton
