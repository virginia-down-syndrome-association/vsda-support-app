import MapView from '@arcgis/core/views/MapView'
import Map from '@arcgis/core/WebMap'
import Extent from '@arcgis/core/geometry/Extent'
import { useRef, useState } from 'react'
import { useWatchEffect } from './useWatchEffect'
import { addContextStates } from '@/utilities/maps'
import { MapConfig } from '../constants/appConfig'
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
  useWatchEffect(
    () => mapViewRef.current.ready,
    (val) => {
      console.log(val) // this is falsy
      setMapView(mapViewRef.current)
    }
  )

  return mapView
}
