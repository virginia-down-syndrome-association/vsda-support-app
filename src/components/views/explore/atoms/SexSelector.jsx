import { Dropdown } from 'semantic-ui-react'
import { useState } from 'react'

export default function SexSelector () {
  const [currentSex, setCurrentSex] = useState('male')

  const sexOptions = [
    {
      key: 'all',
      text: 'All',
      value: 'all'
    },
    {
      key: 'male',
      text: 'Male',
      value: 'male'
    },
    {
      key: 'female',
      text: 'Female',
      value: 'female'
    }
  ]

  return (
    <Dropdown
      placeholder='Select sex'
      fluid
      selection
      options={sexOptions}
      value={currentSex}
      onChange={(e, { value }) => setCurrentSex(value)}
    />
  )
}
