import { Accordion, Icon, Card, Image, Button } from 'semantic-ui-react'
import { useCallback, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { queryFeatures } from '@esri/arcgis-rest-feature-service'
import { senate, house } from '@/constants/layerConfig'
import useTokenHelper from '@/utilities/hooks/useTokenHelper'

import '../style.scss'

const SenatorCard = (props) => {
  const {
    name,
    dcPhone,
    districtPhone,
    senateId,
    twitterUrl,
    websiteUrl,
    photoUrl
  } = props.senator

  return (
    <Card >
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src={photoUrl}
        />
        <Card.Header className='cardHeader'>{name}</Card.Header>
        <Card.Meta>{senateId}</Card.Meta>
        <Card.Description>
          <div>DC Phone: {dcPhone} </div>
          <div>District Phone: {districtPhone} </div>
          <div><a href={websiteUrl} target='_blank'>Website</a></div>
          <div><a href={twitterUrl} target='_blank'>Twitter</a></div>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

const RepresentativeCard = (props) => {
  const {
    name,
    dcPhone,
    districtPhone,
    houseId,
    twitterUrl,
    websiteUrl,
    photoUrl
  } = props.representative

  return (
    <Card >
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src={photoUrl}
        />
        <Card.Header className='cardHeader'>{name}</Card.Header>
        <Card.Meta>{houseId}</Card.Meta>
        <Card.Description>
          <div>DC Phone: {dcPhone} </div>
          <div>District Phone: {districtPhone} </div>
          <div><a href={websiteUrl} target='_blank'>Website</a></div>
          <div><a href={twitterUrl} target='_blank'>Twitter</a></div>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default function AdvocacyCard() {
  const { currentParticipant } = useSelector(state => state.research)
  const { authentication } = useTokenHelper()
  const [senators, setSenators] = useState([])
  const [representatives, setRepresentatives] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    if (index === activeIndex) return setActiveIndex(-1)
    setActiveIndex(index)
  }

  const queryRepresentatives = useCallback(async (coordinates) => {
    const outfields = ['Full_Name', 'DC_Phone', 'District_Phone', 'House_ID', 'Twitter', 'Website', 'Photo']
    const res = await queryFeatures({
      url: house.props.url,
      f: 'json',
      outfields,
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
    const features = res.features.map(({ attributes }) => {
      return {
        name: attributes.Full_Name,
        dcPhone: attributes.DC_Phone,
        districtPhone: attributes.District_Phone,
        houseId: attributes.House_ID,
        twitterUrl: attributes.Twitter,
        websiteUrl: attributes.Website,
        photoUrl: attributes.Photo
      }
    })
    setRepresentatives(features)
  })

  const querySenators = useCallback(async (coordinates) => {
    const outfields = ['Full_Name', 'DC_Phone', 'District_Phone', 'Senate_ID', 'Twitter', 'Website', 'Photo']
    const res = await queryFeatures({
      url: senate.props.url,
      f: 'json',
      outfields,
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
    const features = res.features.map(({ attributes }) => {
      return {
        name: attributes.Full_Name,
        dcPhone: attributes.DC_Phone,
        districtPhone: attributes.District_Phone,
        senateId: attributes.Senate_ID,
        twitterUrl: attributes.Twitter,
        websiteUrl: attributes.Website,
        photoUrl: attributes.Photo
      }
    })
    setSenators(features)
  })

  useEffect(() => {
    if (currentParticipant) {
      const { coordinates } = currentParticipant
      queryRepresentatives(coordinates)
      querySenators(coordinates)
    }
  }, [currentParticipant])

  return (
    <>
      <Accordion exclusive={false} styled style={{ width: '100%' }}>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Icon name='dropdown' />
          State Legislators
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          {senators?.length > 0 &&
            <Card.Group>
              {
                senators.map((senator) => (
                  <SenatorCard key={senator.name} senator={senator} />
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
          Local Legislators
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          {representatives?.length > 0 &&
            <Card.Group>
              {representatives.map((representative) => (
                <RepresentativeCard key={representative.name} representative={representative} />
              ))
              }
            </Card.Group>
          }
        </Accordion.Content>
      </Accordion>
    </>
  )
}
