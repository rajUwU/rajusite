import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
export default class SignupButton extends Component {
    render() {
        return (
            <div>
                <Button variant='secondary' href = 'http://localhost:5000/sign-up' >Sign up</Button>
            </div>
        )
    }
}
