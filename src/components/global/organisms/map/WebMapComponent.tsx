import Map from '@arcgis/core/WebMap'
import MapView from '@arcgis/core/views/MapView'
import Extent from '@arcgis/core/geometry/Extent'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  useRef,
  useEffect,
  useState
} from 'react'

// redux
import { useDispatch } from 'react-redux'
import { setMapView } from '@/store/reducers/map'
import { MapConfig } from '../../../../constants/appConfig'
import { type FeatureLayerConfig } from '../../../../constants/layerConfig'
import { handleLayerInstantiation, setBasemapGallery, addSearch } from '@/utilities/maps'

import './MapViewComponent.scss'

type MapViewConsumers = 'explore' | 'analysis' | 'planning'

type MapViewComponentProps = {
  mapProps: __esri.WebMapProperties
  mapViewProps: __esri.MapViewProperties
  mapConsumer?: MapViewConsumers
  layers?: FeatureLayerConfig[]
}

export default function MapViewComponent ({
  mapProps,
  mapViewProps,
  mapConsumer,
  layers
}: MapViewComponentProps) {
  const dispatch = useDispatch()
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<Map>(new Map(mapProps))

  const [view, setView] = useState<MapView>()

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
      setView(mapViewRef.current)
      dispatch(setMapView(mapViewRef.current))
    })
  }, [mapConsumer])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (mapContainer.current) {
      mapViewRef.current.container = mapContainer.current
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (view) {
      if (layers != null) handleLayerInstantiation(view, layers)
      setBasemapGallery(view)
      addSearch(view)
    }
  }, [view])

  return (
    <>
      <div className="map__container" ref={mapContainer} />
    </>
  )
}
