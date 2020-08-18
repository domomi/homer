import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { withAuth0 } from '@auth0/auth0-react';


 class UserSegmentation extends Component {
    constructor(props) {
        super(props)
        // 
        const { user } = props.auth0;
        console.log(user)

        this.state = {
            redirectToRenterBool: false,
            redirectToHomeOwnerBool: false,
        }
    }
    componentDidMount() {
        const { user } = this.props.auth0;
        console.log(user)

        // console.log('redirecting')
        // fetch('http://api.github.com/gists', {
        //     method: 'post',
        //     body: JSON.stringify(opts)
        // }).then(function (response) {
        //     return response.json();
        // }).then(function (data) {
        //     ChromeSamples.log('Created Gist:', data.html_url);
        // });
    }
    render() {
        const { user } = this.props.auth0;
        return (
            <div>
                Hello 
            </div>
        )
    }
}

export default withAuth0(UserSegmentation);