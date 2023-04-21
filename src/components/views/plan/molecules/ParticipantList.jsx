import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Checkbox, Card, List, Image, Placeholder } from 'semantic-ui-react'
import ParticipantListActions from './ParticipantListActions'
import { calculateAgeFromTimestamp } from '@/utilities/filters'
import { setSelectedFeatures, clearSelectedFeatures } from '@/store/reducers/filters'
import store from '@/store'
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

const ParticipantCard = ({ feature, onEvent, selectedFeatures }) => {
  // const [checked, setChecked] = useState(false)
  // useEffect(() => {
  //   onEvent({ id: feature.id, checked })
  // }, [checked])

  const getValue = (id) => {
    return !!((selectedFeatures && selectedFeatures.find((item) => item === feature.id)))
  }
  const calcDistance = (id) => {
    const { matrixLookup } = store.getState().filters
    if (matrixLookup && matrixLookup?.length > 0) {
      const item = matrixLookup.find((item) => item.id === id)
      if (item && item.duration) return `Distance to: ${item.duration} minute drive to last searched location`
    }
    return ''
    // return item ? item.time : 'N/A'
  }

  return (
    <List.Item key={feature.id} className="participantItem__wrapper" >
      <Card fluid className='participantItem__card'>
        <div className='checkbox__wrapper'>
          <Checkbox
            onChange={(e, data) => onEvent({ id: feature.id, checked: data.checked })}
            checked={getValue(feature.id)}
          />
        </div>
        <Card.Content>
          <Image
            circular
            floated='right'
            size='mini'
            src={feature.sex === 'male' ? 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg' : 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg'}
          />
          <Card.Header className='cardHeader'>{feature.name}</Card.Header>
          <Card.Meta>Age: {feature.age}</Card.Meta>
          <Card.Meta>Sex: {feature.sex}</Card.Meta>
          <Card.Meta>{calcDistance(feature.id)}</Card.Meta>
        </Card.Content>

      </Card>
    </List.Item>
  )
}

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

export default function ParticipantList () {
  const dispatch = useDispatch()
  const { selectedFeatures } = useSelector(state => state.filters)
  const { features } = useParticipantFriendlyFeatures()

  function handleChildSelection ({ checked, id }) {
    if (checked) {
      dispatch(setSelectedFeatures([...selectedFeatures, id]))
    } else {
      dispatch(setSelectedFeatures(selectedFeatures.filter((item) => item !== id) || []))
    }
  }

  function binarySelection ({ checked }) {
    if (checked) {
      const ids = features.map((feature) => feature.id)
      dispatch(setSelectedFeatures(ids))
    } else {
      dispatch(clearSelectedFeatures())
    }
  }

  return (
    <>
      <div className='participantList__container'>
        <ParticipantListActions onEvent={binarySelection} selectedFeatures={selectedFeatures} features={features} />
        <List>
          {!features?.length && <PlaceholderExamplePlaceholder key="placeholder" />}
          {
            features?.length && features.map(feature => (
              <ParticipantCard selectedFeatures={selectedFeatures} key={feature.id} feature={feature} onEvent={handleChildSelection} />
            ))
          }
        </List>
      </div>
    </>
  )
}
