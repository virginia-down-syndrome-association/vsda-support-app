import { Dropdown, Form } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { addIsochroneLayer, generateIsochrone } from '@/utilities/maps'
import '../style.scss'

export default function RangeSelector (props) {
  const { view } = useSelector(state => state.map)
  const { currentParticipant } = useSelector(state => state.research)
  const [currentRange, setCurrentRange] = useState(0)
  const options = [
    { key: 0, text: 'No range set', value: 0 },
    { key: 1, text: '30 mins', value: 30 },
    { key: 2, text: '60 mins', value: 60 },
    { key: 3, text: '90 mins', value: 90 }
  ]

  useEffect(() => {
    setCurrentRange(0)
  }, [currentParticipant])

  const handleChange = async (value) => {
    setCurrentRange(value)
    const cr = view?.map?.findLayerById('isochrone')
    if (cr) cr.destroy()
    if (value === 0) return

    const params = {
      lat: currentParticipant.coordinates[0],
      lng: currentParticipant.coordinates[1],
      travelTime: value
    }
    const results = await generateIsochrone(params)
    if (results && results.isochrone) addIsochroneLayer(results.isochrone)
  }

  return (
    <> { view && currentParticipant &&
        <Dropdown
          style={{ marginLeft: '1rem' }}
          placeholder='Select Participant'
          search
          selection
          options={options}
          value={currentRange}
          onChange={(e, { value }) => { handleChange(value) }}
        />
    }
    </>
  )
}
