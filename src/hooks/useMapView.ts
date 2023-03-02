import MapView from '@arcgis/core/views/MapView'
import Map from '@arcgis/core/WebMap'
import Extent from '@arcgis/core/geometry/Extent'
import { useEffect, useRef, useState } from 'react'
import { useWatchEffect } from './useWatchEffect'
import { addContextStates } from '@/utilities/maps'
import { MapConfig } from '../constants/appConfig'
import { whenOnce } from '@arcgis/core/core/reactiveUtils'
/**
 * Hook to create a MapView instance
 * @param mapProps The props to pass to the Map constructor
 * @param mapViewProps The props to pass to the MapView constructor
 * @returns The mapView instance
 */
export function useMapView (
  mapProps: ConstructorParameters<typeof Map>[0],
  mapViewProps: Exclude<__esri.MapViewProperties, 'map' | 'container'>
): MapView | undefined {
  const mapOptions = {
    basemap: 'gray-vector',
    ...mapProps
  }

  const mapViewOptions = {
    ...mapViewProps,
    zoom: 7,
    extent: new Extent(MapConfig.extent),
    constraints: {
      geometry: new Extent(MapConfig.viewBounds),
      minZoom: MapConfig.minZoom
    }
  }

  const mapRef = useRef<Map>(new Map(mapOptions))

  const [mapView, setMapView] = useState<MapView>()

  const mapViewRef = useRef<MapView>(
    new MapView({ ...mapViewOptions, map: mapRef.current })
  )

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  whenOnce(
    () => mapViewRef?.current?.ready)
    .then(() => {
      console.log('ready')
    })

  useWatchEffect(
    () => mapViewRef.current.ready,
    () => {
      setMapView(mapViewRef.current)
    }
  )

  return mapView
}
