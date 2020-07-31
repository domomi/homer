import {STORE_PROFILE} from '../actions/types'

const initialState = {
    email : null,
    name : null,
    picture : null,
}

export default function(state = initialState, action){
    switch(action.type){
        
        case STORE_PROFILE :
            const {email,name,picture} = action.type;
            return{
                ...state,
                'email' : email,
                'name' : name,
                'picture' : picture
            }
    }
}
