import { Dropdown } from 'semantic-ui-react'
import { useState } from 'react'

export default function CountySelector () {
  const [currentCounty, setCurrentCounty] = useState('all')

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
      value={currentCounty}
      onChange={(e, { value }) => setCurrentCounty(value)}
    />
  )
}
