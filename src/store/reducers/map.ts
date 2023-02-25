/* eslint-disable indent */
// arcgis
import type MapView from '@arcgis/core/views/MapView'

// types
type MapActionType = 'MAP_STATE_SET_MAPVIEW'
type MapAction = {
  payload: any
  type: MapActionType
}
type MapState = {
  view: MapView | undefined
}

// reducer
const mapStateInit: MapState = {
  view: undefined
}
const mapReducer = (state = mapStateInit, action: MapAction) => {
  let newState: MapState = mapStateInit
  switch (action.type) {
    case 'MAP_STATE_SET_MAPVIEW':
      newState = {
        ...state,
        view: action.payload as MapView
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
