import { Dropdown } from 'semantic-ui-react'
import { useState } from 'react'
import '../style.scss'

export default function RangeSelector (props) {
  const [currentRange, setCurrentRange] = useState(0)
  const options = [
    { key: 0, text: 'No range set', value: 0 },
    { key: 1, text: '30 mins', value: 30 },
    { key: 2, text: '60 mins', value: 60 },
    { key: 3, text: '90 mins', value: 90 }
  ]

  return (
    <>
      <Dropdown
        style={{ marginLeft: '1rem' }}
        placeholder='Select Participant'
        search
        selection
        options={options}
        value={currentRange}
      />
    </>
  )
}
