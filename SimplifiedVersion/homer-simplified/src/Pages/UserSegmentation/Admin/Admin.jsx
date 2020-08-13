import React, { Component, Fragment } from 'react'
import { Typography, Button } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles";
import $ from 'jquery'
const styles = theme => ({
    root: {
        textAlign: 'center'
    },
    infoDiv: {

    },
    individualUserObject: {
        textAlign: 'left',
        borderStyle: 'outset'
    }
});

var classRef;
class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_obj_array: [],
            addMarkerBool: false,
            loadUserBool: false,
        }
        classRef = this

    }

    componentDidMount() {
        // Fetch User Data From the Backend
        $.ajax({
            type: "GET",
            url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/getUsers`,
            dataType: "json",
            success: function (response) {
                console.log(response)
                classRef.setState({ user_obj_array: response })
            }
        });

    }

    loadUsers() {
        console.log('%cLoad User Info', "color: red;font-family:system-ui; font-size : 15pt")
        classRef.setState({ loadUserBool: true, addMarkerBool : false })
    }

    addMarker() {
        console.log('%cAdd A Marker', "color: red;font-family:system-ui; font-size : 15pt")
        classRef.setState({ addMarkerBool: true, loadUserBool : false })
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Typography variant='h5' component='h3'>Welcome Back Admin</Typography>

                <div className={classes.buttonDiv}>
                    <Button onClick={() => this.loadUsers()}>Load Users</Button>
                    <Button onClick={() => this.addMarker()}>Add a marker</Button>
                </div>

                {this.state.loadUserBool &&
                    <div className={classes.infoDiv}>
                        {classRef.state.user_obj_array.map((user_obj, index) => (
                            // console.log(Object.entries(user_obj))
                            <div key={index} className={classes.individualUserObject}>
                                {/* { Object.entries(user_obj).map((field,i) => (<div>{field[0]+field[1]}</div>) )} */}
                                <div style={{ display: 'flex' }}><p>email: </p><p>{user_obj.email}</p></div>
                                <div style={{ display: 'flex' }}><p>user_role: </p><p>{user_obj.user_role}</p></div>
                                <div style={{ display: 'flex' }}><p>user_city: </p><p>{user_obj.user_city}</p></div>
                                <div style={{ display: 'flex' }}><p>name: </p><p>{user_obj.name}</p></div>
                                <div style={{ display: 'flex' }}><p>email_verified: </p><p>{user_obj.email_verified}</p></div>
                                <div style={{ display: 'flex' }}><p>picture: </p><img src={user_obj.email_verified} /></div>
                                <div style={{ display: 'flex' }}><p>selected_attributes: </p>
                                    <p>
                                        {/* {user_obj.selected_attributes[0] + user_obj.selected_attributes[1]} */}
                                    </p></div>
                            </div>
                        ))

                            // return(<div>{`${key}: ${value}`}</div>)


                            // <div key={index} className='user_obj_display'>
                            //     {user_obj.map((field, i) => <p>{field}</p>)}
                            // </div>

                        }
                    </div>}

                {this.state.addMarkerBool &&
                    <Fragment>
                        <div>New marker</div>
                        <form>
                            <input name='home_type_room_preference' type='text' placeholder='home_type_room_preference' />
                            <input name='room_preference' type='text' placeholder='room_preference' />
                            <input name='owner_email' type='text' placeholder='owner_email' />
                            <input name='lnglat' type='text' placeholder='lnglat' />
                            <input type='submit' value='+ Add marker' />
                        </form>

                    </Fragment>
                }


            </div>
        )
    }
}
export default withStyles(styles, { withTheme: true })(Admin)