import { useCallback } from 'react'
import SliderView from 'semantic-ui-react-slider'
import { useDispatch, useSelector } from 'react-redux'
import { setAge } from '@/store/reducers/filters'

export default function AgeSelector () {
  const dispatch = useDispatch()

  const onAgeChange = useCallback((minAge, maxAge) => {
    dispatch(setAge({ minAge, maxAge }))
  }, [])

  return (
    <SliderView onSliderValuesChange={onAgeChange} sliderMinValue={0} sliderMaxValue={100} />
  )
}
