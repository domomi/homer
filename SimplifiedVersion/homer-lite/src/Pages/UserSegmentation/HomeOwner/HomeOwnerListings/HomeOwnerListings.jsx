import React, { Fragment, useState, useEffect } from 'react'
import $ from 'jquery'
import store from '../../../../redux/store'
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles((theme) => ({
    LoginBtn: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '15vh'
    },
    listRenderItem: {

    }

}))


// import 
export default function HomeOwnerListings() {
    const [url_arr, setURLarr] = useState([])

    const {
        isAuthenticated,
        // loginWithRedirect,
        user
      } = useAuth0();


    useEffect(() => {
       
        let data = { user: user }
        console.log(url_arr)
        $.when().then(
            () => {

                $.ajax({
                    type: "POST",
                    url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/getUserWholeProfile`,
                    data: data,
                    dataType: "JSON",
                    success: function (response) {
                        console.log('response.files_uploaded_name_array')
                        console.log(response.files_uploaded_name_array)
                        setURLarr(response.files_uploaded_name_array)
                    }
                })
            }
        )
    }, [user])

    const classes = useStyles();

    return (
        <Fragment>
            <div>
                <div>These are your posted videos:</div>


                <div id='video-array-list-render' >

                    {url_arr.map((url, idx) => (
                        <div className={classes.listRenderItem}>
                            <video key={url} controls autoPlay id="videoDisplay" style={{ maxWidth: '85vw' }}>
                                <source src={`${process.env.REACT_APP_EXPRESS_ENDPOINT}/fetchVideo/${url}`} type="video/mp4" />
                            </video>
                        </div>
                    ))

                    }

                </div>

            </div>
        </Fragment>

    )
}
