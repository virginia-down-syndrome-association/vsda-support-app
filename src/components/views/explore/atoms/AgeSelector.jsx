import { useCallback, useState } from 'react'
import SliderView from 'semantic-ui-react-slider'

export default function AgeSelector() {
  const [minAge, setMinAge] = useState(0)
  const [maxAge, setMaxAge] = useState(100)

  const onAgeChange = useCallback((minAge, MaxAge) => {
    setMinAge(minAge)
    setMaxAge(MaxAge)
  }, [])

  return (
    <SliderView onSliderValuesChange={onAgeChange} sliderMinValue={0} sliderMaxValue={100} />
  )
}
