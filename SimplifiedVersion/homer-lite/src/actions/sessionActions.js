import {STORE_PROFILE} from './types'

export const sessionUser = (user) => dispatch => {
    console.log('dispatching user object')
    console.log(user)
    dispatch({
        type : STORE_PROFILE,
        payload : user
    })
}