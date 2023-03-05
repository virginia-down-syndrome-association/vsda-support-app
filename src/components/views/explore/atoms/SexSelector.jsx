import { Dropdown } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { setSex } from '@/store/reducers/filters'

export default function SexSelector () {
  const dispatch = useDispatch()
  const { sex } = useSelector(state => state.filters)

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
      value={sex}
      onChange={(e, { value }) => dispatch(setSex(value))}
    />
  )
}
