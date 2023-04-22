import { Accordion, Icon } from 'semantic-ui-react'
import { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { queryFeatures } from '@esri/arcgis-rest-feature-service'
import { schools, schoolDistricts } from '@/constants/layerConfig'
import useTokenHelper from '@/utilities/hooks/useTokenHelper'
import '../style.scss'

export default function EngagementCard () {
  const [activeIndex, setActiveIndex] = useState(0)
  const { currentParticipant } = useSelector(state => state.research)
  const [schoolDistrictGeometry, setSchoolDistrictGeometry] = useState(null)
  const [publicSchools, setSchools] = useState(null)
  const { authentication } = useTokenHelper()
 
  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    setActiveIndex(index)
  }

  const getSchoolDistrictGeometry = async(coordinates) => {
    const fields = ['NAME']
    const res = await queryFeatures({
      url: schoolDistricts.props.url,
      f: 'geojson',
      outfields: fields,
      returnGeometry: true,
      geometryType: 'esriGeometryPoint',
      geometry: {
        spatialReference: { wkid: 4326 },
        x: coordinates[1],
        y: coordinates[0]
      },
      spatialRel: 'esriSpatialRelIntersects',
      authentication
    })
    const { geometry } = res?.features[0]
    setSchoolDistrictGeometry(geometry)
  }

  const getSchools = useCallback(async (coordinates) => {
    const outfields = ['SchoolName']
    const geometry = {
      spatialReference: { wkid: 4326 },
      rings: schoolDistrictGeometry.coordinates
    }
    const res = await queryFeatures({
      url: schools.props.url,
      f: 'geojson',
      where: '1=1',
      outfields,
      returnGeometry: true,
      geometryType: 'esriGeometryPolygon',
      geometry,
      spatialRel: 'esriSpatialRelWithin',
      authentication
    })
    console.log(res)
    // const { NAME } = res?.features[0]?.attributes
    // setSchools(NAME)
  })

  useEffect(() => {
    if (currentParticipant && authentication) {
      const { coordinates } = currentParticipant
      if (!schoolDistrictGeometry) getSchoolDistrictGeometry(coordinates)
      if (schoolDistrictGeometry) {
        getSchools(coordinates)
      }
    }
  }, [currentParticipant, schoolDistrictGeometry, authentication])

  return (
    <>
      <div>
        <Accordion styled style={{ width: '100%' }}>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
            Public Schools
          </Accordion.Title>
          <Accordion.Content active={false}>
          </Accordion.Content>
          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
            Events (future)
          </Accordion.Title>
          <Accordion.Content active={false}>
            <div>county</div>
            <div>zip</div>
          </Accordion.Content>
        </Accordion>
      </div>
    </>
  )
}
