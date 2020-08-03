import React, { Fragment, Component } from 'react';
import Profile from './Profile/Profile'
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from './Profile/LogoutButton'
import ScheduledTours from './Profile/ScheduledTours' 


const styles = {
    avatarPic: {
        maxWidth: "25vw",
    }
}


export class ProfilePage extends Component {

    
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    render() {
 
        return (
            <Fragment>
         
                    <div>
                        <Profile />
                        <ScheduledTours />
                        <LogoutButton />
                    </div>

            </Fragment>



        )
    }

}

export default ProfilePage