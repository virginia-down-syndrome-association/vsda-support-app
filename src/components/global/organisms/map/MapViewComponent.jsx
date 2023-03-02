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
    console.log(mapview)
    if (mapview) {
      console.log(mapview)
      mapview.when(() => {
        console.log('mapview ready')
      })
    }
  }, [mapview])

  return (
    <>
      <div id="viewDiv" className='map__container' ref={mapContainer} />

    </>
  )
}
