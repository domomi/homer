//  The resulting reducer calls every child reducer, 
//  and gathers their results into a single state object.
import { combineReducers } from 'redux'

import reducer from './reducers/reducer'

export default combineReducers({
    global_data : reducer
 })