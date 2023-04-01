import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Extent from '@arcgis/core/geometry/Extent'
import WebMap from '@arcgis/core/WebMap'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  useRef,
  useEffect,
  useState
} from 'react'

// redux
import { useDispatch } from 'react-redux'
import { setMapView, clearMapView } from '@/store/reducers/map'
import { MapConfig } from '../../../../constants/appConfig'
import { type FeatureLayerConfig } from '../../../../constants/layerConfig'
import { handleLayerInstantiation, setBasemapGallery, addSearch, addLayerList, addLegend } from '@/utilities/maps'

import './MapViewComponent.scss'

type MapViewConsumers = 'plan' | 'analysis' | 'planning'

type MapViewComponentProps = {
  isWebMap: boolean
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
  const isWebMap = mapProps.portalItem != null
  const mapRef = !isWebMap ? useRef<Map>(new Map(mapProps)) : useRef<WebMap>(new WebMap(mapProps))

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
    return () => {
      dispatch(clearMapView())
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (view) {
      if (layers != null) handleLayerInstantiation(view, layers)
      setBasemapGallery(view)
      addSearch(view)
      addLayerList(view)
      addLegend(view)
    }
  }, [view])

  return (
    <>
      <div className="map__container" ref={mapContainer} />
    </>
  )
}
