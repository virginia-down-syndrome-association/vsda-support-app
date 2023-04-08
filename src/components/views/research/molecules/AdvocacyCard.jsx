import { Accordion, Icon } from 'semantic-ui-react'
import '../style.scss'

export default function AdvocacyCard () {
  return (
    <>
      <Accordion exclusive={false} styled>
        <Accordion.Title
          active={false}
          index={0}
          onClick={console.log('test')}
        >
          <Icon name='dropdown' />
          State Legislators
        </Accordion.Title>
        <Accordion.Content active={false}>
        </Accordion.Content>
        <Accordion.Title
          active={false}
          index={0}
          onClick={console.log('test')}
        >
          <Icon name='dropdown' />
          Local Legislators
        </Accordion.Title>
        <Accordion.Content active={false}>
          <div>county</div>
          <div>zip</div>
        </Accordion.Content>
      </Accordion>
    </>
  )
}
