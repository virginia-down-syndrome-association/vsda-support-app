import { useEffect, useState, useCallback } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { agolItems } from '@/constants/appConfig'
import { queryFeatures } from '@esri/arcgis-rest-feature-service'
import useTokenHelper from '@/utilities/hooks/useTokenHelper'
import '../style.scss'

export default function ResearchSelector (props) {
  const { authentication } = useTokenHelper()
  const [options, setOptions] = useState([])

  const configureOptions = (features) => {
    const options = features.map(({ attributes }) => {
      return {
        key: attributes.OBJECTID,
        text: `${attributes.FirstName} ${attributes.LastName}`,
        value: attributes.OBJECTID
      }
    })
    setOptions(options)
  }

  const addParticipantData = useCallback(async () => {
    const fields = ['OBJECTID', 'FirstName', 'LastName']
    const { features } = await queryFeatures({
      url: agolItems.rest.constituents,
      f: 'json',
      outfields: fields,
      returnGeometry: true,
      authentication
    })
    configureOptions(features)
  })

  useEffect(() => {
    addParticipantData()
  }, [authentication])

  return (
    <>
      <Dropdown
        placeholder='Select Participant'
        search
        selection
        options={options}
      />
      {/* <SliderView onSliderValuesChange={handleChange} sliderMinValue={0} sliderMaxValue={90} /> */}
    </>
  )
}
