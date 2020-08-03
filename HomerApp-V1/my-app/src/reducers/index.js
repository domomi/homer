//  The resulting reducer calls every child reducer, 
//  and gathers their results into a single state object.
import { combineReducers } from 'redux'

import mapReducer from './mapReducer'
import postReducer from './postReducer'
import profileReducer from './profileReducer'

export default combineReducers({
    posts: postReducer,
    mapBox: mapReducer,
    profile : profileReducer,
 })