import { Accordion, CardDescription, Icon, List, Card } from 'semantic-ui-react'
import { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { queryFeatures } from '@esri/arcgis-rest-feature-service'
import { schools, schoolDistricts, events } from '@/constants/layerConfig'
import useTokenHelper from '@/utilities/hooks/useTokenHelper'
import '../style.scss'

const EventCard = ({ id, event }) => {
  console.log(id)
  console.log(event)
  return (
    <List.Item key={id} className="" onClick={() => {}}>
      <Card fluid className=''>
        <Card.Content>
          <Card.Header className='cardHeader'>{event.name}</Card.Header>
          <Card.Meta>Description: {event.description}</Card.Meta>
          <Card.Meta>Starting at: {event.startDate}</Card.Meta>
          <Card.Meta>Description: {event.description}</Card.Meta>
          <Card.Meta>Starting at: {event.startDate}</Card.Meta>
          <Card.Meta>Description: {event.description}</Card.Meta>
          <Card.Meta>Starting at: {event.startDate}</Card.Meta>
          <Card.Meta>Description: {event.description}</Card.Meta>
          <Card.Meta>Starting at: {event.startDate}</Card.Meta>
          {/* <Card.Meta>Closing around: {event.endDate}</Card.Meta> */}
        </Card.Content>
      </Card>
    </List.Item>
  )
}

export default function EngagementCard() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { currentParticipant } = useSelector(state => state.research)
  const [schoolDistrictGeometry, setSchoolDistrictGeometry] = useState(null)
  const [publicSchools, setSchools] = useState(null)
  const [evts, setEvents] = useState(null)
  const { authentication } = useTokenHelper()

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    setActiveIndex(index)
  }

  const getSchoolDistrictGeometry = async (coordinates) => {
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
      f: 'json',
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
        // getSchools(coordinates)
      }
    }
  }, [currentParticipant, schoolDistrictGeometry, authentication])




  const getEvents = useCallback(async () => {
    const outfields = ['name', 'start_date', 'description']
    const today = new Date().toISOString().slice(0, 10)
    const where = `start_date >= timestamp '${today}'`

    const res = await queryFeatures({
      url: events.props.url,
      f: 'geojson',
      where,
      outfields,
      returnGeometry: true,
      authentication
    })

    const data = res?.features.map(({ properties, geometry }) => {
      return {
        name: properties.name,
        description: properties.description,
        startDate: new Date(properties.start_date).toLocaleString(),
        endDate: new Date(properties.end_date).toLocaleString(),
        coordinates: geometry.coordinates
      }
    })
    setEvents(data)
  })

  useEffect(() => {
    if (!authentication) return
    const data = getEvents()
    setEvents(data)
  }, [authentication])


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
            Public Schools (within current school district)
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
          </Accordion.Content>
          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
            Events (future)
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            {evts?.length && evts.map(event => (
              <EventCard key={event.id} event={event} />
            ))
            }
          </Accordion.Content>
        </Accordion>
      </div>
    </>
  )
}
