import $ from 'jquery'
import axios from "axios";
import {
    // Profile Posts
    FETCH_SCHEDULED_VISITS,
    // The selected video (blob link)
    SELECT_VIDEO,
    // root type
    SELECT_ROOMTYPE,
    // set video start time
    SET_VIDEO_START_TIME,
    SET_VIDEO_END_TIME,
    // SeekBar
    SEEKBAR_CURRENT_TIME,

    // Update the order of the videos
    UPDATE_VIDEO_ORDER,

    //holistic 
    UPDATE_VIDEO_SERIES_INFO,

    SET_VIDEO_INFO,

    // Mapped video info, link and videoID
    UPDATE_VIDEO_MAP_ORDER,

    // Axios post video listing
    AXIOS_POST_VIDEO_LISTING,

    // Axios fetch video listing
    AXIOS_FETCH_VIDEO_LISTING,

    // THE USER CHOOSES JUST ONE VIDEO
    UPLOAD_SINGLE_VIDEO_INFO,



} from './types';




// HomeOwnerMap
import { UPDATE_HOME_OWNER_MAP_STATUS } from './types'
import { FETCH_HOME_OWNER_MAP_STATUS } from './types'
import { UPDATE_DESCRIPTION} from './types'

// Scheduler Page
import { RENTER_VIEWS_A_POST , RENTER_SCHEDULE_VISIT } from './types'


export const renterPicksAPost = (post_id) => dispatch => {
    console.log('renterPicksAPost')
    console.log(post_id)
    dispatch({
        type : RENTER_VIEWS_A_POST,
        payload : {post_id}
    })
}







// The user chooses one video to upload
export const singleVideoUpload = (user_email, video_name) => dispatch => {
    console.log("singleVideoUpload()")
    console.log(user_email, video_name)
    dispatch({
        type: UPLOAD_SINGLE_VIDEO_INFO,
        payload: { user_email: user_email, video_name: video_name }
    })
}

// push status by email and the steps
export const updateHomeOwnerMapStatus = (user_email, home_owner_map_config_step) => dispatch => {
    console.log('updateHomeOwnerMapStatus()')
    console.log()
    dispatch({
        type: UPDATE_HOME_OWNER_MAP_STATUS,
        payload: {
            user_email : user_email,
            home_owner_map_config_step : home_owner_map_config_step
        }
    })
}

// get status by email
export const fetchHomeOwnerMapStatus = (user_email) => dispatch => {
    console.log('fetchHomeOwnerMapStatus')
    console.log('user_email')
    console.log(user_email)

        return axios.get(`${process.env.REACT_APP_EXPRESS_ENDPOINT}/HomeOwnerMapSteps/${user_email}`)
         .then(({ data }) => {
            console.log(data)
            dispatch({
                type : FETCH_HOME_OWNER_MAP_STATUS,
                payload: {
                    home_owner_map_config_step : data,
                }
            })
        });


}

export const updateDescription = (user_email,listing_description) => dispatch => {
    console.log('updateDescription()')
    console.log(user_email,listing_description)

    return axios.post(`${process.env.REACT_APP_EXPRESS_ENDPOINT}/updateDescription`,{user_email,listing_description})
    .then(({ data }) => {
       console.log(data)
       dispatch({
        type : UPDATE_DESCRIPTION,
        payload : {
            user_email : user_email,
            listing_description : listing_description
        }
    })
   });

}













// export const renterScheduleVisit = (renter_email, hash_tag_id, scheduled_time) => dispatch => {
//     console.log('renterScheduleVisit()')
//     console.log(renter_email, hash_tag_id, scheduled_time)
//     dispatch({
//         type: UPDATE_HOME_OWNER_MAP_STATUS,
//         payload: {renter_email, hash_tag_id, scheduled_time}
//     })
// }

// gets the schedule results
export const fireScheduleEvent = () => {
    
}



















export const fetchScheduledVisits = () => dispatch => {
    console.log('fetching')
    let user_token = { user_email: "jsteiner@domomi.com" }
    $.ajax({
        type: "post",
        url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/get_scheduled_visits`,
        data: user_token,
        dataType: "json",
        success: function (scheduled_visits) {
            console.log('scheduled_visits')
            console.log(scheduled_visits)
            dispatch({
                type: FETCH_SCHEDULED_VISITS,
                payload: scheduled_visits
            })
            // $.when(classRef.setState({ scheduled_visits: scheduled_visits })).
            //     then(() => { console.log(classRef.state) })
        }
    });
}


export const selectRoomType = (selected_room_type) => dispatch => {
    console.log('selected_room_type')
    console.log(selected_room_type)
    dispatch({
        type: SELECT_ROOMTYPE,
        payload: selected_room_type
    })
}



export const selectVideo = (selected_video) => dispatch => {
    console.log('selected_video')
    console.log(selected_video)

    dispatch({
        type: SELECT_VIDEO,
        payload: selected_video
    })
}

// GET a
export const setVideoStartTime = (video_start_time) => dispatch => {
    console.log('videoStartTime')
    console.log(video_start_time)

    dispatch({
        type: SET_VIDEO_START_TIME,
        payload: video_start_time
    })
}

export const setVideoEndTime = (video_end_time) => dispatch => {
    console.log('videoEndTime')
    console.log(SET_VIDEO_END_TIME)

    dispatch({
        type: SET_VIDEO_END_TIME,
        payload: video_end_time
    })
}

export const updateSeekBarCurrentTime = (seek_bar_current_time) => dispatch => {
    console.log('seek_bar_current_time')
    console.log(seek_bar_current_time)

    dispatch({
        type: SEEKBAR_CURRENT_TIME,
        payload: seek_bar_current_time
    })
}


export const updateVideoSeriesInfo = (videoID) => dispatch => {
    console.log("updateVideoSeriesInfo")

    dispatch({
        type: UPDATE_VIDEO_SERIES_INFO,
        payload: videoID
    })
}

export const updateVideoOrder = (videoID) => dispatch => {
    console.log('videoID')
    console.log(videoID)
    dispatch({
        type: UPDATE_VIDEO_ORDER,
        payload: videoID
    })
}

export const setVideoInfo = (videoInfoObj) => dispatch => {
    console.log('videoInfoObj')
    console.log(videoInfoObj)
    dispatch({
        type: SET_VIDEO_INFO,
        payload: videoInfoObj
    })
}

export const updateVideoMapOrder = (videoMapOrder) => dispatch => {
    console.log('videoMapOrder')
    console.log(videoMapOrder)
    dispatch({
        type: UPDATE_VIDEO_MAP_ORDER,
        payload: videoMapOrder
    })
}

export const axiosPostVideoListing = () => dispatch => {

    dispatch({
        type: AXIOS_POST_VIDEO_LISTING,
        payload: new Date()
    })
}

// Get the previous uploads by the user himself
export const axiosFetchVideoListing = (user_email) => dispatch => {

    dispatch({
        type: AXIOS_FETCH_VIDEO_LISTING,
        payload: user_email
    })
}


