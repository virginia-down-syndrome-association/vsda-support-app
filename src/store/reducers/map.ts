// arcgis
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'

// types
type MapActionType = 'MAP_STATE_SET_MAPVIEW' | 'MAP_STATE_SET_MAP'
type MapAction = {
  payload: any
  type: MapActionType
}
type MapState = {
  map: Map | undefined
  view: MapView | undefined
}

// reducer
const mapStateInit: MapState = {
  map: undefined,
  view: undefined,
}
const mapReducer = (state = mapStateInit, action: MapAction) => {
  let newState: MapState = mapStateInit
  switch (action.type) {
    case 'MAP_STATE_SET_MAP':
      newState = {
        ...state,
        map: action.payload as Map,
      }
      return newState
    case 'MAP_STATE_SET_MAPVIEW':
      newState = {
        ...state,
        view: action.payload as MapView,
      }
      return newState
    default:
      return newState
  }
}
export default mapReducer

// actions
export const setMap = (map: Map): MapAction => ({
  payload: map,
  type: 'MAP_STATE_SET_MAP',
})

export const setMapView = (mapView: MapView): MapAction => ({
  payload: mapView,
  type: 'MAP_STATE_SET_MAPVIEW',
})
