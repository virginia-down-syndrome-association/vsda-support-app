import { Dropdown } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { setCounty } from '@/store/reducers/filters'

export default function CountySelector () {
  const dispatch = useDispatch()
  const { county } = useSelector(state => state.filters)

  // TODO: Get county options from the API
  const countryOptions = [
    { key: 'all', value: 'all', text: 'All Counties' },
    { key: 'fredericksburg', value: 'fredericksburg', text: 'City of Fredericksburg' },
    { key: 'stafford', value: 'stafford', text: 'Stafford' },
    { key: 'henrico', value: 'henrico', text: 'henrico' }
  ]

  return (
    <Dropdown
      labeled
      placeholder='Select a county'
      selection
      search
      options={countryOptions}
      value={county}
      onChange={(e, { value }) => dispatch(setCounty(value))}
    />
  )
}
