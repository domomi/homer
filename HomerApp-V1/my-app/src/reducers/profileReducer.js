import {STORE_PROFILE,
        // Used in the User Segmentation Page.
        TEMPORARY_USER_TYPE_UPDATE,
        TEMPORARY_USER_INFO_UPDATE
    } from '../actions/types'

const initialState = {
    email : null,
    name : null,
    picture : null,


    // Used in the User Segmentation Page
    // 'temporary'/'registered'
    user_type : null,


    // Used in the User Segmentation Page,
    // updated when the user clicks on the 'select' button.
    temp_user_info : null,


    // defines the user's role
    // Can be a 'renter'/'owner'
    user_category : null,
}

export default function(state = initialState, action){
    switch(action.type){
        
        case STORE_PROFILE :{
            const {email,name,picture} = action.type;
            return{
                ...state,
                'email' : email,
                'name' : name,
                'picture' : picture
            }
        }
        // 
        case TEMPORARY_USER_TYPE_UPDATE : {
            console.log(TEMPORARY_USER_TYPE_UPDATE)
            console.log(action.payload)
            return{
                ...state,
                user_type : 'temporary',
                user_category : action.payload
            }
        }

        case TEMPORARY_USER_INFO_UPDATE : {
            console.log(TEMPORARY_USER_INFO_UPDATE)
            console.log(action.payload)

            return{
                ...state,
                temp_user_info : action.payload
            }
        }
        default:
            return state;
          
    }
}
