import { Card, Image } from 'semantic-ui-react'
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
                src='https://www.esri.com/content/dam/esrisites/en-us/common/icons/product-logos/ArcGIS_Experience_Builder_220.png'
              />
              <Card.Header className='cardHeader'>VSDA Data Editor </Card.Header>
              <Card.Meta>ArcGIS Online Experience Builder Application</Card.Meta>
              <Card.Description>
                Edit program related data <a rel='noreferrer' href='https://experience.arcgis.com/experience/6b30323bc4144f268875ce6b1a5fd4f7/page/Constituent-Data/?views=Cadastral-Editor' target='_blank'>here</a>
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
