import { Dropdown } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { setRace } from '@/store/reducers/filters'

export default function RaceSelector () {
  const dispatch = useDispatch()
  const { race } = useSelector(state => state.filters)

  const raceOptions = [
    { key: 'all', value: 'all', text: 'All Races' },
    { key: 'Hispanic', value: 'Hispanic', text: 'Hispanic' },
    { key: 'Not Hispanic', value: 'Not Hispanic', text: 'Not Hispanic' }
  ]

  return (
    <Dropdown
      labeled
      placeholder='Select a race'
      selection
      search
      options={raceOptions}
      value={race}
      onChange={(e, { value }) => dispatch(setRace(value))}
    />
  )
}
