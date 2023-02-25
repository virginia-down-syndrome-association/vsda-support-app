
import { useContext } from 'react'
import { MapContext } from '@/contexts/MapContext'
import '../style.scss'

export default function ExploreTabController (props) {
  const { mapView } = useContext(MapContext)
  // invoke useEffects to update local data?
  // filters should both interact with map AND update local data

  return (
    <>
      <h2> View Program Participants across VA </h2>
      <div className='tab__container'>
        TabController Container
      </div>
    </>
  )
}
