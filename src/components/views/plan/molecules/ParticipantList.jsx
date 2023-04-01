import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Checkbox, Card, List, Image, Placeholder } from 'semantic-ui-react'
import { calculateAgeFromTimestamp } from '@/utilities/filters'
import '../style.scss'

const useParticipantFriendlyFeatures = () => {
  const { currentFeatures } = useSelector(state => state.filters)
  const [features, setFeatures] = useState(currentFeatures)

  useEffect(() => {
    const f = currentFeatures.map((feature) => {
      const { OBJECTID, FirstName, LastName, Sex, County, Birthdate } = feature.attributes
      return {
        id: OBJECTID,
        name: `${FirstName} ${LastName}`,
        sex: Sex,
        county: County,
        age: calculateAgeFromTimestamp(Birthdate)
      }
    })
    setFeatures(f)
  }, [currentFeatures])

  return {
    features
  }
}

const ParticipantCard = (props) => {
  const { feature } = props
  return (
    <List.Item key={feature.id} className="participantItem__wrapper" >
      <Card fluid className='participantItem__card'>
        <div className='checkbox__wrapper'>
          <Checkbox />
        </div>
        <Card.Content>
          <Image
            circular
            floated='right'
            size='mini'
            src= {feature.sex === 'male' ? 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg' : 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg'}
          />
          <Card.Header className='cardHeader'>{feature.name}</Card.Header>
          <Card.Meta>Age: {feature.age}</Card.Meta>
          <Card.Meta>Sex: {feature.sex}</Card.Meta>
        </Card.Content>

      </Card>
    </List.Item>
  )
}

const PlaceholderExamplePlaceholder = () => (
  <Placeholder className='placeholderWrapper'>
    <Placeholder.Header image>
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Header>
    <Placeholder.Paragraph>
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Paragraph>
    <Placeholder.Paragraph>
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Paragraph>
    <Placeholder.Paragraph>
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Paragraph>
  </Placeholder>
)

export default function ParticipantList() {
  const { features } = useParticipantFriendlyFeatures()

  return (
    <>
      <div className='participantList__container'>
        <List>
          { !features?.length && <PlaceholderExamplePlaceholder />}
          {
            features?.length && features.map(feature => (
              <ParticipantCard key={ feature.id } feature={feature} />
            ))
          }
        </List>
      </div>
    </>
  )
}
