import { Header, Card, Grid, Statistic } from 'semantic-ui-react'
import { calculateAgeFromTimestamp, getMonth } from '@/utilities/filters'
import { queryFeatures } from '@esri/arcgis-rest-feature-service'
import { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { schoolDistricts } from '@/constants/layerConfig'
import useTokenHelper from '@/utilities/hooks/useTokenHelper'
import '../style.scss'

export default function ProfileCard () {
  const { currentParticipant } = useSelector(state => state.research)
  const { authentication } = useTokenHelper()
  const [schoolDistrict, setSchoolDistrict] = useState(null)

  const getSchoolDistrict = useCallback(async (coordinates) => {
    const fields = ['NAME']
    const res = await queryFeatures({
      url: schoolDistricts.props.url,
      f: 'json',
      outfields: fields,
      returnGeometry: false,
      geometryType: 'esriGeometryPoint',
      geometry: {
        spatialReference: { wkid: 4326 },
        x: coordinates[1],
        y: coordinates[0]
      },
      spatialRel: 'esriSpatialRelIntersects',
      authentication
    })
    const { NAME } = res?.features[0]?.attributes
    setSchoolDistrict(NAME)
  })

  const calcStartDate = (timestamp) => {
    const date = new Date(timestamp)
    return `${getMonth(date)}/${date.getDate()}/${date.getFullYear()}`
  }

  useEffect(() => {
    if (currentParticipant) {
      const { coordinates } = currentParticipant
      getSchoolDistrict(coordinates)
    }
  }, [currentParticipant])

  return (
    <>{ currentParticipant &&
      <Card fluid>
        <Grid className='profileGrid' columns='4' divided >
          <Grid.Column className='gridColumn summary__container' width='3'>
            <Grid.Row>
              <Header as='h4' className='cardHeader'>{`${currentParticipant.FirstName} ${currentParticipant.LastName}`} </Header>
            </Grid.Row>
            <Grid.Row> {currentParticipant.Sex.toUpperCase()}</Grid.Row>
          </Grid.Column>
          <Grid.Column className='gridColumn' width='3'>
            <Statistic>
              <Statistic.Value>{calculateAgeFromTimestamp(currentParticipant.Birthdate)}</Statistic.Value>
              <Statistic.Label>Years Old</Statistic.Label>
            </Statistic>
          </Grid.Column>
          <Grid.Column className='locationSummary' width='9'>
            <Grid.Row className='rowSpan'>
              <Header as='h5' className='cardHeader' style={{ margin: '0px' }}> Constituent Number:</Header>
              <div>{currentParticipant.ConstituentNumber}</div>
            </Grid.Row>
            <Grid.Row className='rowSpan'>
              <Header as='h5' className='cardHeader' style={{ margin: '0px' }}> Family ID:</Header>
              <div>{currentParticipant.CF_FamilyID}</div>
            </Grid.Row>
            <Grid.Row className='rowSpan'>
              <Header as='h5' className='cardHeader summaryItem' style={{ margin: '0px' }}>Added to platform on: </Header>
              <div>{calcStartDate(currentParticipant.CreationDate)}</div>
            </Grid.Row>
            <Grid.Row className='rowSpan'>
              <Header as='h5' className='cardHeader' style={{ margin: '0px' }}>Zip: </Header>
              <div>{currentParticipant.PostalCode}</div>
            </Grid.Row>
            <Grid.Row className='rowSpan'>
              <Header as='h5' className='cardHeader' style={{ margin: '0px', whiteSpace: 'nowrap' }}>County: </Header>
              <div style={{ margin: '0px', whiteSpace: 'nowrap' }}>{ currentParticipant.County}</div>
            </Grid.Row>
            { schoolDistrict && <Grid.Row className='rowSpan'>
              <Header as='h5' className='cardHeader' style={{ margin: '0px', whiteSpace: 'nowrap' }}>School District: </Header>
              <div style={{ margin: '0px', whiteSpace: 'nowrap' }}>{ schoolDistrict }</div>
            </Grid.Row>}
          </Grid.Column>
        </Grid>
      </Card>}
    </>
  )
}
