import { Card, Image } from 'semantic-ui-react'
import '../style.scss'

export default function IntakeResources() {
  return (
    <>
      <div className='resourceCard__wrapper'>
        <Card.Group>
          <Card>
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src='https://survey123.arcgis.com/assets/img/Survey123_for_ArcGIS_220-3280bf2d.png'
              />
              <Card.Header className='cardHeader'>VSDA Intake Survey Overvew </Card.Header>
              <Card.Meta>ArcGIS Survey123 Website </Card.Meta>
              <Card.Description>
                Administer the survey here <a rel='noreferrer' href='https://survey123.arcgis.com/surveys/f045d47d3ebd4f68b0d06cc2d8cce57a/overview' target='_blank'>here</a>
              </Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src='https://survey123.arcgis.com/assets/img/Survey123_for_ArcGIS_220-3280bf2d.png'
              />
              <Card.Header className='cardHeader'>VSDA Intake Survey</Card.Header>
              <Card.Meta>Survey123 Web Form</Card.Meta>
              <Card.Description>
              View and share the survey here <a rel='noreferrer' href='https://arcg.is/1rHjeO' target='_blank'>here</a>
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>

      </div>
    </>
  )
}
