// It's for updating the radius of the beacon
import { UPDATE_RADIUS } from '../actions/types'
// The list of filter to be applied to the map
import { UPDATE_FILTER } from '../actions/types'
// 
import { GET_CURRENT_LOCATION } from '../actions/types'
import { CREATE_HASHTAG_MARKER } from '../actions/types'
import { UPDATE_HASHTAG_MARKER } from '../actions/types'
import { DELETE_HASHTAG_MARKER } from '../actions/types'
import {CHANGE_HASH_TAG_PICTURE} from '../actions/types'


const initialState = {
    radius: 0,
    current_location: null,
    tag_list: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_RADIUS:
            return {
                ...state,
                radius: action.payload
            }
            break;
        case UPDATE_FILTER:
        default:
            return {
                ...state,
                filter: action.payload
            }
        // Get the current location of the user
        // invoked when the user has clicked on the "get current location" button
        // FORMAT : [ARRAY] : [LNG,LAT] 
        case GET_CURRENT_LOCATION:
            console.log(GET_CURRENT_LOCATION)
            console.log(action.payload)

            return {
                ...state,
                current_location: action.payload
            }
        // When the <Marker /> is created, it's information is stored into the store.js
        case CREATE_HASHTAG_MARKER:
            console.log(CREATE_HASHTAG_MARKER)
            console.log(action.payload)
            let tag_list = state.tag_list
            tag_list.push(action.payload)
            console.log(state.tag_list)
            return {
                ...state,
                tag_list: tag_list
            }

        // When the marker is dragged to another place, its info is updated
        case UPDATE_HASHTAG_MARKER: {
            console.log(UPDATE_HASHTAG_MARKER)
            console.log(action.payload)
            let { markerType, location, id } = action.payload
            let tag_list_updated = state.tag_list

            // Search the id of the chosen one, and then update it's location.
            for (var item of tag_list_updated) {
                if (item.id == id) {
                    item.location = location
                    console.log('item.location bingo')
                    console.log(item.location)
                    console.log(state.tag_list)
                    return {
                        ...state,
                        tag_list: tag_list_updated
                    }
                }
            }
        }

        case DELETE_HASHTAG_MARKER: {
            console.log(DELETE_HASHTAG_MARKER)
            console.log(action.payload)
            let {id} = action.payload
            let tag_list_to_update = state.tag_list

            for (var item of tag_list_to_update) {
                if (item.id == id) {
                    console.log(tag_list_to_update)
                    tag_list_to_update.pop(item)
                    console.log(tag_list_to_update)
                    return {
                        ...state,
                        tag_list: tag_list_to_update
                    }
                }
            }
            return {
                ...state,
                tag_list: tag_list_to_update
            }
        }


    }
}