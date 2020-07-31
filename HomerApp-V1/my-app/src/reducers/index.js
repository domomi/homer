//  The resulting reducer calls every child reducer, 
//  and gathers their results into a single state object.
import { combineReducers } from 'redux'

import mapReducer from './mapReducer'
import postReducer from './postReducer'

export default combineReducers({
    posts: postReducer,
    mapBox: mapReducer
 })