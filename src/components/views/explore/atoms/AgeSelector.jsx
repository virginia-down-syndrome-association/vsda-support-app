import { useCallback, useEffect, useContext } from 'react'
import SliderView from 'semantic-ui-react-slider'
import { useDispatch, useSelector } from 'react-redux'
import { setAge } from '@/store/reducers/filters'
import { MapContext } from '@/contexts/MapContext'

export default function AgeSelector () {
  const dispatch = useDispatch()
  const { constituentsLayer } = useContext(MapContext)
  const { minAge, maxAge } = useSelector(state => state.filters)

  const onAgeChange = useCallback((minAge, maxAge) => {
    dispatch(setAge({ minAge, maxAge }))
  }, [])

  useEffect(() => {
    if (constituentsLayer) {
      constituentsLayer.filter = {
        // eslint-disable-next-line quotes
        where: `Age >= ${minAge} AND Age <= ${maxAge}`
      }
    }
  }, [minAge, maxAge, constituentsLayer])

  return (
    <SliderView onSliderValuesChange={onAgeChange} sliderMinValue={1990} sliderMaxValue={2020} />
  )
}
