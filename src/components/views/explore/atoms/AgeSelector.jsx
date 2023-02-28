import { useCallback } from 'react'
import SliderView from 'semantic-ui-react-slider'
import { useDispatch } from 'react-redux'
import { setAge } from '@/store/reducers/filters'

export default function AgeSelector () {
  const dispatch = useDispatch()

  const onAgeChange = useCallback((minAge, maxAge) => {
    dispatch(setAge({ minAge, maxAge }))
  }, [])

  // useEffect(() => {
  //   if (constituentsLayer) {
  //     const { minBirthDate, maxBirthDate } = translateAgeToDate(minAge, maxAge)
  //     // eslint-disable-next-line quotes
  //     const where = `Birthdate >= '${minBirthDate}' AND Birthdate <= '${maxBirthDate}'`
  //     console.log(where)
  //     constituentsLayer.filter = {
  //       where
  //     }
  //   }
  // }, [minAge, maxAge, constituentsLayer])

  return (
    <SliderView onSliderValuesChange={onAgeChange} sliderMinValue={0} sliderMaxValue={100} />
  )
}
