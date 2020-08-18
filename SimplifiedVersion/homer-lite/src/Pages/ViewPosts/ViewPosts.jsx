import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'

import {renterPicksAPost } from '../../actions/postActions'
import { Redirect } from 'react-router-dom';
const useStyles = makeStyles({
    post_array_items: {
        borderStyle: 'dotted',
    },
    video_display : {
        maxHeight : '35vh'
    }
})

function ViewPosts(props) {

    const [postArray, setPostArray] = useState([])
    const [redirectToSchedulerBool, setRedirectToScheduler] = useState(false)
    const classes = useStyles();

    useEffect(() => {
        $.ajax({
            type: "POST",
            // url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/fetchUserAlerts`,
            url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/fetchNewUpdates`,
            // data: data,
            dataType: "json",
            success: function (post_arr) {
                // alert array:
                console.log('post_arr array')
                console.log(post_arr)
                setPostArray(post_arr)
            }
        });
    }, [classes])


    const bookATour = (post_id) => {
        console.log('book a tour')
        props.renterPicksAPost(post_id)
        setRedirectToScheduler(true)
    }

    return (
        <div>
            {postArray.map((item, idx) => {
                return (<div className={classes.post_array_items}>
                    <div><p>Time: {item.update_time}</p></div>
                    <div><p>Event: {item.title}</p></div>
                    <div>Descriptions: {item.listing_description}</div>

                    {item.listing_videos[0] && 
                    <div >
                        <video className={classes.video_display} key={item.listing_videos[0]} controls  id="videoDisplay" style={{ maxWidth: '85vw' }}>
                            <source src={`${process.env.REACT_APP_EXPRESS_ENDPOINT}/fetchVideo/${item.listing_videos[0]}`} type="video/mp4" />
                        </video>

                    </div>}
                    <Button variant='contained' color='primary' onClick={()=>bookATour(item.update_time)} >Book a tour</Button>
                    {redirectToSchedulerBool && <Redirect to='/Scheduler'/>}
                </div>

                )
            })}
        </div>
    )
}

export default connect(null,{renterPicksAPost})(ViewPosts)
