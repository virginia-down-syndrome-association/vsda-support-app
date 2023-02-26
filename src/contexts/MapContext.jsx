import { createContext, useEffect, useState } from 'react'
// import { when } from '@arcgis/core/core/reactiveUtils'

export const MapContext = createContext(null)

const MapContextProvider = (props) => {
  const [map, setMap] = useState(null)
  const [mapView, setMapView] = useState(null)
  const [container, setContainer] = useState(null)
  const [ready, setReady] = useState(false)
  const [constituentsLayer, setConstituentsLayer] = useState(null)

  // call initView when the mapView is ready, and set the selection if its in the route
  useEffect(() => {
  }, [container])

  return (
    <MapContext.Provider
      value={{
        constituentsLayer,
        setConstituentsLayer,
        map,
        setMap,
        mapView,
        setMapView,
        container,
        setContainer,
        setReady,
        ready
      }}
    >
      {props.children}
    </MapContext.Provider>
  )
}

export default MapContextProvider
