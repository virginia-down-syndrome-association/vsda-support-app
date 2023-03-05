import Map from '@arcgis/core/WebMap'
import MapView from '@arcgis/core/views/MapView'
import Extent from '@arcgis/core/geometry/Extent'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  useRef,
  useEffect,
  createContext,
  useState
} from 'react'
import { MapConfig } from '../../../../constants/appConfig'
import './MapViewComponent.scss'

export const MapContext = createContext<MapView | undefined>(new MapView())

type MapViewComponentProps = {
  mapProps: __esri.WebMapProperties
  mapViewProps: __esri.MapViewProperties
  onMapViewLoad?: (map: MapView) => void
}

export default function MapViewComponent ({
  mapProps,
  mapViewProps,
  onMapViewLoad
}: MapViewComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<Map>(new Map(mapProps))

  const [mapView, setMapView] = useState<MapView>()

  const mapViewOptions = {
    ...mapViewProps,
    zoom: 7,
    extent: new Extent(MapConfig.extent),
    constraints: {
      geometry: new Extent(MapConfig.viewBounds),
      minZoom: MapConfig.minZoom
    },
    map: mapRef.current
  }
  const mapViewRef = useRef<MapView>(
    new MapView(mapViewOptions)
  )

  useEffect(() => {
    void mapViewRef.current.when(() => {
      setMapView(mapViewRef.current)
      onMapViewLoad?.(mapViewRef.current)
      console.log('mapViewRef.current', mapViewRef.current)
    })
  }, [onMapViewLoad])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (mapContainer.current) {
      mapViewRef.current.container = mapContainer.current
    }
  }, [])

  return (
    <MapContext.Provider value={mapView}>
      <div className="map__container" ref={mapContainer} />
    </MapContext.Provider>
  )
}
