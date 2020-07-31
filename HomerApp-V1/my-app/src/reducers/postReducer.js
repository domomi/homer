import { 
    FETCH_SCHEDULED_VISITS, 

    SELECT_VIDEO, 

    UPDATE_VIDEO_UPLOAD_INFO,

    UPDATE_SELECTED_VIDEO, 

    SELECT_ROOMTYPE,

    SET_VIDEO_END_TIME, 

    SET_VIDEO_START_TIME, 

    SEEKBAR_CURRENT_TIME,

    UPDATE_VIDEO_SERIES_INFO,

    UPDATE_VIDEO_ORDER,

    SET_VIDEO_INFO,

    UPDATE_VIDEO_MAP_ORDER,

    AXIOS_POST_VIDEO_LISTING,

    AXIOS_FETCH_VIDEO_LISTING

} from '../actions/types'

import axios from "axios";
import $ from 'jquery'

const initialState = {
    // Profile page
    scheduled_visits: [],

    //blob link 
    selected_video: null,
    // obj array
    video_series_info: [],
    // bedroom / living / bath / kitchen
    selected_room_type: null,
    //The selected video file  
    selected_video: null,
    // when the video starts
    video_start_time: 0,
    // When the video ends
    video_end_time: 0,
    // 
    current_video_id : -1,
    // video map order
    video_map_order : [],

    archived_video_series_info : []

}


export default function (state = initialState, action) {
    switch (action.type) {
        // This is for fetching scheduled visists.
        case FETCH_SCHEDULED_VISITS:
            return {
                ...state,
                scheduled_visits: action.payload
            };
        case SELECT_VIDEO:
            return {
                ...state,
                selected_video: action.payload
            }
        case UPDATE_VIDEO_UPLOAD_INFO:
            return {
                ...state,
                video_series_info: action.payload,
            }
        case UPDATE_SELECTED_VIDEO:
            return {
                ...state,
                selected_video: action.payload
            }
        case SELECT_ROOMTYPE:
            return {
                ...state,
                selected_room_type: action.payload
            }
        // 
        case SET_VIDEO_START_TIME:
            // let video_series_info = state.video_series_info
            for(var el of state.video_series_info){
                console.log('el 60')
                console.log(el)
                if(el.selected_video == state.selected_video){
                    el.video_start_time = state.seek_bar_current_time
                }
                
            }

            return {
                ...state,
                // video_series_info: video_series_info
            }
        //  
        case SET_VIDEO_END_TIME:

            for(var el of state.video_series_info){
                console.log('el 60')
                console.log(el)
                console.log(action.payload)
                if(el.selected_video == state.selected_video){
                    if(action.payload){
                        el.video_end_time = action.payload
                    }
                    else{
                        el.video_end_time = state.seek_bar_current_time
                    }
                    
                }
            }
            return {
                ...state,
                video_end_time: action.payload
            }
        case SEEKBAR_CURRENT_TIME :
            return {
                ...state,
                seek_bar_current_time : action.payload
            }

        case UPDATE_VIDEO_SERIES_INFO :
            console.log(state)
            let video_map_order = state.video_map_order
            let video_series_info = state.video_series_info
            if(video_series_info){
                for(var index in video_series_info){
                    let el = video_series_info[index]
                    console.log(el)
                    for(var linkIdx in video_map_order){
                        let link = video_map_order[linkIdx]
                        console.log('link '+link)
                        if(link == el.selected_video){
                            console.log('haha')
                            console.log(video_series_info)
                            el.videoID = parseInt(linkIdx)
                            console.log(video_series_info)
                        }
                    }
                }
                return{
                    ...state,
                    video_series_info :  video_series_info
                }
            }

            


            // console.log(`${state.selected_room_type} ${state.video_start_time} ${state.video_end_time} ` )
            // console.log(action.payload)
           
            // let video_series_info = state.video_series_info
            // let {current_video_id,selected_room_type,selected_video,video_start_time,video_end_time} = state
            // console.log(`${selected_room_type} ${video_start_time} ` )
            
            // for(var item in video_series_info){ 
            //     console.log('video_series_info[item]')
            //     console.log(video_series_info[item])

            //     console.log('selected_video')
            //     console.log(selected_video)
            //     if(video_series_info[item].selected_video == selected_video){
            //         console.log("then")
            //         video_series_info.shift(video_series_info[item]).then(console.log(video_series_info))
            //     }

            // }
            
            // // 
            // video_series_info.push(
            //     {
            //         videoID : current_video_id,
            //         selected_room_type : selected_room_type,
            //         selected_video : selected_video,
            //         video_start_time : video_start_time,
            //         video_end_time : video_end_time
            //      }   
            // )
            // console.log('video_series_info')
            // console.log(video_series_info)
            break
        //When the videos are reordered      
        case UPDATE_VIDEO_ORDER:
            console.log(UPDATE_VIDEO_ORDER)
            console.log(action.payload)
            return{
                ...state,
                current_video_id : action.payload
            }

        //When the user first chooses a file. 
        case SET_VIDEO_INFO :
            console.log(SET_VIDEO_INFO)
            console.log(action.payload)
            let prevObjArr = state.video_series_info
            console.log('prevObjArr')
            console.log(prevObjArr)
             prevObjArr.push(action.payload)
            console.log('newObjArr')
            console.log(prevObjArr)
            return{
                ...state,
                video_series_info : prevObjArr
            }
        // An array that stores the video links ordered by the occurance
        case UPDATE_VIDEO_MAP_ORDER :

            console.log(UPDATE_VIDEO_MAP_ORDER)   
            console.log(action.payload) 

            return{
                ...state,
                video_map_order : action.payload
            }

        case AXIOS_POST_VIDEO_LISTING :
            console.log(AXIOS_POST_VIDEO_LISTING)
            let room_video_list = state.video_series_info
            axios.post(`${process.env.REACT_APP_EXPRESS_ENDPOINT}/submit_upload_info`,{data : room_video_list})
            return{
                ...state
            }
            
        case AXIOS_FETCH_VIDEO_LISTING :
            console.log(AXIOS_FETCH_VIDEO_LISTING)
            let user_email = action.payload
            console.log(user_email)
            let archived_video_series_info = null
            // $.ajax({
            //     type: "post",
            //     url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/view_upload_info`,
            //     data: {user_email : user_email},
            //     dataType: "json",
            //     success: function (response) {
            //         archived_video_series_info = response
            //         console.log(archived_video_series_info)
            //     }
            // });
         
                const response =  axios.post(`${process.env.REACT_APP_EXPRESS_ENDPOINT}/view_upload_info`, { user_email: user_email });
                console.log('👉 Returned data:', response);
     
      

            return {
                ...state,
                archived_video_series_info : response
            }
        default:
            return state;

        // case FETCH_POSTS: 
    }

} 
