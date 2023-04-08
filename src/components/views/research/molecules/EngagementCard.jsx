import { Accordion, Icon } from 'semantic-ui-react'
import '../style.scss'

export default function EngagementCard () {
  return (
    <>
      <div>
        <Accordion styled>
          <Accordion.Title
            active={false}
            index={0}
            onClick={console.log('test')}
          >
            <Icon name='dropdown' />
            School Districts
          </Accordion.Title>
          <Accordion.Content active={false}>
          </Accordion.Content>
          <Accordion.Title
            active={false}
            index={0}
            onClick={console.log('test')}
          >
            <Icon name='dropdown' />
           Location Information
          </Accordion.Title>
          <Accordion.Content active={false}>
            <div>county</div>
            <div>zip</div>
          </Accordion.Content>
        </Accordion>
      </div>
    </>
  )
}
