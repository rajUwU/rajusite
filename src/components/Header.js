import styled from 'styled-components';
import { Navbar, Nav } from 'react-bootstrap'
import React, { Component } from 'react'


const Styles = styled.div`
    .navbar-brand {
        font-family: 'Syncopate', sans-serif;
    }
`;



export default class Header extends Component {
    state = {
        prefix: null,
        data: null
    };

    componentDidMount() {
        this.callBackendAPI()
            .then(res => this.setState({ data: res.ctx, prefix: 'Signed in as: '}))
            .catch(err => console.log(err));
    }
    callBackendAPI = async () => {
        const response = await fetch('/api/username');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };


    render() {
        return (
            <Styles>
                <Navbar>
                    <Navbar.Brand href="/">unbound Stack </Navbar.Brand>
                    <Nav.Link href='http://localhost:3000/profile'>
                    PROFILE
                    </Nav.Link>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>{this.state.prefix} <a href="/profile">{this.state.data} </a></Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            </Styles>
        )
    }
}
