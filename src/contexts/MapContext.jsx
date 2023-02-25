import { createContext, useEffect, useState } from 'react'
// import { when } from '@arcgis/core/core/reactiveUtils'

export const MapContext = createContext(null)

const MapContextProvider = (props) => {
  const [mapView, setMapView] = useState(null)
  const [container, setContainer] = useState(null)
  const [ready, setReady] = useState(false)

  // call initView when the mapView is ready, and set the selection if its in the route
  useEffect(() => {
  }, [container])

  return (
    <MapContext.Provider
      value={{
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
