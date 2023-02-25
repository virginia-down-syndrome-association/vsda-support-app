// react
import * as React from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { setMap, setMapView } from '@/store/reducers/map'
import { RootState } from '@/store/index'

// style
import './MapContainer.css'

const MapContainer: React.FC = () => {
  // global state
  const globalStateMap = useSelector((state: RootState) => state.map.map)
  const globalStateMapView = useSelector((state: RootState) => state.map.view)
  const dispatch = useDispatch()

  // append map to map container DOM element
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    // if (ref.current && view) view.container = ref.current
  }, [ref])

  return (
    <>
      <div className='mapContainer' ref={ref} />
    </>
  )
}
export default MapContainer
