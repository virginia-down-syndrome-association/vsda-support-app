/* eslint-disable @typescript-eslint/consistent-type-imports */
import {
  useRef,
  useEffect
} from 'react'
import { useMapView } from '@/hooks/useMapView'
import './MapViewComponent.scss'

export default function MapViewComponent ({
  mapProps,
  mapViewProps
  // onMapViewLoad
}) {
  const mapContainer = useRef(null)

  const mapview = useMapView(
    mapProps,
    {
      ...mapViewProps,
      container: mapContainer.current
    }
  )

  useEffect(() => {
    if (mapview && mapview.ready) {
      console.log('Currently unreachable.')
    }
  }, [mapview])

  return (
    <>
      <div id="viewDiv" className='map__container' ref={mapContainer} />

    </>
  )
}
