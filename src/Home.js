import React, { Component } from 'react'
import { Jumbotron, Container } from 'react-bootstrap';
import SignupButton from './components/SignupButton';
import LogoutButton from './components/LogoutButton';
import LoginButton from './components/LoginButton';
import styled from 'styled-components';

const Styles = styled.div`

    .jumbotron {
        z-index: 0;
        position: relative;
        overflow: hidden;
    }
    .container > img {
        z-index: -1;
        opacity: 1;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: auto;
    }
`;

const Col = styled.div`
    margin: 1em;
    .btn {
        padding: 1em 2em 1em 2em;;
    }
`;

const Row = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
`;

export class Home extends Component {
    if (isAuthenticated) {
        console.log('authenticated')
    }
    render() {
        return (
            <Styles>
                <Jumbotron fluid>
                    <Container>
                    <h1>Welcome!</h1>
                    <p>One stop shop for all technical writings..</p>
                        <img src='/img/home/jumbobg.jpg' alt=''>
                        </img>
                        <Row>
                            <Col>
                                <SignupButton />
                            </Col>
                            <Col>
                                <LoginButton />
                            </Col>
                            <Col>
                                <LogoutButton />
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
            </Styles>
        )
    }
}

export default Home
