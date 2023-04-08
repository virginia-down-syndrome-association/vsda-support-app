import { Image, Card } from 'semantic-ui-react'
import '../style.scss'

export default function OutreachResources() {
  return (
    <>
      <div className='resourceCard__wrapper'>
        <Card.Group>
          <Card>
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src='https://www.esri.com/content/dam/esrisites/en-us/common/icons/product-logos/ArcGIS-Hub.png'
              />
              <Card.Header className='cardHeader'>VSDA Resource Finder </Card.Header>
              <Card.Meta>ArcGIS Hub Site Application</Card.Meta>
              <Card.Description>
                View the active site <a rel='noreferrer' href='https://vsda-resources-umw.hub.arcgis.com/' target='_blank'>here</a>
              </Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src='https://www.esri.com/content/dam/esrisites/en-us/common/icons/product-logos/ArcGIS-Hub.png'
              />
              <Card.Header className='cardHeader'>VSDA Resource Finder (Edit)</Card.Header>
              <Card.Meta>ArcGIS Hub</Card.Meta>
              <Card.Description>
                Edit the site <a rel='noreferrer' href='https://vsda-resources-umw.hub.arcgis.com/edit' target='_blank'>here</a>
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    </>
  )
}
