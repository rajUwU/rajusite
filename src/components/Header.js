import styled from 'styled-components';
import { Navbar } from 'react-bootstrap'
import React, { Component } from 'react'

const Styles = styled.div`
    .navbar-brand {
        font-family: 'Syncopate', sans-serif;
    }
`;

export default class Header extends Component {
    render() {
        return (
            <Styles>
                <Navbar>
                    <Navbar.Brand href="#home">unbound Stack </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <a href="#login">Rajat Chauhan</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            </Styles>
        )
    }
}
