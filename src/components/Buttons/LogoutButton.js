import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
export default class LogoutButton extends Component {
    render() {
        return (
            <div>
                <Button variant='warning' href='http://localhost:5000/v2/logout'>Logout</Button>
            </div>
        )
    }
}
