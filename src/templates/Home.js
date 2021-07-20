import React, { Component } from 'react'
import { Jumbotron, Container } from 'react-bootstrap';
import SignupButton from '../components/Buttons/SignupButton';
import LogoutButton from '../components/Buttons/LogoutButton';
import LoginButton from '../components/Buttons/LoginButton';
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
    state = {
        data: false
    };

    componentDidMount() {
        this.callBackendAPI()
            .then(res => this.setState({ data: `${res.ctx}` }))
            .catch(err => console.log(err));
    }
    callBackendAPI = async () => {
        const response = await fetch('/api/isauthenticated');
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message)
        }
        console.log(body)
        return body;
    };
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

                            {this.state.data === 'false' &&
                                <Col>
                                    <SignupButton />
                                </Col>}
                            {this.state.data === 'false' &&
                                <Col>
                                    <LoginButton />
                                </Col>}
                            {this.state.data === 'true' &&
                                <Col>
                                    <LogoutButton />
                                </Col>}
                        </Row>
                    </Container>
                </Jumbotron>
            </Styles>
        )
    }
}

export default Home
