import {
    GET_STARTED,



    TEMPORARY_USER_TYPE_UPDATE,
    TEMPORARY_USER_INFO_UPDATE
} from './types'


// Get Started
export const getStarted = (user_name,user_role,user_city) => dispatch => {
    console.log(GET_STARTED)
    console.log('user_name, user_role,user_city')
    console.log(user_name, user_role,user_city)
    dispatch({
        type : TEMPORARY_USER_TYPE_UPDATE,
        payload : {user_name,user_role,user_city}
    })
}





// A temporary user's choice of being a renter/owner
export const updateTemporaryUserType = (type) => dispatch => {
    console.log(TEMPORARY_USER_TYPE_UPDATE)
    console.log('type ' + type)
    dispatch({
        type : TEMPORARY_USER_TYPE_UPDATE,
        payload : type
    })
}

// info fetched from https://geolocation-db.com/json/
export const updateTemporaryUserInfo = (info) => dispatch => {
    console.log(TEMPORARY_USER_INFO_UPDATE)
    console.log('info ' + info)
    
    dispatch({
        type : TEMPORARY_USER_INFO_UPDATE,
        payload : info
    })
}

