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
    AXIOS_FETCH_VIDEO_LISTING

} from './types';

import $ from 'jquery'
// export function fetchPosts() {
//     return function (dispatch) {

//     }
// }

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

export const axiosPostVideoListing = () => dispatch =>{
    
    dispatch({
        type : AXIOS_POST_VIDEO_LISTING,
        payload: new Date()
    })
}

// Get the previous uploads by the user himself
export const axiosFetchVideoListing = (user_email) => dispatch => {
    
    dispatch({
        type : AXIOS_FETCH_VIDEO_LISTING,
        payload : user_email
    })
}


