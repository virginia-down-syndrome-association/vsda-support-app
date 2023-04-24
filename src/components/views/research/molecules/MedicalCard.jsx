import { Accordion, Icon, Card } from 'semantic-ui-react'
import { useCallback, useState, useEffect } from 'react'
import { queryFeatures } from '@esri/arcgis-rest-feature-service'
import useTokenHelper from '@/utilities/hooks/useTokenHelper'
import { hospitals, specialists } from '@/constants/layerConfig'
import { useSelector } from 'react-redux'
import '../style.scss'

const HospitalCard = (props) => {
  console.log(props)
  const {
    name,
    level,
    beds
  } = props.hospital

  return (
    <Card >
      <Card.Content>
        <Card.Header className='cardHeader'>{name}</Card.Header>
        <Card.Description>
          <div>Level: {level} </div>
          <div>Beds: {beds} </div>
          <div>Has NICU: Yes</div>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

const SpecialistCard = (props) => {
  console.log(props)
  const {
    name,
    hasOT,
    hasPT,
    hasSpeechTherapy
  } = props.specialist

  return (
    <Card >
      <Card.Content>
        <Card.Header className='cardHeader'>{name}</Card.Header>
        <Card.Description>
          <div>Provides Physical Therapy: {hasPT} </div>
          <div>Provides Occupational Therapy: {hasOT} </div>
          <div>Provides Speech Therapy: {hasSpeechTherapy}</div>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default function MedicalCard() {
  const { currentParticipant } = useSelector(state => state.research)
  const { authentication } = useTokenHelper()
  const [activeIndex, setActiveIndex] = useState(0)
  const [hops, setHospitals] = useState([])
  const [special, setSpecialists] = useState([])

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    if (index === activeIndex) return setActiveIndex(-1)
    setActiveIndex(index)
  }

  const queryHospitals = useCallback(async () => {
    const outfields = ['Name', 'Level_', 'Beds']
    const res = await queryFeatures({
      url: hospitals.props.url,
      f: 'json',
      outfields,
      returnGeometry: false,
      authentication
    })

    const features = res.features.map(({ attributes }) => {
      return {
        id: attributes.OBJECTID,
        name: attributes.Name,
        level: attributes.Level_,
        beds: attributes.Beds
      }
    })

    setHospitals(features)
  })

  const querySpecialists = useCallback(async () => {
    const outfields = ['name', 'hasPT', 'hasOT', 'hasSpeechTherapy']
    const res = await queryFeatures({
      url: specialists.props.url,
      f: 'json',
      outfields,
      returnGeometry: false,
      authentication
    })

    const features = res.features.map(({ attributes }) => {
      return {
        id: attributes.OBJECTID,
        name: attributes.name,
        hasPT: attributes.hasPT,
        hasOT: attributes.hasOT,
        hasSpeechTherapy: attributes.hasSpeechTherapy
      }
    })

    setSpecialists(features)
  })

  useEffect(() => {
    if (authentication && currentParticipant) {
      queryHospitals()
      querySpecialists()
    }
  }, [authentication, currentParticipant])

  return (
    <>
      <Accordion exclusive={false} styled style={{ width: '100%' }}>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Icon name='dropdown' />
          Hospitals
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          {hops?.length > 0 &&
            <Card.Group>
              {
                hops.map((hospital) => (
                  <HospitalCard key={hospital.id} hospital={hospital} />
                ))
              }
            </Card.Group>
          }
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={handleClick}
        >
          <Icon name='dropdown' />
          Specialists
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          {special?.length > 0 &&
            <Card.Group>
              {
                special.map((specialist) => (
                  <SpecialistCard key={specialist.id} specialist={specialist} />
                ))
              }
            </Card.Group>
          }
        </Accordion.Content>

      </Accordion>
    </>
  )
}
