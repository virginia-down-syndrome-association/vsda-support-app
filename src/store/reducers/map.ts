/* eslint-disable indent */
// arcgis
import type MapView from '@arcgis/core/views/MapView'

// types
type MapActionType = 'MAP_STATE_SET_MAPVIEW'
type MapAction = {
  payload: any
  type: MapActionType
}

type ClearMapActionType = 'MAP_CLEAR_MAPVIEW'
type ClearMapAction = {
  type: ClearMapActionType
}

type MapState = {
  view: MapView | undefined | null
}

// reducer
const mapStateInit: MapState = {
  view: undefined
}
const mapReducer = (state = mapStateInit, action: MapAction | ClearMapAction) => {
  let newState: MapState = mapStateInit
  switch (action.type) {
    case 'MAP_STATE_SET_MAPVIEW':
      console.log('MAP_STATE_SET_MAPVIEW', action.payload)
      newState = {
        ...state,
        view: action.payload as MapView | null
      }
      return newState
    case 'MAP_CLEAR_MAPVIEW':
      newState = {
        ...state,
        view: null
      }
      return newState
    default:
      return newState
  }
}
export default mapReducer

// actions
export const setMapView = (mapView: MapView): MapAction => ({
  payload: mapView,
  type: 'MAP_STATE_SET_MAPVIEW'
})

export const clearMapView = () => ({
  type: 'MAP_CLEAR_MAPVIEW'
})
