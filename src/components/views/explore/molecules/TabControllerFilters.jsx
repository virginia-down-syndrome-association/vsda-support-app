
// import { useContext } from 'react'
// import { MapContext } from '@/contexts/MapContext'
import { Dropdown } from 'semantic-ui-react'
import '../style.scss'

export default function ExploreTabController (props) {
  // const { mapView } = useContext(MapContext)
  // invoke useEffects to update local data?
  // filters should both interact with map AND update local data
  const countryOptions = [
    { key: 'all', value: 'all', text: 'All Counties' },
    { key: 'fredericksburg', value: 'fredericksburg', text: 'City of Fredericksburg' },
    { key: 'stafford', value: 'stafford', text: 'Stafford' },
    { key: 'henrico', value: 'henrico', text: 'henrico' }
  ]

  return (
    <>
      <Dropdown placeholder='Select a county' selection search options={countryOptions} />
    </>
  )
}
