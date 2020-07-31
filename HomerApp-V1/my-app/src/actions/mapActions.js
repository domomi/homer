import {UPDATE_RADIUS} from './types'
import {GET_CURRENT_LOCATION} from './types'
import {CREATE_HASHTAG_MARKER} from './types'
import {UPDATE_HASHTAG_MARKER} from './types'
import {DELETE_HASHTAG_MARKER} from './types'
import {CHANGE_HASH_TAG_PICTURE} from './types'

export const updateRadius = (newRadius) =>dispatch => {
    console.log("dispatch newRadius")
    console.log(newRadius)
    dispatch({
        type : UPDATE_RADIUS,
        payload :newRadius
    })
}

export const getCurrentLocation = (currentLocation) => dispatch => {
    console.log('currentLocation')
    console.log(currentLocation)
 
    dispatch({
        type : GET_CURRENT_LOCATION,
        payload :currentLocation
    })
}

// Markers are created with markerType, location(lnglat) id(timestamp)
export const createHashTagMarkers = (markerType,location,id) => dispatch => {
    console.log(markerType,location,id)
    dispatch({
        type : CREATE_HASHTAG_MARKER,
        payload :{markerType,location,id}
    })
}

// Markers are created with markerType, location(lnglat) id(timestamp)
export const updateHashTagMarkers = (markerType,location,id) => dispatch => {
    console.log(markerType,location,id)
    dispatch({
        type : UPDATE_HASHTAG_MARKER,
        payload : {markerType,location,id}
    })
}

// Remove marker
export const removeHashTagMarker = (id) => dispatch => {
    console.log('removeHashTagMarker')
    console.log(id)
    dispatch({
        type : DELETE_HASHTAG_MARKER,
        payload : {id: id}
    })
}

export const changeHashTagPicture = (id) => dispatch => {
    console.log('changeHashTagPicture')
    console.log(id)
    dispatch({
        type :  CHANGE_HASH_TAG_PICTURE,
        payload : {id : id}
    })
}





