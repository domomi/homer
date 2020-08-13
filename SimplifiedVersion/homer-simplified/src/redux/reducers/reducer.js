
const initialState = {
    radius: 0,
    current_location: null,
    tag_list: []
}


export const fetchUserObj = (user_obj) => dispatch => {
    console.log('FETCH_USER_OBJ')
    console.log('user_obj ' + user_obj)
    dispatch({
        type : 'FETCH_USER_OBJ',
        payload : user_obj
    })
}



export default function (state = initialState, action) {
    switch (action.type) {

        case 'FETCH_USER_OBJ':
            return {
                ...state,
                user_obj: action.payload
            }
            break;

        default:
            return {
                ...state,
                filter: action.payload
            }
    }
}