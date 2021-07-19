import React, { Component } from 'react';
import styled from 'styled-components';

const Box = styled.div`
    position: relative;
    background: #000;
    width: 100%;
    bottom: 0;

`;

const Container = styled.div`
    diplay: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
`;
const Row = styled.div`

`;
const Column = styled.div`

`;
const Heading = styled.div`

`;
// const FooterLink = styled.div`

// `;
export class Footer extends Component {
    render() {
        return (
            <Box>
                <h1>unbound stack</h1>
                <Container>
                    <Row>
                        <Column>
                            <Heading>
                                Home
                        </Heading>
                        </Column>
                        <Column>
                            <Heading>
                                About
                        </Heading>
                        </Column>
                    </Row>
                </Container>
            </Box>
        )
    }
}

export default Footer
