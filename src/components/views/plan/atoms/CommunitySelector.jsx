import { Dropdown } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { setCG } from '@/store/reducers/filters'

export default function RaceSelector () {
  const dispatch = useDispatch()
  const { cg } = useSelector(state => state.filters)

  const cgOptions = [
    { key: 'all', value: 'all', text: 'All Community Groups' },
    { key: 'Greater Richmond', value: 'Greater Richmond', text: 'Greater Richmond' },
    { key: 'Greater Fredericksburg', value: 'Greater Fredericksburg', text: 'Greater Fredericksburg' }
  ]

  return (
    <Dropdown
      labeled
      placeholder='Select a Community Group'
      selection
      search
      options={cgOptions}
      value={cg}
      onChange={(e, { value }) => dispatch(setCG(value))}
    />
  )
}
