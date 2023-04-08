import {Card, Image } from 'semantic-ui-react'
import '../style.scss'

export default function DataResources() {
  return (
    <>
      <div className='resourceCard__wrapper'>
        <Card.Group>
          <Card>
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src='https://thearcofnovatrust.org/wp-content/uploads/2022/11/VDSA-300x300.jpg'
              />
              <Card.Header className='cardHeader'>VSDA Home Page </Card.Header>
              <Card.Meta>Information, Resources, Care, And Connection To A Supportive And Welcoming Community.</Card.Meta>
              <Card.Description>
                View the offical home page <a rel='noreferrer' href='https://virginiadsa.org/' target='_blank'>here</a>
              </Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src='https://www.esri.com/content/dam/esrisites/en-us/common/icons/product-logos/ArcGISOnline.png'
              />
              <Card.Header className='cardHeader'>VSDA Capstone</Card.Header>
              <Card.Meta>ArcGIS Online Group</Card.Meta>
              <Card.Description>
                View program-related hosted geospatial content <a rel='noreferrer' href='https://umw.maps.arcgis.com/home/group.html?id=7160640bac5d4fe79a09e7990d222b1f#overview' target='_blank'>here</a>
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    </>
  )
}
