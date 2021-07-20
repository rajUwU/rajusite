import React, { Component } from 'react'

export default class Profile extends Component {
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
            <div>
                LMAO
            </div>
        )
    }
}
