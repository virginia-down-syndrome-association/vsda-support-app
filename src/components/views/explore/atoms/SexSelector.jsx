import { Dropdown } from 'semantic-ui-react'
import { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSex } from '@/store/reducers/filters'
import { MapContext } from '@/contexts/MapContext'

export default function SexSelector () {
  const dispatch = useDispatch()
  const { constituentsLayer } = useContext(MapContext)
  const { sex } = useSelector(state => state.filters)

  useEffect(() => {
    if (constituentsLayer) {
      if (sex === 'male' || sex === 'female') {
        constituentsLayer.filter = {
          // eslint-disable-next-line quotes
          where: `Sex = '${sex}'`
        }
      } else {
        constituentsLayer.filter = null
      }
    }
  }, [sex, constituentsLayer])

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
