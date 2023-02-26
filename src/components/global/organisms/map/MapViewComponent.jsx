/* eslint-disable @typescript-eslint/consistent-type-imports */
import MapView from '@arcgis/core/views/MapView'
import {
  useRef,
  useEffect,
  useContext
} from 'react'
import Map from '@arcgis/core/WebMap'
import Extent from '@arcgis/core/geometry/Extent'
import { addContextStates } from '@/utilities/maps'
import { MapContext } from '@/contexts/MapContext'
import { MapConfig } from '@/constants/appConfig'
import './MapViewComponent.scss'

export default function MapViewComponent ({
  mapProps,
  mapViewProps
  // onMapViewLoad
}) {
  const { setMapView, setMap } = useContext(MapContext)

  const mapContainer = useRef(null)

  const mapOptions = {
    basemap: 'gray-vector',
    ...mapProps
  }

  const mapRef = useRef(new Map(mapOptions))

  const mapViewOptions = {
    ...mapViewProps,
    zoom: 7,
    extent: new Extent(MapConfig.extent),
    constraints: {
      geometry: new Extent(MapConfig.viewBounds),
      minZoom: MapConfig.minZoom
    }
  }

  // const [mapView, setMapView] = useState(null) // likely rudundant reference using prop

  const mapViewRef = useRef(
    new MapView({ ...mapViewOptions, map: mapRef.current })
  )

  useEffect(() => {
    mapRef.current.when(() => {
      setMap(mapRef.current)
    })
  }, [mapRef])

  useEffect(() => {
    mapViewRef.current.when(() => {
      setMapView(mapViewRef.current)
      addContextStates(mapRef.current)
    })
  }, [setMapView])

  useEffect(() => {
    if (mapContainer.current) {
      mapViewRef.current.container = mapContainer.current
    }
  }, [])

  return (
    <>
      <div className="map__container" ref={mapContainer} />
    </>
  )
}
