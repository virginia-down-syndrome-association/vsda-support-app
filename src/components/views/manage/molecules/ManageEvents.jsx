import { List, Placeholder, Card, Select} from 'semantic-ui-react'
import '../style.scss'

const PlaceholderExamplePlaceholder = () => (
  <Placeholder className='placeholderWrapper'>
    <Placeholder.Header image>,
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

const useParticipantFriendlyFeatures = () => {
  return {
    features: [
      { id: 1, name: 'Feature 1' },
      { id: 2, name: 'Feature 2' },
      { id: 3, name: 'Feature 3' },
      { id: 4, name: 'Feature 4' },
      { id: 5, name: 'Feature 5' },
      { id: 6, name: 'Feature 6' },
      { id: 7, name: 'Feature 7' },
      { id: 8, name: 'Feature 8' },
      { id: 9, name: 'Feature 9' },
      { id: 10, name: 'Feature 10' },
      { id: 11, name: 'Feature 11' },
      { id: 12, name: 'Feature 12' }
    ]
  }
}

const EventCard = ({ feature, onEvent }) => {
  return (
    <List.Item key={feature.id} className="participantItem__wrapper" >
      <Card fluid className='participantItem__card'>
        <Card.Content>
          <Card.Header className='cardHeader'>{feature.name}</Card.Header>
          <Card.Meta>{feature.id}</Card.Meta>
        </Card.Content>
      </Card>
    </List.Item>
  )
}

const sortingOptions = [
  {
    key: 'newest',
    text: 'Newest',
    value: 'newest'
  },
  {
    key: 'oldest',
    text: 'Oldest',
    value: 'oldest'
  }
]

export default function ManageEvents() {
  const { features } = useParticipantFriendlyFeatures()

  return (
    <>
      <div className='resourceCard__wrapper'>
        <Select compact placeholder='Select your country' options={sortingOptions} />
        <List className='eventList'>
          {!features?.length && <PlaceholderExamplePlaceholder key="placeholder" />}
          {
            features?.length && features.map(feature => (
              <EventCard key={feature.id} feature={feature} />
            ))
          }
        </List>
      </div>
    </>
  )
}
